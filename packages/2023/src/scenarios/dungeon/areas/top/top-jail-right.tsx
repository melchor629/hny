import { useCallback } from 'react'
import doorCode2Dialog from '../../../../data/dialogs/door-code-2'
import useDialog from '../../../../hooks/use-dialog'
import useDungeonState from '../../../../hooks/use-dungeon-state'
import MapTile from '../../../../objects/map-tile'
import Photo from '../../../../objects/props/photo'
import RightDoor from '../../doors/right-door'

export default function TopJailRight() {
  const isDoorCode2Open = useDungeonState((s) => s.doors.doorCode2.isOpen)

  const openDoorCode2 = useCallback(() => {
    if (!isDoorCode2Open) {
      useDialog.getState().reset(doorCode2Dialog)
    }
  }, [isDoorCode2Open])

  return (
    <>
      {/* main hall > branch top > jail > right */}
      <MapTile wall="center-both" x={68} y={26} />
      <MapTile wall="center-both" x={69} y={26} />
      <MapTile wall="right-bottom" corners={['left-top']} x={70} y={26} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={70} y={25} />
      <MapTile wall="both-center" x={70} y={24} />
      <MapTile wall="both-center" x={70} y={23} />
      <MapTile wall="both-center" x={70} y={22} />
      <MapTile wall="both-center" x={70} y={21} />

      {/* main hall > branch top > jail > right > room */}
      <MapTile wall="left" corners={['right-bottom']} x={70} y={20} />
      <MapTile wall="bottom" x={71} y={20} />
      <MapTile wall="bottom" x={72} y={20} />
      <MapTile wall="bottom" x={73} y={20} />
      <MapTile wall="bottom" corners={['right-top']} x={74} y={20} />

      <MapTile wall="left-top" x={70} y={19} />
      <MapTile wall="top" x={71} y={19} />
      <MapTile wall="top" x={72} y={19} />
      <MapTile wall="top" x={73} y={19} />
      <MapTile wall="right-top" corners={['right-aftertop']} x={74} y={19} />

      <MapTile wall="center-both" x={75} y={20} />
      <MapTile wall="right" corners={['left-top', 'left-bottom', 'right-aftertop']} x={76} y={20} />
      <RightDoor x={74.4} y={19} isOpen={isDoorCode2Open} toggle={openDoorCode2} />
      <Photo alt={3} photoId="photo-16" x={75} y={20} />

      {/* main hall > branch top > jail > right > room > branch bottom */}
      <MapTile wall="left-bottom" corners={['right-top']} x={76} y={21} />
      <MapTile wall="center-both" x={77} y={21} />
      <MapTile wall="right-top" corners={['left-bottom']} x={78} y={21} />
      <MapTile wall="both-center" x={78} y={22} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={78} y={23} />
      <MapTile wall="right-bottom" corners={['left-top']} x={78} y={24} />
      <MapTile wall="left-both" x={77} y={24} />

      {/* main hall > branch top > jail > right > room > branch top */}
      <MapTile wall="both-center" corners={['left-aftertop']} x={76} y={19} />
      <MapTile wall="both-center" x={76} y={18} />
      <MapTile wall="both-center" x={76} y={17} />
      <MapTile wall="both-center" x={76} y={16} />
      <MapTile wall="right-top" corners={['left-bottom']} x={76} y={15} />
      <MapTile wall="center-both" x={75} y={15} />
      <MapTile wall="center-both" x={74} y={15} />
      <MapTile wall="center-both" x={73} y={15} />
      <MapTile wall="bottom" corners={['left-top', 'right-top']} x={72} y={15} />
      <MapTile wall="center-both" x={71} y={15} />
      <MapTile wall="left-top" corners={['right-bottom']} x={70} y={15} />
      <MapTile wall="both-center" x={70} y={16} />
      <MapTile wall="both-bottom" x={70} y={17} />
    </>
  )
}
