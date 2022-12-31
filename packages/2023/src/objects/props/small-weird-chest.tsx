import smallWeirdChestClosed from '../../data/props/stuff/small-weird-chest-closed'
import smallWeirdChestOpen from '../../data/props/stuff/small-weird-chest-open'
import MapProp from '../map-prop'

interface SmallWeirdChestProps {
  x: number
  y: number
  open: boolean
  onInteraction?: () => void
}

export default function SmallWeirdChest({ x, y, open, onInteraction }: SmallWeirdChestProps) {
  return (
    <MapProp
      prop={open ? smallWeirdChestOpen : smallWeirdChestClosed}
      x={x * 32 - 4}
      y={y * 32 - 4}
      onInteraction={onInteraction}
    />
  )
}
