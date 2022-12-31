import { useCallback } from 'react'
import door1Dialog from '../../../data/dialogs/door-1'
import useDialog from '../../../hooks/use-dialog'
import useDungeonState from '../../../hooks/use-dungeon-state'
import useInventory from '../../../hooks/use-inventory'
import MapTile from '../../../objects/map-tile'
import Key from '../../../objects/props/key'
import Photo from '../../../objects/props/photo'
import RightDoor from '../doors/right-door'

export default function TopRight() {
  const [{ isOpen }, change] = useDungeonState((s) => [s.doors.door1, s.changeDoorOpenState])

  const open = useCallback(() => {
    if (!isOpen) {
      const { inventory, removeFromInventory } = useInventory.getState()
      const [key1, key2] = [
        inventory.find((i) => i.id === 'key-a-door-1'),
        inventory.find((i) => i.id === 'key-b-door-1'),
      ] as const
      useDialog.getState().reset(door1Dialog)
      if (key1?.count && key2?.count) {
        change('door1', true)
        removeFromInventory('key-a-door-1')
        removeFromInventory('key-b-door-1')
      }
    }
  }, [isOpen, change])

  return (
    <>
      {/* main hall > branch top right */}
      <MapTile wall="center-both" x={55} y={43} />
      <MapTile wall="center-both" x={56} y={43} />
      <MapTile wall="center-both" x={57} y={43} />
      <MapTile
        wall="center"
        corners={['left-top', 'right-top', 'left-bottom', 'right-bottom']}
        x={58}
        y={43}
      />
      {/* main hall > branch top right > bottom */}
      <MapTile wall="both-center" x={58} y={44} />
      <MapTile wall="both-bottom" x={58} y={45} />
      {/* main hall > branch top right > center */}
      <MapTile wall="center-both" x={59} y={43} />
      <MapTile wall="center-both" x={60} y={43} />
      <MapTile wall="center-both" x={61} y={43} />
      <RightDoor x={62} y={42} isOpen={isOpen} toggle={open} />
      <MapTile wall="center-both" x={62} y={43} />
      <MapTile wall="center-both" x={63} y={43} />
      <MapTile wall="center-both" x={64} y={43} />
      <MapTile wall="left-top" corners={['left-aftertop']} x={65} y={42} />
      <MapTile wall="center" corners={['left-top', 'left-bottom']} x={65} y={43} />
      <MapTile wall="left-bottom" x={65} y={44} />
      <MapTile wall="right-top" x={66} y={42} />
      <MapTile wall="right" x={66} y={43} />
      <MapTile wall="right-bottom" x={66} y={44} />
      {/* main hall > branch top right > top */}
      <MapTile wall="both-center" corners={['left-aftertop', 'right-aftertop']} x={58} y={42} />
      <MapTile wall="both-center" x={58} y={41} />
      <MapTile wall="left-top" corners={['right-bottom']} x={58} y={40} />
      <MapTile wall="bottom" corners={['left-top', 'right-top']} x={59} y={40} />
      <MapTile wall="both-center" corners={['left-aftertop', 'right-aftertop']} x={59} y={39} />
      <MapTile wall="both-top" x={59} y={38} />
      <Key dir="right" keyId="key-a-door-1" x={59} y={38} />
      <MapTile wall="center-both" x={60} y={40} />
      <MapTile wall="top" corners={['left-bottom', 'right-bottom']} x={61} y={40} />
      <MapTile wall="both-center" x={61} y={41} />
      <MapTile wall="both-bottom" x={61} y={42} />
      <Key dir="left" keyId="key-b-door-1" x={61} y={42} />
      <MapTile wall="center-both" x={62} y={40} />
      <MapTile wall="right-both" x={63} y={40} />

      <Photo alt={3} photoId="photo-5" x={65.75} y={42.75} />
    </>
  )
}
