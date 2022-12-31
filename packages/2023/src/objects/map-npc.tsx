import { useFrame } from '@react-three/fiber'
import { memo, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { Matrix3, Mesh, ShaderMaterial, Vector3 } from 'three'
import fragmentShader from '../data/shaders/prop.frag.glsl'
import vertexShader from '../data/shaders/prop.vert.glsl'
import useSpritesheet from '../hooks/use-spritesheet'
import { TileNpc } from '../types/map'
import Map from './map'

const shader = new ShaderMaterial({
  transparent: true,
  vertexShader,
  fragmentShader,
  uniforms: {
    color: { value: null },
    uvTransform: { value: new Matrix3() },
  },
})

interface MapNpcProps extends TileNpc {
  state: string
  flipVertical?: boolean
  flipHorizontal?: boolean
  onBeforeRender?: () => void
}

function MapNpc({
  flipHorizontal,
  flipVertical,
  npc,
  state,
  x,
  y,
  onInteraction,
  onBeforeRender,
}: MapNpcProps) {
  const textures = useSpritesheet(
    npc.states[state]?.spritesheet,
    useMemo(() => npc.states[state]?.frames.map((n) => n.name), [npc, state]),
  )
  const mapUpdater = useContext(Map.Context)
  const instShader = useMemo(() => shader.clone(), [])
  const timeRef = useRef({ passed: 0, index: 0 })
  const meshRef = useRef<Mesh>(null)
  const renderOrder = useMemo(() => {
    if (npc.renderOrderAddToY != null) {
      return y + npc.renderOrderAddToY
    }

    if (npc.boundingBox) {
      return y + npc.boundingBox.y1 + (npc.boundingBox.y2 - npc.boundingBox.y1) * 0.45
    }

    return y + npc.size.h / 2
  }, [npc, y])

  const scale = useMemo(
    () => new Vector3(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1, 1),
    [flipHorizontal, flipVertical],
  )

  const applyTexture = useCallback(
    (texture: any) => {
      instShader.uniforms.color.value = texture
      if (texture?.matrix) {
        instShader.uniforms.uvTransform.value.copy(texture.matrix)
      } else {
        instShader.uniforms.uvTransform.value.identity()
      }
    },
    [instShader],
  )

  useEffect(
    () =>
      mapUpdater({
        x,
        y,
        npc,
        onInteraction,
      }),
    [x, y, npc, onInteraction],
  )

  useEffect(() => {
    meshRef.current?.updateMatrixWorld()
  }, [x, y, flipVertical, flipHorizontal])

  useEffect(() => {
    timeRef.current.passed = 0
    timeRef.current.index = 0
    applyTexture(textures[timeRef.current.index])
  }, [npc, state])

  useFrame((_, delta) => {
    const currentFrame = npc.states[state].frames[timeRef.current.index]
    if (!currentFrame) {
      return
    }

    timeRef.current.passed += delta
    while (timeRef.current.passed > currentFrame.duration) {
      timeRef.current.passed -= currentFrame.duration
      timeRef.current.index = (timeRef.current.index + 1) % npc.states[state].frames.length

      applyTexture(textures[timeRef.current.index])
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[x + npc.size.w / 2, -y - npc.size.h / 2, 0]}
      renderOrder={renderOrder}
      scale={scale}
      onBeforeRender={onBeforeRender}
    >
      <planeGeometry args={[npc.size.w, npc.size.h]} />
      <primitive object={instShader} />
    </mesh>
  )
}

export default memo(MapNpc)
