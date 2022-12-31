import { memo, useMemo } from 'react'
import barrelLeft from '../../data/props/stuff/barrel-left'
import barrelRight from '../../data/props/stuff/barrel-right'
import barrelUp from '../../data/props/stuff/barrel-up'
import MapProp from '../map-prop'

const props = {
  left: barrelLeft,
  right: barrelRight,
  up: barrelUp,
}

interface BarrelProps {
  dir: 'left' | 'right' | 'up'
  x: number
  y: number
  onInteraction?: () => void
}

function Barrel({ dir, onInteraction, x, y }: BarrelProps) {
  const prop = useMemo(() => props[dir], [dir])
  return <MapProp prop={prop} x={x * 32 - 16} y={y * 32 - 16} onInteraction={onInteraction} />
}

export default memo(Barrel)
