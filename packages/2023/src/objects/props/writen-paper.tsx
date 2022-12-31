import { memo, useCallback } from 'react'
import writenPaperProp from '../../data/props/stuff/writen-paper'
import useInventory from '../../hooks/use-inventory'
import MapProp from '../map-prop'

interface KeyProps {
  paperId: string
  x: number
  y: number
}

function WritenPaper({ paperId, x, y }: KeyProps) {
  const inInventory = useInventory((s) => !!s.inventory.find((e) => e.id === paperId))

  const onInteraction = useCallback(() => {
    const inventory = useInventory.getState()
    inventory.addToInventory(paperId)
  }, [paperId])

  if (inInventory) {
    return null
  }

  return (
    <MapProp prop={writenPaperProp} x={x * 32 - 8} y={y * 32 - 8} onInteraction={onInteraction} />
  )
}

export default memo(WritenPaper)
