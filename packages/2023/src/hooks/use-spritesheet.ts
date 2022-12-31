import { useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { MirroredRepeatWrapping, NearestFilter, Texture } from 'three'
import type { PixiMovie } from '../types/pixi-movie'
import { useTexture } from './use-asset'

function generateTextureFromSpritesheet(texture: Texture, spritesheet: PixiMovie, name: string) {
  const frame = spritesheet.frames[name]
  if (!frame) {
    return null
  }

  // https://stackoverflow.com/questions/34637608/three-js-issue-with-texture-offset-and-repeat-for-positioning-elements-of-a-spri
  const cloned = texture.clone() as Texture & { size: { w: number; h: number } }
  const {
    frame: { x, y, w, h },
  } = frame
  cloned.minFilter = NearestFilter
  cloned.magFilter = NearestFilter
  cloned.wrapS = MirroredRepeatWrapping
  cloned.wrapT = MirroredRepeatWrapping
  cloned.repeat.set(w / spritesheet.meta.size.w, h / spritesheet.meta.size.h)
  cloned.offset.set(x / spritesheet.meta.size.w, 1.0 - (h + y) / spritesheet.meta.size.h)
  cloned.needsUpdate = true
  cloned.updateMatrix()

  cloned.size = frame.sourceSize

  return cloned
}

function useSpritesheet(spritesheet?: PixiMovie, names?: string | string[]) {
  const texture = useTexture(spritesheet?.meta.image)
  const renderer = useThree((s) => s.gl)
  const localTextures = useMemo(() => {
    if (!names || !spritesheet) {
      return []
    }

    texture && renderer.initTexture(texture)
    if (typeof names === 'string') {
      return [texture ? generateTextureFromSpritesheet(texture, spritesheet, names) : null]
    }

    return names.map((name) =>
      texture ? generateTextureFromSpritesheet(texture, spritesheet, name) : null,
    )
  }, [texture, spritesheet, names])

  useEffect(() => {
    return () => localTextures.forEach((tex) => tex?.dispose())
  }, [localTextures])

  return localTextures
}

export default useSpritesheet
