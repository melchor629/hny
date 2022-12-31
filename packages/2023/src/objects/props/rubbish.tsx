import { useMemo } from 'react'
import rubbishProps from '../../data/props/stuff/rubbish'
import MapProp from '../map-prop'

interface RubbishProps {
  x: number
  y: number
  onInteraction?: (side: 'left' | 'right' | 'top' | 'bottom') => void
}

export default function Rubbish({ x, y, onInteraction }: RubbishProps) {
  const rubbish = useMemo(() => rubbishProps[Math.trunc(Math.random() * rubbishProps.length)], [])
  return <MapProp prop={rubbish} x={x * 32 - 11} y={y * 32 - 23} onInteraction={onInteraction} />
}
