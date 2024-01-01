import { useFrame } from '@react-three/fiber'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { Box2, Matrix3, Object3D, ShaderMaterial, Vector2 } from 'three'
import fragmentShader from '../data/shaders/prop.frag.glsl?raw'
import vertexShader from '../data/shaders/prop.vert.glsl?raw'
import spritesheet from '../data/spritesheets/pj.json'
import useInput from '../hooks/use-input'
import useSpritesheet from '../hooks/use-spritesheet'
import type { CollisionBox } from '../types/collisions'
import type { Trigger } from '../types/map'
import type BVH2 from '../utils/bvh'

type PlayerDirection =
  | 'up'
  | 'up-right'
  | 'up-left'
  | 'left'
  | 'right'
  | 'down'
  | 'down-right'
  | 'down-left'

const degToRad = Math.PI / 180

const angleToDir: Readonly<Record<number, PlayerDirection>> = Object.freeze({
  0: 'right',
  45: 'up-right',
  90: 'up',
  135: 'up-left',
  180: 'left',
  225: 'down-left',
  270: 'down',
  315: 'down-right',
  360: 'right',
})

const dirToAngle: Readonly<Record<PlayerDirection, number>> = Object.freeze({
  right: 0,
  'up-right': 45 * degToRad,
  up: 90 * degToRad,
  'up-left': 135 * degToRad,
  left: 180 * degToRad,
  'down-left': 225 * degToRad,
  down: 270 * degToRad,
  'down-right': 315 * degToRad,
})

const dirToSide: Readonly<Record<PlayerDirection, 'left' | 'right' | 'top' | 'bottom'>> =
  Object.freeze({
    up: 'bottom',
    down: 'top',
    left: 'right',
    right: 'left',

    'up-right': 'bottom',
    'up-left': 'bottom',
    'down-right': 'top',
    'down-left': 'top',
  })

const textureNames = [...Array(24)].fill(0).map((_, i) => `pj${i}.png` as const)

const dirToTexture: Readonly<Record<PlayerDirection, number[]>> = Object.freeze({
  right: [10, 9, 10, 11],
  'up-right': [19, 18, 19, 20],
  up: [4, 3, 4, 5],
  'up-left': [22, 21, 22, 23],
  left: [7, 6, 7, 8],
  'down-left': [16, 15, 16, 17],
  down: [1, 0, 1, 2],
  'down-right': [13, 12, 13, 14],
})

const baseShader = new ShaderMaterial({
  transparent: true,
  vertexShader,
  fragmentShader,
  uniforms: {
    color: { value: null },
    uvTransform: { value: new Matrix3() },
  },
})

interface PlayerProps {
  collisions: BVH2<CollisionBox>
}

interface Player extends Object3D {
  realPosition: Vector2
  dir: PlayerDirection
  move(x: number, y: number): void
  moveTo(x: number, y: number): void
}

