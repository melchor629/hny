import { memo, useCallback, useMemo } from 'react'
import photo1 from '../../data/props/stuff/photo-1'
import photo2 from '../../data/props/stuff/photo-2'
import photo3 from '../../data/props/stuff/photo-3'
import photo4 from '../../data/props/stuff/photo-4'
import photo5 from '../../data/props/stuff/photo-5'
import photo6 from '../../data/props/stuff/photo-6'
import useInventory from '../../hooks/use-inventory'
import MapProp from '../map-prop'

const props = [photo1, photo2, photo3, photo4, photo5, photo6] as const

interface KeyProps {
  alt: 1 | 2 | 3 | 4 | 5 | 6
  x: number
  y: number
  photoId: string
}

function Key({ alt, photoId, x, y }: KeyProps) {
  const prop = useMemo(() => props[alt - 1], [alt])
  const { photo, discover } = useInventory((s) => ({
    photo: s.book.find((i) => i.id === photoId),
    discover: s.discoverPhoto,
  }))

  const onInteraction = useCallback(() => {
    if (photo) {
      discover(photo.id)
    }
  }, [photo, discover])

  if (photo?.discovered) {
    return null
  }

  return <MapProp prop={prop} x={x * 32 - 8} y={y * 32 - 8} onInteraction={onInteraction} />
}

export default memo(Key)
