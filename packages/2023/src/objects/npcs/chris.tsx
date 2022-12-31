import chris from '../../data/npcs/chris'
import useDungeonState from '../../hooks/use-dungeon-state'
import MapNpc from '../map-npc'

const positions = {
  rest: [62.36, 24.25],
  sleep: [62.4, 22.6],
  wakingUp: [62.4, 22.6],
}

export default function Chris() {
  const npcState = useDungeonState((state) => state.chrisState)
  const [x, y] = positions[npcState]

  return <MapNpc npc={chris} state={npcState} x={x * 32 - 16} y={y * 32 - 16} />
}