const Player = forwardRef<Player, PlayerProps>(function Player({ collisions }, ref) {
  const groupRef = useRef<Player | null>()
  const playerBoundingBoxRef = useRef<Box2>()
  const boxAfterXRef = useRef<Box2>()
  const boxAfterYRef = useRef<Box2>()
  const dirRef = useRef({ up: false, down: false, left: false, right: false, faster: false })
  const moveAnimationTimeRef = useRef(0)
  const triggerRef = useRef<Trigger | null>(null)
  const textures = useSpritesheet(spritesheet, textureNames)
  const inputHandler = useInput('player')
  const [shader] = useState(() => baseShader.clone())

  const changeSprite = useCallback(
    (spriteNum: number) => {
      const texture = textures[spriteNum]
      if (shader.uniforms.color.value !== texture) {
        shader.uniforms.color.value = texture
        if (texture?.matrix) {
          shader.uniforms.uvTransform.value.copy(texture.matrix)
        } else {
          shader.uniforms.uvTransform.value.identity()
        }
      }
    },
    [shader, textures],
  )

  const getPlayerBoundingBox = useCallback(() => {
    playerBoundingBoxRef.current ??= new Box2()

    playerBoundingBoxRef.current.min.set(-6, -8.5)
    playerBoundingBoxRef.current.max.set(7, -4)

    return playerBoundingBoxRef.current
  }, [])

  useEffect(() => {
    const unsucribe = [
      ...(['up', 'down', 'left', 'right'] as const).map((key) =>
        inputHandler.forKey(key).subscribe({
          press() {
            dirRef.current[key] = true
          },
          release() {
            dirRef.current[key] = false
          },
        }),
      ),
      inputHandler.forKey('interact').subscribe({
        press() {
          const player = groupRef.current
          if (!player) {
            return
          }

          const playerBoundingBox = getPlayerBoundingBox()
          const pos = player.realPosition
          const box = playerBoundingBox.translate(pos)
          const actionBox = box.clone().translate({
            x: 4 * Math.cos(dirToAngle[player.dir]),
            y: 4 * Math.sin(dirToAngle[player.dir]),
          } as Vector2)

          const collision = collisions
            .intersectsBoxAll(actionBox)
            .filter((c) => c.type !== 'trigger').length
          if (collision === 0) {
            dirRef.current!.faster = true
            // to avoid glitching the animation
            moveAnimationTimeRef.current = (moveAnimationTimeRef.current / 0.25) * 0.175
          }
        },
        release() {
          if (dirRef.current?.faster) {
            dirRef.current.faster = false
            // to avoid glitching the animation
            moveAnimationTimeRef.current = (moveAnimationTimeRef.current / 0.175) * 0.25
            return
          }

          const player = groupRef.current
          if (!player) {
            return
          }

          const playerBoundingBox = getPlayerBoundingBox()
          const pos = player.realPosition
          const box = playerBoundingBox.translate(pos)
          const actionBox = box.clone().translate({
            x: 4 * Math.cos(dirToAngle[player.dir]),
            y: 4 * Math.sin(dirToAngle[player.dir]),
          } as Vector2)

          const collision = collisions.intersectsBoxAll(actionBox).find((c) => 'onInteraction' in c)
          if (collision && 'onInteraction' in collision) {
            collision.onInteraction?.(dirToSide[player.dir])
          }
        },
      }),
      inputHandler.onFocusChange((f) => {
        if (f !== 'player') {
          dirRef.current.up = false
          dirRef.current.down = false
          dirRef.current.left = false
          dirRef.current.right = false
          dirRef.current.faster = false
        }
      }),
    ]

    return () => {
      unsucribe.forEach((fn) => fn())
    }
  }, [collisions])

  useFrame((state, delta) => {
    const player = groupRef.current
    if (!player || delta > 1) {
      return
    }

    const { up, down, left, right, faster } = dirRef.current
    const moveSpeed = 64.0 * (faster ? 1.45 : 0.95)
    let angle: number | null = null
    if (up && !down) {
      angle = 90
      if (left && !right) {
        angle += 45
      } else if (right && !left) {
        angle -= 45
      }
    } else if (down && !up) {
      angle = 270
      if (left && !right) {
        angle -= 45
      } else if (right && !left) {
        angle += 45
      }
    } else if (left && !right) {
      angle = 180
    } else if (right && !left) {
      angle = 0
    }

    if (angle != null) {
      player.dir = angleToDir[angle]
      angle = angle * degToRad

      const playerBoundingBox = getPlayerBoundingBox()

      boxAfterXRef.current ??= new Box2()
      boxAfterYRef.current ??= new Box2()

      // do calculations with reals, but store position in integer values
      const movementX = moveSpeed * delta * Math.cos(angle)
      const movementY = moveSpeed * delta * Math.sin(angle)
      const pos = player.realPosition
      const box = playerBoundingBox.translate(pos)
      const boxAfterX = boxAfterXRef.current.copy(box).translate({ x: movementX, y: 0 } as Vector2)
      const boxAfterY = boxAfterYRef.current.copy(box).translate({ x: 0, y: movementY } as Vector2)
      const collisionAfterX = collisions
        .intersectsBoxAll(boxAfterX)
        .filter((p) => p.type !== 'trigger')[0]
      const collisionAfterY = collisions
        .intersectsBoxAll(boxAfterY)
        .filter((p) => p.type !== 'trigger')[0]
      if (!collisionAfterX) {
        pos.x += movementX
        box.min.x += movementX
        box.max.x += movementX
      }
      if (!collisionAfterY) {
        pos.y += movementY
        box.min.y += movementY
        box.max.y += movementY
      }

      const sadness = collisions.intersectsBoxAll(box)
      const nonTriggers = sadness.filter((p) => p.type !== 'trigger')
      const triggers = sadness.filter((p) => p.type === 'trigger')
      if (nonTriggers.length) {
        // grab the big bounding box to move the player out
        const bigBoundingBox = nonTriggers.reduce(
          (bb, { boundingBox }) => bb.union(boundingBox),
          new Box2(),
        )
        // try to calculate where to move the player based on tiles
        let moveDir = nonTriggers
          .filter((p) => p.type === 'tile')
          .map((p) => (p.type === 'tile' ? p.side : 'top'))
          .reduce(
            (obj, side) => {
              if (side === 'bottom') return { ...obj, top: true }
              if (side === 'left') return { ...obj, right: true }
              if (side === 'left-bottom') return { ...obj, right: true, top: true }
              if (side === 'left-top') return { ...obj, right: true, bottom: true }
              if (side === 'right') return { ...obj, left: true }
              if (side === 'right-bottom') return { ...obj, left: true, top: true }
              if (side === 'right-top') return { ...obj, left: true, bottom: true }
              if (side === 'top') return { ...obj, bottom: true }
              return obj
            },
            { left: false, right: false, top: false, bottom: false },
          )
        if ((moveDir.left && moveDir.right) || (moveDir.top && moveDir.bottom)) {
          // move based on player movement if don't know what to do
          moveDir = { left: right, right: left, top: down, bottom: up }
        } else if (!moveDir.left && !moveDir.right && !moveDir.top && !moveDir.bottom) {
          // same as above
          moveDir = { left: right, right: left, top: down, bottom: up }
        }

        // move player out
        if (moveDir.left) {
          pos.x = bigBoundingBox.min.x - 7
        } else if (moveDir.right) {
          pos.x = bigBoundingBox.max.x - -6
        }
        if (moveDir.top) {
          pos.y = bigBoundingBox.max.y + -4
        } else if (moveDir.bottom) {
          pos.y = bigBoundingBox.min.y + -8.5
        }
      } else if (triggers[0]?.type === 'trigger') {
        if (triggerRef.current !== triggers[0].trigger) {
          triggers[0].trigger.onPlayerInside?.(dirToSide[player.dir])
          triggerRef.current = triggers[0].trigger
        }
      } else if (triggerRef.current) {
        triggerRef.current.onPlayerOutside?.(dirToSide[player.dir])
        triggerRef.current = null
      }

      player.position.x = Math.round(pos.x)
      player.position.y = Math.round(pos.y)
      player.realPosition = pos
      state.camera.position.x = player.position.x - 160
      state.camera.position.y = player.position.y - 90
      player.renderOrder = -player.position.y - 1

      player.updateMatrixWorld()

      const animDuration = faster ? 0.175 : 0.25
      const index =
        Math.trunc(moveAnimationTimeRef.current / animDuration + 1) %
        dirToTexture[player.dir].length
      changeSprite(dirToTexture[player.dir][index])
      moveAnimationTimeRef.current += delta
    } else {
      changeSprite(dirToTexture[player.dir][0])
      moveAnimationTimeRef.current = 0
    }

    if (player.renderOrder === 0) {
      state.camera.position.x = player.position.x - 160
      state.camera.position.y = player.position.y - 90
      player.renderOrder = -player.position.y
      player.updateMatrixWorld()
    }
  })

  return (
    <mesh
      ref={useCallback(
        (v: Object3D | null) => {
          groupRef.current = v as any
          if (v) {
            groupRef.current!.realPosition = new Vector2(v.position.x, v.position.y)
            groupRef.current!.moveTo = (x, y) => {
              groupRef.current!.realPosition.x = x
              groupRef.current!.realPosition.y = -y
              groupRef.current!.position.x = Math.round(x)
              groupRef.current!.position.y = Math.round(-y)
              groupRef.current!.renderOrder = 0
            }
            groupRef.current!.move = (x, y) => {
              groupRef.current!.moveTo(
                groupRef.current!.realPosition.x + x,
                -groupRef.current!.realPosition.y + y,
              )
            }
            groupRef.current!.dir = 'down'
          }
          if (typeof ref === 'function') {
            ref(groupRef.current!)
          } else if (ref && typeof ref === 'object') {
            ref.current = groupRef.current!
            if (import.meta.env.DEV) {
              // @ts-ignore
              window.player = groupRef.current!
            }
          }
        },
        [ref],
      )}
    >
      <planeGeometry args={[18, 18]} />
      <primitive object={shader} />
    </mesh>
  )
})

export default Player
