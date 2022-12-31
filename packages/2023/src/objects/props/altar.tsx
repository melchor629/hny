import { useCallback } from 'react'
import { whatIsDis, whatIsThis } from '../../data/dialogs/what-is-dis'
import leuhm from '../../data/npcs/leuhm'
import altar from '../../data/props/stuff/altar'
import useDialog from '../../hooks/use-dialog'
import useInventory from '../../hooks/use-inventory'
import MapNpc from '../map-npc'
import MapProp from '../map-prop'

export default function Altar({ x, y }: { x: number; y: number }) {
  const hasGrabbedPhoto = useInventory((s) => s.book.find((p) => p.id === 'special-1')?.discovered)

  const grab = useCallback(() => {
    useDialog.getState().reset(hasGrabbedPhoto ? whatIsThis : whatIsDis)
  }, [hasGrabbedPhoto])

  // TODO cpu optimization ?
  /* useFrame(({ camera }) => {
    if (!meshRef.current) {
      return
    }

    frustumRef.current ??= new Frustum()
    matRef.current ??= new Matrix4()
    matRef.current.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    frustumRef.current.setFromProjectionMatrix(matRef.current)

    const check = frustumRef.current.intersectsObject(meshRef.current!)
    if (isVisible !== check) {
      setVisible(check)
    }
  }) */

  return (
    <>
      <MapProp prop={altar} x={x * 32 - 16} y={y * 32 - 16} onInteraction={grab} />
      {!hasGrabbedPhoto && <MapNpc npc={leuhm} state="rest" x={x * 32 + 31} y={y * 32 - 6} />}
    </>
  )
}
