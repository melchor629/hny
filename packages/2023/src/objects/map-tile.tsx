import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Matrix3, Mesh, PlaneGeometry, ShaderMaterial, Vector4 } from 'three'
import floorTileFragmentShader from '../data/shaders/floor-tile.frag.glsl?raw'
import floorTileVertexShader from '../data/shaders/floor-tile.vert.glsl?raw'
import wallTileFragmentShader from '../data/shaders/wall-tile.frag.glsl?raw'
import wallTileVertexShader from '../data/shaders/wall-tile.vert.glsl?raw'
import bricksFloorManifest from '../data/spritesheets/bricks-floor.json'
import wallsManifest from '../data/spritesheets/Walls.json'
import useSpritesheet from '../hooks/use-spritesheet'
import { useTexture } from '../hooks/use-asset'
import type { CornerPosition, Tile, WallPosition } from '../types/map'
import usePlayerRef from '../hooks/use-player-ref'
import Map from './map'

const tileSize = 32.0
// TODO borken

// create one shader to reuse between tiles
const floorMaterial = new ShaderMaterial({
  transparent: true,
  vertexShader: floorTileVertexShader,
  fragmentShader: floorTileFragmentShader,
  uniforms: {
    floor: { value: null },
    floorUvTransform: { value: new Matrix3() },
  },
})

const wallMaterial = new ShaderMaterial({
  transparent: true,
  vertexShader: wallTileVertexShader,
  fragmentShader: wallTileFragmentShader,
  uniforms: {
    wall: { value: null },
    wallUvTransform: { value: new Matrix3() },
    corner1: { value: null },
    corner1UvTransform: { value: new Matrix3() },
    corner2: { value: null },
    corner2UvTransform: { value: new Matrix3() },
    corner3: { value: null },
    corner3UvTransform: { value: new Matrix3() },
    corner4: { value: null },
    corner4UvTransform: { value: new Matrix3() },
    wallClip: { value: new Vector4(1.0, 1.0, 1.0, 1.0) },
    mask: { value: null },
    maskUvTransform: { value: new Matrix3().set(0, 0, 0, 0, 0, 0, 0, 0, 0) },
    up: { value: -1 },
    applyMask: { value: 1 },
  },
})

// create one buffer geometry to share across all tiles
const tileGeometry = new PlaneGeometry(tileSize, tileSize)

const textureIndices: Record<WallPosition, number> = {
  'left-top': 0,
  top: 1,
  'right-top': 2,
  left: 3,
  center: 4,
  right: 5,
  'left-bottom': 6,
  bottom: 7,
  'right-bottom': 8,
  'both-top': 9,
  'both-center': 10,
  'both-bottom': 11,
  'left-both': 12,
  'center-both': 13,
  'right-both': 14,
  empty: 15,
  'left-aftertop': 16,
  aftertop: 17,
  'right-aftertop': 18,
  'both-aftertop': 19,
  'aftertop[door]': 26,
  'top[door]': 27,
  'both-aftertop[door]': 28,
  'both-top[door]': 29,
  'bottom[door]': 30,
  'both-bottom[door]': 31,
}

const insetTextureIndices: Record<CornerPosition, number> = {
  'left-top': 20,
  'right-top': 21,
  'left-bottom': 22,
  'right-bottom': 23,
  'left-aftertop': 24,
  'right-aftertop': 25,
}

const wallTransform: Partial<Record<WallPosition, WallPosition>> = {
  'left-aftertop': 'empty',
  aftertop: 'empty',
  'right-aftertop': 'empty',
  'both-aftertop': 'empty',
  'top[door]': 'center',
  'both-top[door]': 'both-center',
  'bottom[door]': 'center',
  'both-bottom[door]': 'both-center',
}

const cornerTransform: Partial<Record<CornerPosition, CornerPosition | ''>> = {
  'left-aftertop': '',
  'right-aftertop': '',
}

