import { useCallback } from 'react'
import doorCode1Dialog from '../../../../data/dialogs/door-code-1'
import useDialog from '../../../../hooks/use-dialog'
import useDungeonState from '../../../../hooks/use-dungeon-state'
import MapTile from '../../../../objects/map-tile'
import Photo from '../../../../objects/props/photo'
import WritenPaper from '../../../../objects/props/writen-paper'
import RightDoor from '../../doors/right-door'
import { TopJail } from './top-jail'
import TopJailRight from './top-jail-right'
import TopJailRightRoom1 from './top-jail-right-room1'
import TopJailRightRoom2 from './top-jail-right-room2'
import TopJailRightRoomsAfter from './top-jail-right-rooms-after'

export default function Top() {
  const isDoorCode1Open = useDungeonState((s) => s.doors.doorCode1.isOpen)

  const openDoorCode1 = useCallback(() => {
    if (!isDoorCode1Open) {
      useDialog.getState().reset(doorCode1Dialog)
    }
  }, [isDoorCode1Open])

  return (
    <>
      {/* main hall > branch top */}
      <MapTile wall="both-center" corners={['left-aftertop', 'right-aftertop']} x={45} y={41} />
      <MapTile wall="both-center" x={45} y={40} />
      <MapTile wall="both-center" x={45} y={39} />
      <MapTile wall="left-top" corners={['right-bottom']} x={45} y={38} />
      <MapTile wall="center-both" x={46} y={38} />
      <RightDoor x={47} y={37} isOpen={isDoorCode1Open} toggle={openDoorCode1} />
      <MapTile wall="center-both" x={47} y={38} />
      <MapTile wall="center-both" x={48} y={38} />
      <MapTile wall="right-bottom" corners={['left-top']} x={49} y={38} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={49} y={37} />
      <MapTile wall="both-center" x={49} y={36} />
      <MapTile wall="both-center" x={49} y={35} />
      <MapTile wall="left" corners={['right-top', 'right-bottom']} x={49} y={34} />
      {/* diverge */}
      <MapTile wall="center-both" x={50} y={34} />
      <MapTile wall="center-both" x={51} y={34} />
      <MapTile wall="top" corners={['left-bottom']} x={52} y={34} />
      <MapTile wall="right-top" x={53} y={34} />
      <MapTile wall="left" corners={['right-bottom']} x={52} y={35} />
      <MapTile wall="right-bottom" x={53} y={35} />
      <MapTile wall="both-bottom" x={52} y={36} />
      <WritenPaper paperId="paper-code-2" x={52} y={36} />
      <Photo photoId="photo-22" alt={1} x={53} y={34.75} />
      {/* end of diverge */}
      <MapTile wall="both-center" corners={['right-aftertop']} x={49} y={33} />
      <MapTile wall="both-center" x={49} y={32} />
      <MapTile wall="both-center" x={49} y={31} />
      <MapTile wall="both-center" x={49} y={30} />
      <MapTile wall="both-center" x={49} y={29} />
      <MapTile wall="both-center" x={49} y={28} />
      <MapTile wall="both-center" x={49} y={27} />

      <TopJail />
      <TopJailRight />
      <TopJailRightRoom1 />
      <TopJailRightRoom2 />
      <TopJailRightRoomsAfter />
    </>
  )
}
