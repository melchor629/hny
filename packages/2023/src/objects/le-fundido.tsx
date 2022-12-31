import { Controller } from '@react-spring/web'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { Mesh, MeshBasicMaterial, OrthographicCamera, PlaneGeometry } from 'three'
import useInput from '../hooks/use-input'
import useScenario from '../hooks/use-scenario'

const fundidoPlane = new Mesh(
  new PlaneGeometry(640, 640),
  new MeshBasicMaterial({ color: 'black', transparent: true }),
)
fundidoPlane.name = 'fundido'
fundidoPlane.position.z = -1
fundidoPlane.renderOrder = 1_000_000

export default function LeFundido() {
  const loadingScenario = useScenario((s) => s.loading)
  const camera = useThree((s) => s.camera as OrthographicCamera)
  const [mesh] = useState(() => fundidoPlane.clone())
  const [spring] = useState(
    () =>
      new Controller<{ opacity: number }>({
        opacity: 1,
        onChange(v) {
          mesh.material.opacity = v.value.opacity
        },
      }),
  )
  const fakeInput = useInput('nothing')

  useEffect(
    () => () => {
      camera.remove(mesh)
    },
    [],
  )

  useEffect(() => {
    if (loadingScenario) {
      fakeInput.focus()
      spring.start({ opacity: 1 }).then(() => useScenario.getState().load())
    } else {
      spring.start({ opacity: 0 }).finally(() => fakeInput.blur())
    }
  }, [loadingScenario])

  useFrame(() => {
    if (mesh.material.opacity !== 0) {
      // keep position synchronized with camera while changing scenario
      mesh.position.set(camera.position.x, camera.position.y, 0)
      mesh.updateMatrixWorld(true)
    }
  })

  return <primitive object={mesh} />
}
