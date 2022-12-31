import { memo, useEffect, useMemo, useState } from 'react'
import { BufferAttribute, BufferGeometry, MeshBasicMaterial } from 'three'
import type { CollisionBox } from '../types/collisions'

const materials = {
  tile: new MeshBasicMaterial({ color: 0xffaaee, transparent: true, wireframe: true }),
  prop: new MeshBasicMaterial({ color: 0xaaeeff, transparent: true, wireframe: true }),
  npc: new MeshBasicMaterial({ color: 0xeeaaff, transparent: true, wireframe: true }),
  trigger: new MeshBasicMaterial({ color: 0xaaffee, transparent: true, wireframe: true }),
}

function Collision({
  collision: {
    type,
    boundingBox: { min, max },
  },
  show,
}: {
  collision: CollisionBox
  show: boolean
}) {
  const bufferGeometry = useMemo(() => {
    const geometry = new BufferGeometry()
    const vertices = new Float32Array([
      min.x,
      min.y,
      0.0,
      max.x,
      min.y,
      0.0,
      max.x,
      max.y,
      0.0,

      max.x,
      max.y,
      0.0,
      min.x,
      max.y,
      0.0,
      min.x,
      min.y,
      0.0,
    ])
    geometry.setAttribute('position', new BufferAttribute(vertices, 3))
    return geometry
  }, [min.x, min.y, max.x, max.y])

  const material = useMemo(() => materials[type], [type])

  return (
    <mesh visible={show}>
      <primitive object={bufferGeometry} />
      <primitive object={material} />
    </mesh>
  )
}

export default memo(function CollisionsDebugger({ collisions }: { collisions: CollisionBox[] }) {
  const [show, setShow] = useState<boolean | undefined>()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'KeyP') {
        setShow((v) => !v)
      }
    }

    window.addEventListener('keypress', handler, false)
    return () => window.removeEventListener('keypress', handler, false)
  }, [])

  if (show === undefined) {
    return null
  }

  return (
    <group renderOrder={9999}>
      {collisions.map((collision) => (
        <Collision key={collision.toString()} collision={collision} show={show} />
      ))}
    </group>
  )
})
