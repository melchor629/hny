import { useCallback } from 'react'
import { marinaDialog } from '../../data/dialogs/marina-marisa'
import marina from '../../data/npcs/marina'
import useDialog from '../../hooks/use-dialog'
import useDungeonState from '../../hooks/use-dungeon-state'
import MapNpc from '../map-npc'

const positions = {
  rest: [33.9, 34],
  working: [30.4, 32.75],
  lookingAtYou: [30.5, 32.75],
  pointingAtYou: [30.6, 32.75],
}

export default function Marina() {
  const npcState = useDungeonState((state) => state.marinaState)
  const [x, y] = positions[npcState]

  const showDialog = useCallback(() => {
    useDialog
      .getState()
      .reset(marinaDialog)
      .then(() => useDungeonState.getState().changeMarinaState('working'))
  }, [])

  return (
    <MapNpc
      npc={marina}
      state={npcState}
      x={x * 32 - 16}
      y={y * 32 - 16}
      onInteraction={showDialog}
    />
  )
}
