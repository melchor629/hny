import { useCallback } from 'react'
import door3TryDialog from '../../../../../../data/dialogs/door-3-try'
import useDialog from '../../../../../../hooks/use-dialog'
import useDungeonState from '../../../../../../hooks/use-dungeon-state'
import MapTile from '../../../../../../objects/map-tile'
import LeftDoor from '../../../../doors/left-door'
import LeftBottomLeftBottom from './left-bottom-left-bottom'
import LeftBottomLeftDown from './left-bottom-left-down'
import LeftBottomLeftTop from './left-bottom-left-top'

export default function LeftBottomLeft() {
  const isOpen = useDungeonState((s) => s.doors.door3.isOpen)

  const onDoor3TryOpen = useCallback(() => {
    const { hasFirstOpened } = useDungeonState.getState().doors.door3
    if (!hasFirstOpened) {
      useDialog.getState().reset(door3TryDialog)
    }
  }, [])

  return (
    <>
      {/* main hall > branch left > branch bottom > branch left */}
      <MapTile wall="center-both" x={28} y={57} />
      <MapTile wall="center-both" x={27} y={57} />
      <MapTile wall="top" corners={['left-bottom', 'right-bottom']} x={26} y={57} />
      <LeftBottomLeftDown />
      <MapTile wall="center-both" x={25} y={57} />
      <MapTile wall="center-both" x={24} y={57} />
      <MapTile wall="center-both" x={23} y={57} />
      <MapTile wall="center-both" x={22} y={57} />
      <MapTile wall="center-both" x={21} y={57} />
      <MapTile wall="center-both" x={20} y={57} />
      <MapTile wall="center-both" x={19} y={57} />
      <MapTile wall="center-both" x={18} y={57} />
      <MapTile wall="bottom" corners={['left-top', 'right-top']} x={17} y={57} />
      <MapTile wall="center-both" x={16} y={57} />
      <MapTile wall="center-both" x={15} y={57} />
      <LeftDoor x={14.3} y={56} isOpen={isOpen} toggle={onDoor3TryOpen} />
      <MapTile wall="left" corners={['right-top', 'right-bottom']} x={14} y={57} />

      <LeftBottomLeftBottom />
      <LeftBottomLeftTop />
    </>
  )
}
