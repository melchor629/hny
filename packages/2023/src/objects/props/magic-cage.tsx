import magicCage from '../../data/props/stuff/magic-cage'
import MapProp from '../map-prop'

interface MagicCageProps {
  x: number
  y: number
}

export default function MagicCage({ x, y }: MagicCageProps) {
  return <MapProp prop={magicCage} x={x * 32 - 9 - 9} y={y * 32 - 9 - 9} />
}
