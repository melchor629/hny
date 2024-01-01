import { useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { noop } from 'lodash-es'
import { memo, useLayoutEffect } from 'react'
import { AudioLoader, MeshStandardMaterial, TextureLoader } from 'three'
import {
  aoMapUrl,
  objectBrokenUrl,
  objectOkUrl,
  farBeatUrl,
  elFrascoUrl,
  farExplosionUrl,
} from '../constants'
import { pingToApi } from '../fns'

/**
 * This component preloads the objects into the GPU (or it should do it),
 * and setups the materials of the objects. References are shared across
 * components :)
 */
const ThePreload = () => {
  const { scene: obj1 } = useGLTF(objectBrokenUrl)
  const { scene: obj2 } = useGLTF(objectOkUrl)
  const aomap = useLoader(TextureLoader, aoMapUrl)

  useLayoutEffect(() => {
    // bring up the function if it is down :)
    pingToApi().catch(noop)
  }, [])

  // load materials as fast as it can, even before <Preload all />
  useLayoutEffect(() => {
    const material = new MeshStandardMaterial({
      color: '#eee',
      emissive: '#eee',
      emissiveIntensity: 0.15,
      roughness: 0.19,
      transparent: true,
    })
    obj1.traverse((obj) => {
      if (obj.type === 'Mesh') {
        // reuse the same material for all objects (but some will have its own material clone)
        obj.material = material
        // tells three.js to render this object after other transparent objects
        // which in this case, after the stars
        obj.renderOrder = 1
        // pre-compute bounding-box
        obj.geometry.computeBoundingBox()
      }
    })
  }, [obj1])

  useLayoutEffect(() => {
    const [object] = obj2.children
    object.material.aoMap = aomap
    object.material.emissiveIntensity = 0.15
    object.material.roughness = 0.19
  }, [obj2, aomap])

  return (
    <group visible={false}>
      <primitive object={obj1} />
      <primitive object={obj2} />
    </group>
  )
}

// Register here all assets to preload
useGLTF.preload(objectBrokenUrl)
useGLTF.preload(objectOkUrl)
useLoader.preload(AudioLoader, farBeatUrl)
useLoader.preload(AudioLoader, elFrascoUrl)
useLoader.preload(AudioLoader, farExplosionUrl)
useLoader.preload(TextureLoader, aoMapUrl)

export default memo(ThePreload)
