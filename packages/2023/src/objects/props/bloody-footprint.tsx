import { useLayoutEffect, useMemo, useRef } from 'react'
import { Euler, Group, Matrix4 } from 'three'
import bloodyFootprint from '../../data/props/stuff/bloody-footprint'
import MapProp from '../map-prop'

export default function BloodyFootprint({ x, y, r }: { x: number; y: number; r?: number }) {
  const groupRef = useRef<Group>(null)

  const rotation = useMemo(() => {
    const euler = new Euler()
    const mat = new Matrix4()
    mat.makeRotationZ(((r ?? 0) * Math.PI) / 180)
    euler.setFromRotationMatrix(mat)
    return euler
  }, [r])

  const position = useMemo(() => [x * 32, -(y * 32), 0] as const, [x, y])

  useLayoutEffect(() => {
    if (groupRef.current == null) {
      return
    }

    groupRef.current.rotation.copy(rotation)
    groupRef.current.position.set(position[0], position[1], 0)
    groupRef.current.updateMatrixWorld(true)
  }, [rotation, position])

  return (
    <group ref={groupRef} rotation={rotation} position={position}>
      <MapProp prop={bloodyFootprint} x={-16} y={-16} />
    </group>
  )
}
