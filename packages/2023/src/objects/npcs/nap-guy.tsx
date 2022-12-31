import napGuy1 from '../../data/npcs/nap-guy-1'
import napGuy2 from '../../data/npcs/nap-guy-2'
import useDungeonState from '../../hooks/use-dungeon-state'
import MapNpc from '../map-npc'

interface NapGuyProps {
  x: number
  y: number
  n: 1 | 2
  onInteraction(): void
}

export default function NapGuy({ x, y, n, onInteraction }: NapGuyProps) {
  const npcState = useDungeonState((state) => state.napGuyState[n - 1])

  return (
    <MapNpc
      npc={n === 1 ? napGuy1 : napGuy2}
      state={npcState}
      x={x * 32 - 11}
      y={y * 32 - 11}
      onInteraction={onInteraction}
    />
  )
}
