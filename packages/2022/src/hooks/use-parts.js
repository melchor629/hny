import { useLoader } from '@react-three/fiber'
import { useDebugValue } from 'react'
import { useAsset } from 'use-asset'
import { partsUrl } from '../constants'
import { YamlLoader } from '../fns'

// internally useLoader uses useAsset: the object must be loaded
// by the first use of useParts :)
// NOTE: not really, while loading the ThePart loads this before
//       preload is done, but in a future reload the asset will
//       fully loaded, so not a problem :))
const useParts = () => {
  const [parts] = useAsset.peek(YamlLoader, partsUrl) || []
  useDebugValue(parts)
  return parts
}

useLoader.preload(YamlLoader, partsUrl)

export default useParts
