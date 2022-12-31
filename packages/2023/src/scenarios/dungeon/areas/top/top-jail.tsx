import { useThree } from '@react-three/fiber'
import { useCallback, useEffect, useMemo } from 'react'
import {
  chrisAskingFavourDialog,
  chrisGoingToReceiveItemDialog,
  chrisWaitingForItemDialog,
  firstContactWithChrisDialog,
  moreLoreChrisDialog,
  passChrisFirstDialog,
} from '../../../../data/dialogs/chris-dialog'
import useDialog from '../../../../hooks/use-dialog'
import useDungeonState from '../../../../hooks/use-dungeon-state'
import useInput from '../../../../hooks/use-input'
import usePlayerRef from '../../../../hooks/use-player-ref'
import MapTile from '../../../../objects/map-tile'
import MapTrigger from '../../../../objects/map-trigger'
import Chris from '../../../../objects/npcs/chris'
import JailBars from '../../../../objects/props/jail-bars'
import CameraAnimationController from '../../../../utils/camera-animation-controller'
import wait from '../../../../utils/wait'

export function TopJail() {
  const playerRef = usePlayerRef()
  const camera = useThree(({ camera }) => camera)
  const fakeInput = useInput('nothing')
  const playerInput = useInput('player')

  const commonIntro = useCallback(
    async (animController: CameraAnimationController) => {
      fakeInput.focus()
      await animController.to({
        delay: 500,
        duration: 1000,
        x: 62.4 * 32,
        y: 23.5 * 32,
        zoom: 1.5,
      })
      await useDialog.getState().reset(firstContactWithChrisDialog)
      fakeInput.focus()

      const p = animController.to({
        delay: 500,
        duration: 1000,
        x: 62.4 * 32,
        y: 24.5 * 32,
        zoom: 1.6,
      })
      await wait(1000)
      useDungeonState.getState().changeChrisState('rest')
      await p

      await wait(500)
      await useDialog.getState().reset(chrisAskingFavourDialog)

      fakeInput.focus()
    },
    [camera, fakeInput],
  )

  const passingChris = useCallback(
    async (dir: string) => {
      if (dir !== 'left') {
        return
      }

      const isAwake = useDungeonState.getState().chrisState === 'rest'
      if (!isAwake) {
        const animController = new CameraAnimationController(camera as any)

        animController
          .to({ delay: 1500, duration: 10, x: 62.4 * 32, y: 22.6 * 32, zoom: 2 })
          .then(() => {
            playerRef.current!.position.set(62.4 * 32 - 9, -(25 * 32 - 9), 0)
            playerRef.current!.dir = 'up'
            playerRef.current!.updateMatrixWorld()
          })
        await useDialog.getState().reset(passChrisFirstDialog)

        await commonIntro(animController)

        await animController.to({
          duration: 1000,
          delay: 500,
          x: 62.4 * 32 - 9,
          y: 25 * 32 - 9,
          zoom: 1,
        })
        playerRef.current!.moveTo(62.4 * 32 - 9, 25 * 32 - 9)
        fakeInput.blur()
      }
    },
    [camera, commonIntro],
  )

  const talkToChris = useCallback(async () => {
    const { chrisState, puzzle17 } = useDungeonState.getState()
    const isAwake = chrisState === 'rest'
    playerRef.current!.dir = 'up'
    if (isAwake) {
      if (puzzle17 === 'closed') {
        useDialog.getState().reset(chrisWaitingForItemDialog)
      } else if (puzzle17 === 'opened') {
        const animController = new CameraAnimationController(camera as any)

        await useDialog.getState().reset(chrisWaitingForItemDialog)
        animController.to({
          delay: 500,
          duration: 1500,
          x: 62.4 * 32,
          y: 24.5 * 32,
          zoom: 1.6,
        })
        await useDialog.getState().reset(chrisGoingToReceiveItemDialog)

        fakeInput.focus()
        await animController.reset(1000, 500)
        fakeInput.blur()
      } else {
        useDialog.getState().reset(moreLoreChrisDialog)
      }
    } else {
      const animController = new CameraAnimationController(camera as any)
      await commonIntro(animController)

      await animController.reset(1000, 500)
      fakeInput.blur()
    }
  }, [camera, fakeInput, commonIntro])

  useEffect(() => {
    return playerInput.forKey('interact').subscribe({
      release() {
        if (playerRef.current) {
          const { dir, position } = playerRef.current
          const { x, y } = position
          if (dir === 'up' && x >= 62 * 32 && x <= 63 * 32 && -y >= 24.5 * 32 && -y <= 25 * 32) {
            talkToChris()
          }
        }
      },
    })
  }, [playerInput, talkToChris])

  return (
    <>
      {/* main hall > branch top > jail */}
      <MapTile wall="left" corners={['right-bottom']} x={49} y={26} />
      <MapTile wall="bottom" x={50} y={26} />
      <MapTile wall="bottom" x={51} y={26} />
      <MapTile wall="bottom" x={52} y={26} />
      <MapTile wall="bottom" x={53} y={26} />
      <MapTile wall="bottom" x={54} y={26} />
      <MapTile wall="bottom" x={55} y={26} />
      <MapTile wall="bottom" x={56} y={26} />
      <MapTile wall="bottom" x={57} y={26} />
      <MapTile wall="bottom" x={58} y={26} />
      <MapTile wall="bottom" x={59} y={26} />
      <MapTile wall="bottom" x={60} y={26} />
      <MapTile wall="bottom" x={61} y={26} />
      <MapTile wall="bottom" x={62} y={26} />
      <MapTile wall="bottom" x={63} y={26} />
      <MapTile wall="bottom" x={64} y={26} />
      <MapTile wall="bottom" x={65} y={26} />
      <MapTile wall="bottom" x={66} y={26} />
      <MapTile wall="bottom" corners={['right-top']} x={67} y={26} />

      <MapTile wall="left-top" x={49} y={25} />
      <MapTile wall="center" corners={['left-top']} x={50} y={25} />
      <MapTile wall="center" corners={['right-top']} x={51} y={25} />
      <MapTile wall="top" x={52} y={25} />
      <MapTile wall="center" corners={['left-top']} x={53} y={25} />
      <MapTile wall="center" corners={['right-top']} x={54} y={25} />
      <MapTile wall="top" x={55} y={25} />
      <MapTile wall="center" corners={['left-top']} x={56} y={25} />
      <MapTile wall="center" corners={['right-top']} x={57} y={25} />
      <MapTile wall="top" x={58} y={25} />
      <MapTile wall="center" corners={['left-top']} x={59} y={25} />
      <MapTile wall="center" corners={['right-top']} x={60} y={25} />
      <MapTile wall="top" x={61} y={25} />
      <MapTile wall="center" corners={['left-top']} x={62} y={25} />
      <MapTile wall="center" corners={['right-top']} x={63} y={25} />
      <MapTile wall="top" x={64} y={25} />
      <MapTile wall="center" corners={['left-top']} x={65} y={25} />
      <MapTile wall="center" corners={['right-top']} x={66} y={25} />
      <MapTile wall="right-top" corners={['right-aftertop']} x={67} y={25} />

      <MapTile wall="left" corners={['left-aftertop']} x={50} y={24} />
      <JailBars x={50} y={24} />
      <MapTile wall="right" corners={['right-aftertop']} x={51} y={24} />
      <MapTile wall="left" corners={['left-aftertop']} x={53} y={24} />
      <JailBars x={53} y={24} />
      <MapTile wall="right" corners={['right-aftertop']} x={54} y={24} />
      <MapTile wall="left" corners={['left-aftertop']} x={56} y={24} />
      <JailBars x={56} y={24} />
      <MapTile wall="right" corners={['right-aftertop']} x={57} y={24} />
      <MapTile wall="left" corners={['left-aftertop']} x={59} y={24} />
      <JailBars x={59} y={24} />
      <MapTile wall="right" corners={['right-aftertop']} x={60} y={24} />
      <MapTile wall="left" corners={['left-aftertop']} x={62} y={24} />
      <JailBars x={62} y={24} />
      <MapTile wall="right" corners={['right-aftertop']} x={63} y={24} />
      <MapTile wall="left" corners={['left-aftertop']} x={65} y={24} />
      <JailBars x={65} y={24} />
      <MapTile wall="right" corners={['right-aftertop']} x={66} y={24} />

      <MapTile wall="left-top" x={50} y={23} />
      <MapTile wall="right-top" x={51} y={23} />
      <MapTile wall="left-top" x={53} y={23} />
      <MapTile wall="right-top" x={54} y={23} />
      <MapTile wall="left-top" x={56} y={23} />
      <MapTile wall="right-top" x={57} y={23} />
      <MapTile wall="left-top" x={59} y={23} />
      <MapTile wall="right-top" x={60} y={23} />
      <MapTile wall="left-top" x={62} y={23} />
      <MapTile wall="right-top" x={63} y={23} />
      <MapTile wall="left-top" x={65} y={23} />
      <MapTile wall="right-top" x={66} y={23} />

      <Chris />
      <MapTrigger
        boundingBox={useMemo(
          () => ({ x1: 66 * 32, x2: 66.2 * 32, y1: 24.6 * 32, y2: 26.4 * 32 }),
          [],
        )}
        onPlayerInside={passingChris}
      />
    </>
  )
}
