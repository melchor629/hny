import { useThree } from '@react-three/fiber'
import { useCallback, useMemo, useState } from 'react'
import door5Dialog from '../../../../../data/dialogs/door-5'
import {
  firstMarinaDialog,
  firstMarisaDialog,
  marinaMarisaDialog,
  secondMarinaDialog,
  secondMarisaDialog,
  thirdMarinaDialog,
} from '../../../../../data/dialogs/marina-marisa'
import useDialog from '../../../../../hooks/use-dialog'
import useDungeonState from '../../../../../hooks/use-dungeon-state'
import useInput from '../../../../../hooks/use-input'
import useInventory from '../../../../../hooks/use-inventory'
import usePlayerRef from '../../../../../hooks/use-player-ref'
import MapTile from '../../../../../objects/map-tile'
import MapTrigger from '../../../../../objects/map-trigger'
import Marina from '../../../../../objects/npcs/marina'
import Marisa from '../../../../../objects/npcs/marisa'
import MagicCage from '../../../../../objects/props/magic-cage'
import Shelf from '../../../../../objects/props/shelf'
import Table from '../../../../../objects/props/table'
import CameraAnimationController from '../../../../../utils/camera-animation-controller'
import wait from '../../../../../utils/wait'
import TopDoor from '../../../doors/top-door'

