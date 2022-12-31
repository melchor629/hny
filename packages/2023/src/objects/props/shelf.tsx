import { memo, useMemo } from 'react'
import shelfBack from '../../data/props/stuff/shelf-back'
import shelfBooks from '../../data/props/stuff/shelf-books'
import shelfEmpty from '../../data/props/stuff/shelf-empty'
import shelfForgotten from '../../data/props/stuff/shelf-forgotten'
import shelfSide from '../../data/props/stuff/shelf-side'
import MapProp from '../map-prop'

const props = {
  books: shelfBooks,
  forgotten: shelfForgotten,
  back: shelfBack,
  empty: shelfEmpty,
  side: shelfSide,
}

interface ShelfProps {
  kind: 'books' | 'forgotten' | 'back' | 'empty' | 'side'
  x: number
  y: number
  onInteraction?: () => void
  flip?: boolean
}

function Shelf({ kind, onInteraction, x, y, flip }: ShelfProps) {
  const prop = useMemo(() => props[kind], [kind])
  return (
    <MapProp
      prop={prop}
      x={x * 32 - 16}
      y={y * 32 - 16}
      onInteraction={onInteraction}
      flipHorizontal={flip}
    />
  )
}

export default memo(Shelf)