const afterTop: Partial<Record<WallPosition, WallPosition>> = {
  top: 'aftertop',
  'left-top': 'left-aftertop',
  'left-both': 'left-aftertop',
  'center-both': 'aftertop',
  'right-top': 'right-aftertop',
  'right-both': 'right-aftertop',
  'both-top': 'both-aftertop',
  'top[door]': 'aftertop[door]',
  'both-top[door]': 'both-aftertop[door]',
}

interface MapTileProps extends Tile {
  collisionWall?: Tile['wall']
}

function MapTile({ wall, corners, collisionWall, x, y }: MapTileProps) {
  const playerRef = usePlayerRef()
  const [mesh1, setMesh1] = useState<Mesh | null>()
  const [mesh2, setMesh2] = useState<Mesh | null>()
  const [mesh3, setMesh3] = useState<Mesh | null>()
  const tileGeometry1 = useMemo(() => tileGeometry.clone(), [])
  const tileGeometry2 = useMemo(() => tileGeometry.clone(), [])
  const tileGeometry3 = useMemo(() => tileGeometry.clone(), [])
  const mapUpdater = useContext(Map.Context)
  const wallName = useMemo(() => wallTransform[wall] ?? wall, [wall])
  const cornerName = useMemo(
    () =>
      (corners ?? [])
        .map((c) => cornerTransform[c] ?? c)
        .filter((c) => c !== '')
        .join('_'),
    [corners],
  )
  const brickFloorTextureName = useMemo(
    () =>
      wallName === 'empty'
        ? 'bricks-floor__empty__.png'
        : `bricks-floor__${wallName}__${cornerName}.png`,
    [wallName, cornerName],
  )
  const wallTextureName = useMemo(() => `Walls${textureIndices[wall]}.png`, [wall])
  const insetWallTextureNames = useMemo(
    () => (corners ?? []).map((insetWall) => `Walls${insetTextureIndices[insetWall]}.png`),
    [corners],
  )
  const [brickFloorTexture] = useSpritesheet(bricksFloorManifest, brickFloorTextureName)
  const [wallTexture] = useSpritesheet(wallsManifest, wallTextureName)
  const insetWallTextures = useSpritesheet(wallsManifest, insetWallTextureNames)
  const mask = useTexture('pj-mask.png')!
  const floorShader = useMemo(() => floorMaterial.clone(), [])
  const wallDownShader = useMemo(() => wallMaterial.clone(), [])
  const wallUpShader = useMemo(() => {
    const m = wallMaterial.clone()
    m.uniforms.up.value = 1
    return m
  }, [])

  const onBeforeRenderWallDown = useCallback(() => {
    if (!playerRef.current) {
      return
    }

    // calculate the UV transform matrix for the mask based on the position of the tile and player
    const playerPos = playerRef.current.position
    const [tilePosX, tilePosY] = [x * tileSize, -y * tileSize]

    wallDownShader.uniforms.maskUvTransform.value.setUvTransform(
      (tilePosX - playerPos.x) / tileSize,
      (tilePosY - playerPos.y) / tileSize,
      1,
      1,
      0,
      0,
      0,
    )
    if (wall.endsWith('aftertop')) {
      // check if mask has to apply in aftertop walls
      wallDownShader.uniforms.applyMask.value = +(
        playerPos.y > tilePosY - 8 && Math.abs(playerPos.x - tilePosX) < tileSize * 0.85
      )
    }
    wallDownShader.uniformsNeedUpdate = true
  }, [wall, wallDownShader, x, y])

  useEffect(() => {
    const applyMask =
      wall.includes('bottom') ||
      wall.endsWith('both') ||
      wall.endsWith('aftertop') ||
      corners?.some((corner) => corner.includes('bottom') || corner.endsWith('both'))
    if (applyMask) {
      // calculate wall clip for mask (the section where the mask will apply)
      wallDownShader.uniforms.wallClip.value.set(
        wall.startsWith('left') || wall.startsWith('both') ? 5.0 / tileSize : 0.0,
        4.0 / tileSize,
        wall.startsWith('right') || wall.startsWith('both') ? 27.0 / tileSize : 1.0,
        27.0 / tileSize,
      )
    } else {
      // this will tell not to apply the mask
      wallDownShader.uniforms.wallClip.value.set(1.0, 1.0, 1.0, 1.0)
    }
    wallUpShader.uniforms.wallClip.value.copy(wallDownShader.uniforms.wallClip.value)
    wallDownShader.uniformsNeedUpdate = true
    wallUpShader.uniformsNeedUpdate = true
  }, [wall, corners])

  useEffect(
    () =>
      mapUpdater({
        x,
        y,
        wall: collisionWall ?? wall,
        corners,
      }),
    [x, y, wall, corners, collisionWall],
  )

  useEffect(() => {
    mesh1?.updateMatrixWorld()
    mesh2?.updateMatrixWorld()
    mesh3?.updateMatrixWorld()
  }, [x, y, mesh1, mesh2, mesh3])

  useEffect(() => {
    if (brickFloorTexture) {
      floorShader.uniforms.floor.value = brickFloorTexture
      floorShader.uniforms.floorUvTransform.value.copy(brickFloorTexture.matrix)
      floorShader.uniformsNeedUpdate = true
    }
  }, [brickFloorTexture])

  useEffect(() => {
    if (wallTexture) {
      wallDownShader.uniforms.wall.value = wallTexture
      wallDownShader.uniforms.wallUvTransform.value.copy(wallTexture.matrix)
      wallDownShader.uniformsNeedUpdate = true
      wallUpShader.uniforms.wall.value = wallTexture
      wallUpShader.uniforms.wallUvTransform.value.copy(wallTexture.matrix)
      wallUpShader.uniformsNeedUpdate = true
    }
  }, [wallTexture])

  useEffect(() => {
    insetWallTextures.slice(0, 4).forEach((corner, pos) => {
      if (corner) {
        wallDownShader.uniforms[`corner${pos + 1}`].value = corner
        wallDownShader.uniforms[`corner${pos + 1}UvTransform`].value.copy(corner.matrix)
        wallDownShader.uniformsNeedUpdate = true
        wallUpShader.uniforms[`corner${pos + 1}`].value = corner
        wallUpShader.uniforms[`corner${pos + 1}UvTransform`].value.copy(corner.matrix)
        wallUpShader.uniformsNeedUpdate = true
      }
    })
  }, [insetWallTextures])

  useEffect(() => {
    wallDownShader.uniforms.mask.value = mask
    wallDownShader.uniformsNeedUpdate = true
  }, [mask])

  if (!brickFloorTexture || !wallTexture) {
    throw new Error(`The tile ${wall} ${corners} is invalid`)
  }

  const afterTopWall = afterTop[wall]
  return (
    <>
      {afterTopWall && <MapTile wall={afterTopWall} x={x} y={y - 1} />}
      <mesh ref={setMesh1} position={[x * tileSize, -y * tileSize, 0]}>
        <primitive object={tileGeometry1} />
        <primitive object={floorShader} />
      </mesh>
      <mesh
        ref={setMesh2}
        position={[x * tileSize, -y * tileSize, 0]}
        renderOrder={(y - 0.7) * tileSize}
      >
        <primitive object={tileGeometry2} />
        <primitive object={wallUpShader} />
      </mesh>
      <mesh
        ref={setMesh3}
        position={[x * tileSize, -y * tileSize, 0]}
        renderOrder={(y + 0.1) * tileSize}
        onBeforeRender={onBeforeRenderWallDown}
      >
        <primitive object={tileGeometry3} />
        <primitive object={wallDownShader} />
      </mesh>
    </>
  )
}

export default memo(
  MapTile,
  (prev, next) =>
    prev.wall === next.wall &&
    prev.x === next.x &&
    prev.y === next.y &&
    prev.collisionWall === next.collisionWall &&
    ((!prev.corners && !next.corners) ||
      (!!prev.corners &&
        !!next.corners &&
        prev.corners.length === next.corners.length &&
        prev.corners.every((c) => next.corners!.includes(c)))),
)
