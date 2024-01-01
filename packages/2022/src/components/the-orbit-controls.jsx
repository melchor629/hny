import { OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { Matrix4, QuaternionKeyframeTrack } from 'three'
import { cubicInOut, lerp } from '../fns'
import { usePartStore } from '../stores'

const TheOrbitControls = () => {
  const camera = useThree((s) => s.camera)
  const [cameraAnimation, setCameraAnimation] = useState(null)
  const selectedPart = usePartStore(({ selectedPart }) => selectedPart)

  useFrame((_, delta) => {
    if (cameraAnimation) {
      const shouldAnimate1 = !cameraAnimation.backwards && cameraAnimation.time < 1.0
      const shouldAnimate2 = cameraAnimation.backwards && cameraAnimation.time > 0.0
      if (shouldAnimate1 || shouldAnimate2) {
        const t = cubicInOut(cameraAnimation.time)
        const interpoledValue = cameraAnimation.interpolant.evaluate(t)
        const newRotation = cameraAnimation.camera.quaternion.clone().fromArray(interpoledValue)
        camera.setRotationFromQuaternion(newRotation)
        camera.fov = lerp(cameraAnimation.originalFov, cameraAnimation.targetFov, t)
        camera.updateProjectionMatrix()
        if (shouldAnimate1) {
          cameraAnimation.time += delta // sorry :(
        } else if (shouldAnimate2) {
          cameraAnimation.time -= delta // sorry again :(
        }

        if (cameraAnimation.backwards && cameraAnimation.time <= 0.0) {
          setCameraAnimation(null)
        }
      }
    }
  })

  useEffect(() => {
    if (selectedPart != null) {
      const mat = new Matrix4()
      mat.lookAt(camera.position, selectedPart.position, camera.up)
      const targetRotation = camera.quaternion.clone().setFromRotationMatrix(mat)
      const distance = selectedPart.position.distanceTo(camera.position)

      setCameraAnimation({
        camera,
        originalRotation: camera.quaternion,
        originalFov: camera.fov,
        targetRotation,
        // TODO improve with function by parts
        targetFov: Math.max(camera.fov - Math.pow(Math.max(distance - 2, 0) * 4, 9 / 10), 5),
        time: 0, // <- this value is mutable, sorry m8s :(
        backwards: false,
        interpolant: new QuaternionKeyframeTrack(
          '.quaternion',
          [0, 1],
          [camera.quaternion, targetRotation].map((q) => q.toArray()).flat(),
        ).InterpolantFactoryMethodLinear(new Float32Array(4)),
        distance,
      })
    } else {
      setCameraAnimation((state) => state && { ...state, backwards: true })
    }
  }, [selectedPart, camera])

  return (
    <OrbitControls
      enabled={selectedPart == null && cameraAnimation == null}
      enablePan={false}
      enableZoom={true}
      enableRotate={true}
      maxDistance={50}
      minDistance={1}
    />
  )
}

export default TheOrbitControls
