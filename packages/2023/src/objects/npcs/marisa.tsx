import { useCallback } from 'react'
import { marisaDialog } from '../../data/dialogs/marina-marisa'
import marisa from '../../data/npcs/marisa'
import useDialog from '../../hooks/use-dialog'
import useDungeonState from '../../hooks/use-dungeon-state'
import MapNpc from '../map-npc'

const positions = {
  rest: [34.4, 34],
  working: [37.8, 35.7],
  lookingAtYou: [37.7, 35.7],
}

export default function Marisa() {
  const npcState = useDungeonState((state) => state.marisaState)
  const [x, y] = positions[npcState]

  const showDialog = useCallback(() => {
    useDialog
      .getState()
      .reset(marisaDialog)
      .then(() => useDungeonState.getState().changeMarisaState('working'))
  }, [])

  return (
    <MapNpc
      npc={marisa}
      state={npcState}
      x={x * 32 - 16}
      y={y * 32 - 16}
      onInteraction={showDialog}
    />
  )
}
