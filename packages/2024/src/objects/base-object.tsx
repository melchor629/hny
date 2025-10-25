import { AnimatedProps, animated } from '@react-spring/three'
import { useGLTF } from '@react-three/drei'
import type { ThreeElements } from '@react-three/fiber'
import { ForwardedRef, forwardRef, useImperativeHandle } from 'react'
import type { Group } from 'three'

const createBaseObject = (name: string) => {
  const glbPath = `./${name}.glb`
  useGLTF.preload(glbPath)

  const BaseObject = (props: AnimatedProps<ThreeElements['group']>, ref: ForwardedRef<Group>) => {
    const { scene } = useGLTF(glbPath)

    useImperativeHandle(ref, () => scene as unknown as Group, [scene])

    // @ts-ignore-error
    return <animated.primitive {...props} object={scene} />
  }
  BaseObject.displayName = name

  return forwardRef(BaseObject)
}

export default createBaseObject
