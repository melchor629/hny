import { memo } from 'react'
import { dungeonStairsLeft, dungeonStairsRight } from '../../data/props/stuff/dungeon-stairs'
import MapProp from '../map-prop'

interface DungeonStairsProps {
  x: number
  y: number
}

function DungeonStairs({ x, y }: DungeonStairsProps) {
  return (
    <>
      <MapProp prop={dungeonStairsLeft} x={x * 32 - 16} y={y * 32 - 16} />
      <MapProp prop={dungeonStairsRight} x={x * 32 + 16} y={y * 32 - 16} />
    </>
  )
}

export default memo(DungeonStairs)
