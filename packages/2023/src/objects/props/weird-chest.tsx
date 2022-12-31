import weirdChestClosed from '../../data/props/stuff/weird-chest-closed'
import weirdChestOpen from '../../data/props/stuff/weird-chest-open'
import MapProp from '../map-prop'

interface WeirdChestProps {
  x: number
  y: number
  open: boolean
  onInteraction?: () => void
}

export default function WeirdChest({ x, y, open, onInteraction }: WeirdChestProps) {
  return (
    <MapProp
      prop={open ? weirdChestOpen : weirdChestClosed}
      x={x * 32 - 32}
      y={y * 32 - 32}
      onInteraction={onInteraction}
    />
  )
}
