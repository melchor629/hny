import tomeuQuely from '../../data/npcs/tomeu-quely'
import useDungeonState from '../../hooks/use-dungeon-state'
import MapNpc from '../map-npc'

export default function TomeuQuely({ x, y }: { x: number; y: number }) {
  const npcState = useDungeonState((state) => state.tomeuQuelyState)

  if (npcState === 'gone') {
    return null
  }

  return <MapNpc npc={tomeuQuely} state={npcState} x={x * 32 - 10.5} y={y * 32 - 16} />
}
