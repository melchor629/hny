import { useMemo } from 'react'
import { leverBehindDown, leverBehindUp } from '../../data/props/stuff/lever-behind'
import { leverFrontDown, leverFrontUp } from '../../data/props/stuff/lever-front'
import MapProp from '../map-prop'

const props = {
  behind: {
    true: leverBehindDown,
    false: leverBehindUp,
  },
  front: {
    true: leverFrontDown,
    false: leverFrontUp,
  },
}

interface LeverProps {
  orientation: 'front' | 'behind'
  activated: boolean
  x: number
  y: number
  onInteraction?: () => void
}

export default function Lever({ orientation, activated, x, y, onInteraction }: LeverProps) {
  const prop = useMemo(() => props[orientation][`${activated}`], [orientation, activated])
  const fx = useMemo(() => x * 32 + (orientation === 'front' ? -2 : -8), [x])
  const fy = useMemo(() => y * 32 + (orientation === 'front' ? -29 : -6), [y])
  return <MapProp prop={prop} x={fx} y={fy} onInteraction={onInteraction} />
}
