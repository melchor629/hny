import { memo, useCallback, useMemo } from 'react'
import key1 from '../../data/props/stuff/key-1'
import key2 from '../../data/props/stuff/key-2'
import useInventory from '../../hooks/use-inventory'
import MapProp from '../map-prop'

const props = {
  left: key2,
  right: key1,
}

interface KeyProps {
  dir: 'left' | 'right'
  keyId: string
  x: number
  y: number
}

function Key({ dir, keyId, x, y }: KeyProps) {
  const inInventory = useInventory((s) => !!s.inventory.find((e) => e.id === keyId))
  const prop = useMemo(() => props[dir], [dir])

  const onInteraction = useCallback(() => {
    const inventory = useInventory.getState()
    inventory.addToInventory(keyId)
  }, [keyId])

  if (inInventory) {
    return null
  }

  return <MapProp prop={prop} x={x * 32 - 4} y={y * 32 - 2} onInteraction={onInteraction} />
}

export default memo(Key)
