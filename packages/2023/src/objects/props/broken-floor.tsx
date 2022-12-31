import { brokenFloor1, brokenFloor2, brokenFloor3 } from '../../data/props/stuff/broken-floor'
import MapProp from '../map-prop'

interface BrokenFloorProps {
  stage: 1 | 2 | 3 | '1' | '2' | '3'
  x: number
  y: number
  onInteraction?: () => void
}

const props = { 1: brokenFloor1, 2: brokenFloor2, 3: brokenFloor3 }

export default function BrokenFloor({ stage, x, y, onInteraction }: BrokenFloorProps) {
  return (
    <MapProp prop={props[stage]} x={x * 32 - 16} y={y * 32 - 16} onInteraction={onInteraction} />
  )
}
