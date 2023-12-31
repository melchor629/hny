import { AnimatedProps, animated } from '@react-spring/three'
import { useGLTF } from '@react-three/drei'
import type { GroupProps } from '@react-three/fiber'
import { ForwardedRef, forwardRef, useImperativeHandle } from 'react'

const createBaseObject = (name: string) => {
  const glbPath = `./${name}.glb`
  useGLTF.preload(glbPath)

  const BaseObject = (props: AnimatedProps<GroupProps>, ref: ForwardedRef<THREE.Group>) => {
    const { scene } = useGLTF(glbPath)

    useImperativeHandle(ref, () => scene as unknown as THREE.Group, [scene])

    // @ts-ignore-error
    return <animated.primitive {...props} object={scene} />
  }
  BaseObject.displayName = name

  return forwardRef(BaseObject)
}

export default createBaseObject
