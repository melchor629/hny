import { useCallback } from 'react'
import door2Dialog from '../../../../../../data/dialogs/door-2'
import door4Dialog from '../../../../../../data/dialogs/door-4'
import useDialog from '../../../../../../hooks/use-dialog'
import useDungeonState from '../../../../../../hooks/use-dungeon-state'
import MapTile from '../../../../../../objects/map-tile'
import Lever from '../../../../../../objects/props/lever'
import BottomDoor from '../../../../doors/bottom-door'

export default function LeftBottomLeftDown() {
  const { isOpen, hasFirstOpened } = useDungeonState((s) => s.doors.door2)
  const door4 = useDungeonState((s) => s.doors.door4)

  const toggleDoor2 = useCallback(() => {
    if (!hasFirstOpened) {
      useDialog.getState().reset(door2Dialog)
    } else {
      useDungeonState.getState().changeDoorOpenState('door2', !isOpen)
    }
  }, [isOpen, hasFirstOpened])

  const toggleDoor4 = useCallback(() => {
    if (!door4.hasFirstOpened) {
      useDialog.getState().reset(door4Dialog)
    }

    useDungeonState.getState().changeDoorOpenState('door4', !door4.isOpen)
  }, [door4.hasFirstOpened, door4.isOpen])

  return (
    <>
      {/* main hall > branch left > branch bottom > branch left > branch down */}
      <BottomDoor x={26} y={56.45} isOpen={isOpen} toggle={toggleDoor2} />
      <MapTile wall="both-center" x={26} y={58} />
      <MapTile wall="both-center" corners={['right-aftertop']} x={26} y={59} />
      <MapTile wall="left-bottom" corners={['right-top']} x={26} y={60} />
      <MapTile wall="center-both" x={27} y={60} />
      <MapTile wall="center-both" x={28} y={60} />
      <MapTile wall="center-both" x={29} y={60} />
      <MapTile wall="right-top" corners={['left-bottom']} x={30} y={60} />
      <MapTile wall="both-bottom" x={30} y={61} />
      <Lever
        orientation="behind"
        activated={door4.isOpen}
        x={30}
        y={61}
        onInteraction={toggleDoor4}
      />
    </>
  )
}
