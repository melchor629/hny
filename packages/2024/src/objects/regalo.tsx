import { AnimatedProps, animated } from '@react-spring/three'
import { useGLTF } from '@react-three/drei'
import type { GroupProps } from '@react-three/fiber'
import { forwardRef, useImperativeHandle, useMemo } from 'react'

type RefType = {
  caja: THREE.Object3D
  tapa: THREE.Object3D
}

type Props = AnimatedProps<GroupProps> & {
  cajaProps?: AnimatedProps<GroupProps>
  tapaProps?: AnimatedProps<GroupProps>
}

const glbPath = './regalo.glb'

const Regalo = forwardRef<RefType, Props>(function Regalo({ cajaProps, tapaProps, ...props }, ref) {
  const { scene } = useGLTF(glbPath)

  const caja = useMemo(
    () => scene.getObjectByName('caja_regalo')!.clone() as unknown as THREE.Group,
    [scene],
  )
  const tapa = useMemo(
    () => scene.getObjectByName('tapa_regalo')!.clone() as unknown as THREE.Group,
    [scene],
  )

  useImperativeHandle(
    ref,
    () => ({
      caja,
      tapa,
    }),
    [caja, tapa],
  )

  return (
    <animated.group {...props}>
      {/** @ts-ignore-error */}
      <animated.primitive {...cajaProps} object={caja} />
      <animated.primitive {...tapaProps} object={tapa} />
    </animated.group>
  )
})

useGLTF.preload(glbPath)

export default Regalo
