import { useThree } from '@react-three/fiber'
import { useCallback, useMemo } from 'react'
import notGandalfDialog from '../../../data/dialogs/not-gandalf'
import useDialog from '../../../hooks/use-dialog'
import useDungeonState from '../../../hooks/use-dungeon-state'
import useInput from '../../../hooks/use-input'
import usePlayerRef from '../../../hooks/use-player-ref'
import MapTile from '../../../objects/map-tile'
import MapTrigger from '../../../objects/map-trigger'
import TomeuQuely from '../../../objects/npcs/tomeu-quely'
import Photo from '../../../objects/props/photo'
import WritenPaper from '../../../objects/props/writen-paper'
import CameraAnimationController from '../../../utils/camera-animation-controller'
import BottomDoor from '../doors/bottom-door'

export default function BottomRight() {
  const fakeInput = useInput('nothing')
  const camera = useThree(({ camera }) => camera)
  const isDoorNpc1Open = useDungeonState((s) => s.doors.doorNpc1.isOpen)
  const playerRef = usePlayerRef()

  const onPlayerNearTomeu = useCallback(
    (dir: string) => {
      if (isDoorNpc1Open || dir !== 'top') {
        return
      }

      ;(async () => {
        fakeInput.focus()
        const animController = new CameraAnimationController(camera as any)

        playerRef.current!.dir = 'down'
        animController.to({ duration: 5000, x: 62 * 32, y: 50 * 32 })
        await useDialog.getState().reset(notGandalfDialog)

        fakeInput.focus()
        await animController.reset(1000)
        fakeInput.blur()
      })()
    },
    [isDoorNpc1Open, camera, fakeInput],
  )

  const adeuTomeu = useCallback(() => {
    useDungeonState.getState().changeTomeuState('gone')
  }, [])

  return (
    <>
      {/* main hall > branch bottom right */}
      <MapTile wall="center-both" x={55} y={46} />
      <MapTile wall="center-both" x={56} y={46} />
      <MapTile wall="center-both" x={57} y={46} />
      <MapTile wall="center-both" x={58} y={46} />
      <MapTile wall="center-both" x={59} y={46} />
      <MapTile wall="center-both" x={60} y={46} />

      {/* main hall > branch bottom right > room */}
      <MapTile wall="top" corners={['left-bottom']} x={61} y={46} />
      <MapTile wall="top" x={62} y={46} />
      <MapTile wall="right-top" x={63} y={46} />
      <MapTile wall="left" x={61} y={47} />
      <MapTile wall="center" x={62} y={47} />
      <MapTile wall="right" x={63} y={47} />
      <MapTile wall="left" x={61} y={48} />
      <MapTile wall="center" x={62} y={48} />
      <MapTile wall="right" x={63} y={48} />
      <MapTile wall="left" x={61} y={49} />
      <MapTile wall="center" x={62} y={49} />
      <TomeuQuely x={62} y={49} />
      <MapTile wall="right" x={63} y={49} />
      <MapTile wall="left-bottom" x={61} y={50} />
      <MapTile wall="center" corners={['left-bottom', 'right-bottom']} x={62} y={50} />
      <MapTile wall="right-bottom" x={63} y={50} />

      {/* main hall > branch bottom right > room > branch bottom */}
      <BottomDoor x={62} y={49.45} isOpen={isDoorNpc1Open} />
      <MapTile wall="both-center" x={62} y={51} />
      <MapTile wall="both-center" x={62} y={52} />
      <MapTile wall="both-center" x={62} y={53} />
      <MapTile wall="both-center" corners={['right-aftertop']} x={62} y={54} />
      <MapTile wall="left" corners={['right-top', 'right-bottom']} x={62} y={55} />
      <MapTile wall="both-center" x={62} y={56} />
      <MapTile wall="both-center" x={62} y={57} />
      <MapTile wall="both-bottom" x={62} y={58} />
      <WritenPaper paperId="magic-wizard-license" x={62} y={58} />

      {/* main hall > branch bottom right > room > branch bottom > branch right */}
      <MapTile wall="center-both" x={63} y={55} />
      <MapTile wall="center-both" x={64} y={55} />
      <MapTile wall="center-both" x={65} y={55} />
      <MapTile wall="right-bottom" corners={['left-top']} x={66} y={55} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={66} y={54} />
      <MapTile wall="both-center" collisionWall="left" x={66} y={53} />
      <MapTile wall="both-center" x={66} y={52} />
      <MapTile wall="both-center" x={66} y={51} />
      <MapTile wall="both-center" x={66} y={50} />
      <MapTile wall="both-center" x={66} y={49} />
      <MapTile wall="both-center" x={66} y={48} />
      <MapTile wall="right-top" corners={['left-bottom']} x={66} y={47} />
      <MapTile wall="left-both" x={65} y={47} />

      <Photo alt={2} photoId="photo-4" x={65} y={47} />
      <MapTrigger
        boundingBox={useMemo(
          () => ({ x1: 60.5 * 32, x2: 63.5 * 32, y1: 48.5 * 32, y2: 48.55 * 32 }),
          [],
        )}
        onPlayerInside={onPlayerNearTomeu}
      />
      <MapTrigger
        boundingBox={useMemo(
          () => ({ x1: 61.5 * 32, x2: 62.5 * 32, y1: 53 * 32, y2: 53.05 * 32 }),
          [],
        )}
        onPlayerInside={adeuTomeu}
      />
    </>
  )
}
