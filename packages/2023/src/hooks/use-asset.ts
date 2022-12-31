import { useLoader } from '@react-three/fiber'
import { useMemo } from 'react'
import { TextureLoader } from 'three'
import assetsManifest from '../data/assets-manifest.json'

const loaderForType = (type: string) => {
  if (type === 'texture') {
    return TextureLoader
  }

  throw new Error(`Asset type ${type} not supported`)
}

assetsManifest.assets.forEach((asset) => useLoader.preload(loaderForType(asset.type), asset.src))

export const useAssetManifest = (type: string, name?: string | null) =>
  useMemo(
    () => (name ? assetsManifest.assets.find((a) => a.type === type && a.name === name) : null),
    [type, name],
  )

export const useTexture = (name?: string | null) => {
  const assetManifest = useAssetManifest('texture', name)
  return assetManifest ? useLoader(TextureLoader, assetManifest.src) : null
}
