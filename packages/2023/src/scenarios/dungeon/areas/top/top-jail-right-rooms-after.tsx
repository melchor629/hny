import { useCallback, useMemo, useState } from 'react'
import crackDialog from '../../../../data/dialogs/crack-dialog'
import door6Dialog from '../../../../data/dialogs/door-6'
import napGuysDialog from '../../../../data/dialogs/nap-guys'
import useAcademiaRoomState from '../../../../hooks/use-academia-room-state'
import useDialog from '../../../../hooks/use-dialog'
import useDungeonState from '../../../../hooks/use-dungeon-state'
import useInventory from '../../../../hooks/use-inventory'
import MapTile from '../../../../objects/map-tile'
import MapTrigger from '../../../../objects/map-trigger'
import NapGuy from '../../../../objects/npcs/nap-guy'
import BrokenFloor from '../../../../objects/props/broken-floor'
import Photo from '../../../../objects/props/photo'
import Portal from '../../../../objects/props/portal'
import RightDoor from '../../doors/right-door'

export default function TopJailRightRoomsAfter() {
  const isDoor6Open = useDungeonState((s) => s.doors.door6.isOpen)
  const hasSpecialObject = useInventory((i) => !!i.inventory.find((i) => i.id === 'special-object'))
  const hasOpenedCrack = useDungeonState((s) => s.puzzle17 !== 'closed')
  const [isBlocked, setIsBlocked] = useState(false)

  const crackStage = useMemo(() => {
    if (hasOpenedCrack && !hasSpecialObject) {
      return 2
    }

    if (hasOpenedCrack && hasSpecialObject) {
      return 3
    }

    return 1
  }, [hasOpenedCrack, hasSpecialObject])

  const openDoor6 = useCallback(() => {
    if (!isDoor6Open) {
      useDialog.getState().reset(door6Dialog)
    }
  }, [isDoor6Open])

  const crackInteract = useCallback(() => {
    useDialog.getState().reset(crackDialog)
  }, [])

  const onPlayerInTrap = useCallback((dir: string) => {
    if (dir !== 'left') {
      return
    }

    const [napGuy1State, napGuy2State] = useDungeonState.getState().napGuyState
    if (napGuy1State === 'goAway' || napGuy2State === 'goAway') {
      return
    }

    setIsBlocked(true)
  }, [])

  const napGuyInteract = useCallback(() => {
    useDialog
      .getState()
      .reset(napGuysDialog)
      .then(() => setIsBlocked(false))
  }, [])

  const lastPhoto = useCallback(() => {
    useAcademiaRoomState.getState().showFinalPhoto()
  }, [])

  return (
    <>
      {/* main hall > branch top > jail > right > room > branch top > room > branch left room > top */}
      <MapTile wall="both-center" corners={['right-aftertop']} x={64} y={10} />
      <MapTile wall="both-center" x={64} y={9} />
      <MapTile wall="both-center" x={64} y={8} />
      <MapTile wall="both-center" x={64} y={7} />
      <MapTile wall="both-center" x={64} y={6} />
      <MapTile wall="left" corners={['right-top', 'right-bottom']} x={64} y={5} />

      {/* main hall > branch top > jail > right > room > branch top > room > branch left room > top > branch left */}
      <MapTile wall="center-both" x={65} y={5} />
      <MapTile wall="center-both" x={66} y={5} />
      <MapTile wall="center-both" x={67} y={5} />
      <MapTile wall="center-both" x={68} y={5} />
      <MapTile wall="center-both" x={69} y={5} />
      <MapTile wall="center-both" x={70} y={5} />
      <MapTile wall="center-both" x={71} y={5} />
      <MapTile wall="center-both" x={72} y={5} />
      <MapTile wall="center-both" x={73} y={5} />

      {/* main hall > branch top > jail > right > room > branch top > room > branch left room > top > branch top */}
      <MapTile wall="both-center" corners={['right-aftertop']} x={64} y={4} />
      <MapTile wall="both-center" x={64} y={3} />
      <Photo alt={4} photoId="photo-19" x={64} y={3} />
      <MapTile wall="both-center" x={64} y={2} />
      <MapTile wall="left-top" corners={['right-bottom']} x={64} y={1} />
      <MapTile wall={isBlocked ? 'right-both' : 'center-both'} x={65} y={1} />
      <MapTrigger
        boundingBox={useMemo(() => ({ x1: 65.6 * 32, x2: 65.7 * 32, y1: 16, y2: 48 }), [])}
        onPlayerOutside={onPlayerInTrap}
      />
      <MapTile wall={isBlocked ? 'left-both' : 'center-both'} x={66} y={1} />
      <MapTile wall="center-both" x={67} y={1} />
      <MapTile wall="center-both" x={68} y={1} />
      <MapTile wall="center-both" x={69} y={1} />
      <MapTile wall="center-both" x={70} y={1} />
      <MapTile wall="center-both" x={71} y={1} />
      <MapTile wall="center-both" x={72} y={1} />
      {isBlocked && <NapGuy n={1} x={73} y={0.5} onInteraction={napGuyInteract} />}
      {isBlocked && <NapGuy n={2} x={73} y={1} onInteraction={napGuyInteract} />}
      <MapTile wall="center-both" x={73} y={1} />
      <MapTile wall="center-both" x={74} y={1} />

      {/* main hall > branch top > jail > right > room > branch top > room > branch top room */}
      <MapTile wall="both-center" corners={['left-aftertop', 'right-aftertop']} x={73} y={10} />
      <MapTile wall="both-center" x={73} y={9} />

      <MapTile wall="left" corners={['right-bottom']} x={73} y={8} />
      <MapTile wall="bottom" x={74} y={8} />
      <MapTile wall="bottom" x={75} y={8} />
      <MapTile wall="right-bottom" x={76} y={8} />

      <BrokenFloor stage={crackStage} x={75} y={7.5} onInteraction={crackInteract} />

      <MapTile wall="left-top" x={73} y={7} />
      <MapTile wall="top" x={74} y={7} />
      <MapTile wall="top" x={75} y={7} />
      <MapTile wall="right" corners={['left-top']} x={76} y={7} />

      {/* main hall > branch top > jail > right > room > branch top > room > branch top room > branch top */}
      <MapTile wall="both-center" corners={['left-aftertop']} x={76} y={6} />
      <MapTile wall="right-top" corners={['left-bottom']} x={76} y={5} />
      <MapTile wall="center-both" x={75} y={5} />
      <MapTile wall="bottom" corners={['left-top', 'right-top']} x={74} y={5} />

      <MapTile wall="both-center" corners={['left-aftertop', 'right-aftertop']} x={74} y={4} />
      <MapTile wall="left-top" corners={['right-bottom']} x={74} y={3} />
      <MapTile wall="right-bottom" corners={['left-top']} x={75} y={3} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={75} y={2} />
      <MapTile wall="top" corners={['left-bottom', 'right-bottom']} x={75} y={1} />

      <MapTile wall="center-both" x={76} y={1} />
      <MapTile wall="center-both" x={77} y={1} />
      <MapTile wall="center-both" x={78} y={1} />
      <RightDoor x={79} y={0} isOpen={isDoor6Open} toggle={openDoor6} />
      <MapTile wall="center-both" x={79} y={1} />
      <MapTile wall="center-both" x={80} y={1} />
      <MapTile wall="center-both" x={81} y={1} />
      <MapTile wall="center-both" x={82} y={1} />
      <MapTile wall="center-both" x={83} y={1} />

      {/* main hall > branch top > jail > right > room > branch top > room > branch top room > branch top > THE ROOM */}
      <MapTile wall="left-bottom" x={84} y={2} />
      <MapTile wall="bottom" x={85} y={2} />
      <MapTile wall="right-bottom" x={86} y={2} />

      <MapTile wall="center" corners={['left-top', 'left-bottom']} x={84} y={1} />
      <MapTile wall="center" x={85} y={1} />
      <Photo alt={5} photoId="photo-20" x={85} y={0.75} />
      <MapTile wall="center" corners={['right-top', 'right-bottom']} x={86} y={1} />

      <MapTile wall="left-top" corners={['left-aftertop']} x={84} y={0} />
      <MapTile wall="top" x={85} y={0} />
      <MapTile wall="right-top" corners={['right-aftertop']} x={86} y={0} />

      <MapTile wall="center-both" x={87} y={1} />
      <Portal dir="right" x={87} y={1} toX={47.5} toY={61.5} onTeleport={lastPhoto} />
    </>
  )
}