export default function LeftTopRoom() {
  const playerRef = usePlayerRef()
  const camera = useThree((state) => state.camera)
  const fakeInput = useInput('nothing')
  const [isDoor5Open, isDoorNpc2Open] = useDungeonState((s) => [
    s.doors.door5.isOpen,
    s.doors.doorNpc2.isOpen,
  ])
  const [showCage, setShowCage] = useState(false)

  const onDoor5Open = useCallback(() => {
    const inv = useInventory.getState()
    if (!isDoor5Open) {
      if (inv.inventory.find((i) => i.id === 'key-door-5')?.count) {
        inv.removeFromInventory('key-door-5')
        useDungeonState.getState().changeDoorOpenState('door5', true)
      } else {
        useDialog.getState().reset(door5Dialog)
      }
    }
  }, [isDoor5Open])

  const onPlayerInsideRoom = useCallback(
    (dir: string) => {
      if (dir === 'top') {
        return
      }

      const hasPhoto = useInventory.getState().book.find((p) => p.id === 'photo-10')?.discovered
      if (hasPhoto) {
        return
      }

      ;(async () => {
        // prevent player from moving
        fakeInput.focus()

        const animController = new CameraAnimationController(camera as any)

        await animController.to({ delay: 1250, duration: 1500, x: 34 * 32, y: 34.5 * 32 })

        await wait(5000)
        useDungeonState.getState().changeMarinaState('lookingAtYou')
        await animController.to({ delay: 500, x: 30.4 * 32, y: 32.75 * 32, zoom: 2.125 })
        await useDialog.getState().reset(firstMarinaDialog)
        fakeInput.focus()

        await animController.to({ delay: 500, x: 37.8 * 32, y: 35.7 * 32, zoom: 2.125 })
        useDungeonState.getState().changeMarinaState('lookingAtYou')
        useDungeonState.getState().changeMarisaState('lookingAtYou')
        await wait(500)
        await useDialog.getState().reset(firstMarisaDialog)
        fakeInput.focus()

        await animController.to({ delay: 500, x: 30.4 * 32, y: 32.75 * 32, zoom: 2.125 })
        await wait(500)
        await useDialog.getState().reset(secondMarinaDialog)
        fakeInput.focus()

        await animController.to({ delay: 500, x: 37.8 * 32, y: 35.7 * 32, zoom: 2.125 })
        await wait(500)
        await useDialog.getState().reset(secondMarisaDialog)
        fakeInput.focus()

        await animController.to({ delay: 500, x: 30.4 * 32, y: 32.75 * 32, zoom: 2.125 })
        await wait(500)
        await useDialog.getState().reset(thirdMarinaDialog)
        fakeInput.focus()

        await animController.to({
          delay: 500,
          duration: 20,
          x: 34 * 32,
          y: 32 * 32,
          zoom: 2,
        })

        useDungeonState.getState().changeMarinaState('rest')
        useDungeonState.getState().changeMarisaState('rest')
        playerRef.current!.dir = 'up'
        playerRef.current!.position.set(34.25 * 32 - 9, -(34.5 * 32 - 9), 0)
        playerRef.current!.updateMatrixWorld()
        setShowCage(true)

        await animController.to({
          delay: 1250,
          duration: 1500,
          x: 34.25 * 32,
          y: 34.5 * 32,
        })

        await useDialog.getState().reset(marinaMarisaDialog)
        fakeInput.focus()

        await animController.to({
          delay: 1250,
          x: 34.25 * 32,
          y: 34.5 * 32 - 9,
          zoom: 1,
        })

        setShowCage(false)
        playerRef.current!.moveTo(34.25 * 32 - 9, 34.5 * 32 - 9)
        playerRef.current!.dir = 'down'
        playerRef.current!.updateMatrixWorld()

        await wait(500)

        useDungeonState.getState().changeMarinaState('working')
        useDungeonState.getState().changeMarisaState('working')
        useDungeonState.getState().changeDoorOpenState('doorNpc2', true)

        // give back player's movement
        await wait(500)
        fakeInput.blur()
      })()
    },
    [camera, fakeInput, playerRef],
  )

  return (
    <>
      <MapTile wall="left-both" x={30} y={36} />
      <Table kind="butcher" x={30} y={35.8} />
      <MapTile wall="bottom" corners={['left-top']} x={31} y={36} />
      <MapTile wall="bottom" x={32} y={36} />
      <Shelf kind="back" x={32} y={36} />
      <MapTile wall="bottom" x={33} y={36} />
      <Shelf kind="back" x={33} y={36} />
      <TopDoor x={34} y={35.45} isOpen={isDoor5Open} toggle={onDoor5Open} />
      <MapTile wall="center" corners={['left-bottom', 'right-bottom']} x={34} y={36} />
      <MapTile wall="bottom" x={35} y={36} />
      <Shelf kind="back" x={35} y={36} />
      <MapTile wall="bottom" x={36} y={36} />
      <Shelf kind="back" x={36} y={36} />
      <MapTile wall="bottom" corners={['right-top']} x={37} y={36} />
      <Table kind="alchemist" x={38} y={35.8} />
      <MapTile wall="right-both" x={38} y={36} />

      <MapTile wall="left" corners={['left-aftertop']} x={31} y={35} />
      <MapTile wall="center" x={32} y={35} />
      <MapTile wall="center" x={33} y={35} />
      <MapTile wall="center" x={34} y={35} />
      <MapTile wall="center" x={35} y={35} />
      <MapTile wall="center" x={36} y={35} />
      <MapTile wall="right" corners={['right-aftertop']} x={37} y={35} />

      <MapTile wall="left" x={31} y={34} />
      <MapTile wall="center" x={32} y={34} />
      <MapTile wall="center" x={33} y={34} />
      <MapTile wall="center" x={34} y={34} />
      {showCage && <MagicCage x={34.25} y={34.5} />}
      <MapTile wall="center" x={35} y={34} />
      <MapTile wall="center" x={36} y={34} />
      <MapTile wall="right" x={37} y={34} />

      <MapTile wall="left-both" x={30} y={33} />
      <Table kind="magic" x={30} y={32.8} />
      <MapTile wall="top" corners={['left-bottom']} x={31} y={33} />
      <MapTile wall="top" x={32} y={33} />
      <Shelf kind="books" x={32.5} y={32.45} />
      <MapTile wall="top" x={33} y={33} />
      <MapTile wall="center" corners={['left-top', 'right-top']} x={34} y={33} />
      <MapTile wall="top" x={35} y={33} />
      <Shelf kind="forgotten" x={35.5} y={32.45} />
      <MapTile wall="top" x={36} y={33} />
      <MapTile wall="top" corners={['right-bottom']} x={37} y={33} />
      <Table kind="empty" x={38} y={32.8} />
      <MapTile wall="right-both" x={38} y={33} />

      <TopDoor x={34} y={31.6} isOpen={isDoorNpc2Open} />
      <MapTile wall="both-center" corners={['left-aftertop', 'right-aftertop']} x={34} y={32} />
      <MapTile wall="both-center" x={34} y={31} />
      <MapTile wall="both-center" x={34} y={30} />
      <MapTile wall="top" corners={['left-bottom', 'right-bottom']} x={34} y={29} />

      <Marina />
      <Marisa />
      <MapTrigger
        boundingBox={useMemo(
          () => ({ x1: 33.5 * 32, x2: 34.5 * 32, y1: 36 * 32, y2: 36.5 * 32 }),
          [],
        )}
        onPlayerOutside={onPlayerInsideRoom}
      />
    </>
  )
}
