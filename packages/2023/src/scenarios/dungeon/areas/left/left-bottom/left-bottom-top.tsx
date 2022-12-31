import { useCallback } from 'react'
import door3Dialog from '../../../../../data/dialogs/door-3'
import useDialog from '../../../../../hooks/use-dialog'
import useDungeonState from '../../../../../hooks/use-dungeon-state'
import MapTile from '../../../../../objects/map-tile'
import Lever from '../../../../../objects/props/lever'

export default function LeftBottomTop() {
  const isDoor3Open = useDungeonState((s) => s.doors.door3.isOpen)

  const toggleDoor3 = useCallback(() => {
    const { isOpen, hasFirstOpened } = useDungeonState.getState().doors.door3
    if (!hasFirstOpened) {
      useDialog.getState().reset(door3Dialog)
    }

    useDungeonState.getState().changeDoorOpenState('door3', !isOpen)
  }, [])

  return (
    <>
      {/* main hall > branch left > branch bottom > branch top */}
      <MapTile wall="both-center" corners={['left-aftertop', 'right-aftertop']} x={29} y={56} />
      <MapTile wall="left-top" corners={['right-bottom']} x={29} y={55} />
      <MapTile wall="center-both" x={30} y={55} />
      <MapTile wall="right-bottom" corners={['left-top']} x={31} y={55} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={31} y={54} />
      <MapTile wall="both-center" x={31} y={53} />
      <MapTile wall="right-top" corners={['left-bottom']} x={31} y={52} />
      <MapTile wall="center-both" x={30} y={52} />
      <MapTile wall="center-both" x={29} y={52} />
      <MapTile wall="center-both" x={28} y={52} />
      <MapTile wall="center-both" x={27} y={52} />
      <MapTile wall="center-both" x={26} y={52} />
      <MapTile wall="left-bottom" corners={['right-top']} x={25} y={52} />
      <MapTile wall="both-center" corners={['right-aftertop']} x={25} y={51} />
      <MapTile wall="both-center" x={25} y={50} />
      <MapTile wall="both-center" x={25} y={49} />
      <MapTile wall="right-top" corners={['left-bottom']} x={25} y={48} />
      <MapTile wall="center-both" x={24} y={48} />
      <MapTile wall="center-both" x={23} y={48} />
      <MapTile wall="center-both" x={22} y={48} />
      <MapTile wall="left-top" corners={['left-aftertop', 'right-bottom']} x={21} y={48} />
      <MapTile wall="right-bottom" corners={['left-top']} x={21} y={49} />
      <MapTile wall="left-bottom" corners={['right-top']} x={20} y={49} />
      <MapTile wall="right-top" corners={['right-aftertop', 'left-bottom']} x={20} y={48} />
      <MapTile wall="center-both" x={19} y={48} />
      <MapTile wall="top" corners={['left-bottom', 'right-bottom']} x={18} y={48} />

      {/* main hall > branch left > branch bottom > branch top > branch left */}
      <MapTile wall="center-both" x={17} y={48} />
      <MapTile wall="center-both" x={16} y={48} />
      <MapTile wall="center-both" x={15} y={48} />
      <MapTile wall="center-both" x={14} y={48} />
      <MapTile wall="center-both" x={13} y={48} />
      <MapTile wall="left-bottom" corners={['right-top']} x={12} y={48} />
      <MapTile wall="both-top" corners={['right-aftertop']} x={12} y={47} />
      <Lever
        orientation="front"
        activated={isDoor3Open}
        x={12}
        y={47}
        onInteraction={toggleDoor3}
      />

      {/* main hall > branch left > branch bottom > branch top > branch bottom */}
      <MapTile wall="both-center" x={18} y={49} />
      <MapTile wall="both-center" x={18} y={50} />
      <MapTile wall="both-center" corners={['right-aftertop']} x={18} y={51} />
      <MapTile wall="left-bottom" corners={['right-top']} x={18} y={52} />
      <MapTile wall="center-both" x={19} y={52} />
      <MapTile wall="right-top" corners={['left-bottom']} x={20} y={52} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={20} y={53} />
      <MapTile wall="right-bottom" corners={['left-top']} x={20} y={54} />
      <MapTile wall="center-both" x={19} y={54} />
      <MapTile wall="center-both" x={18} y={54} />
      <MapTile wall="left-top" corners={['right-bottom']} x={17} y={54} />
      <MapTile wall="both-center" x={17} y={55} />
      <MapTile wall="both-center" corners={['left-aftertop', 'right-aftertop']} x={17} y={56} />
    </>
  )
}
