import { useThree } from '@react-three/fiber'
import { useCallback, useMemo } from 'react'
import dogeSamuraiTriggerDialog from '../../../../data/dialogs/doge-samurai-trigger'
import useDialog from '../../../../hooks/use-dialog'
import useDungeonState from '../../../../hooks/use-dungeon-state'
import useInput from '../../../../hooks/use-input'
import useInventory from '../../../../hooks/use-inventory'
import MapTile from '../../../../objects/map-tile'
import MapTrigger from '../../../../objects/map-trigger'
import DogeSamurai from '../../../../objects/npcs/doge-samurai'
import Barrel from '../../../../objects/props/barrel'
import CameraAnimationController from '../../../../utils/camera-animation-controller'

export default function TopJailRightRoom2() {
  const fakeInput = useInput('nothing')
  const camera = useThree(({ camera }) => camera)

  const doTrigger = useCallback(() => {
    const { epicBattleFinished } = useDungeonState.getState()
    if (epicBattleFinished) {
      return
    }

    ;(async () => {
      fakeInput.focus()

      const animController = new CameraAnimationController(camera as any)

      animController.to({ delay: 750, duration: 1000, x: 65.5 * 32, y: 13.5 * 32 })
      await useDialog.getState().reset(dogeSamuraiTriggerDialog)
      useInventory.getState().discoverPhoto('photo-18')

      fakeInput.focus()
      await animController.reset(1000)
      fakeInput.blur()
    })()
  }, [])

  const giveShovel = useCallback(() => {
    const inventory = useInventory.getState()
    if (!inventory.inventory.find((i) => i.id === 'shovel')?.count) {
      inventory.addToInventory('shovel')
    }
  }, [])

  return (
    <>
      {/* main hall > branch top > jail > right > room > branch top > room > branch left room */}
      <MapTile wall="center-both" x={68} y={12} />

      <MapTile wall="left-bottom" x={64} y={14} />
      <MapTile wall="bottom" x={65} y={14} />
      <MapTile wall="bottom" x={66} y={14} />
      <MapTile wall="right-bottom" x={67} y={14} />

      <MapTile wall="left" x={64} y={13} />
      <MapTile wall="center" x={65} y={13} />
      <MapTile wall="center" x={66} y={13} />
      <MapTile wall="right" x={67} y={13} />

      <MapTile wall="left" x={64} y={12} />
      <MapTile wall="center" x={65} y={12} />
      <MapTile wall="center" x={66} y={12} />
      <MapTile wall="center" corners={['right-top', 'right-bottom']} x={67} y={12} />

      <MapTile wall="left" corners={['right-top']} x={64} y={11} />
      <MapTile wall="top" x={65} y={11} />
      <MapTile wall="top" x={66} y={11} />
      <MapTile wall="right-top" corners={['right-aftertop']} x={67} y={11} />

      <Barrel dir="up" x={67} y={10.55} />
      <Barrel dir="up" x={66.5} y={10.55} />
      <Barrel dir="left" x={66.9} y={14} onInteraction={giveShovel} />
      <DogeSamurai f={useDungeonState((s) => s.epicBattleFinished)} x={64.25} y={13.25} />
      <MapTrigger
        boundingBox={useMemo(
          () => ({ x1: 67.3 * 32, x2: 67.35 * 32, y1: 11.5 * 32, y2: 12.5 * 32 }),
          [],
        )}
        onPlayerOutside={doTrigger}
      />
      <MapTrigger
        boundingBox={useMemo(
          () => ({ x1: 63.5 * 32, x2: 64.5 * 32, y1: 10.7 * 32, y2: 10.75 * 32 }),
          [],
        )}
        onPlayerOutside={doTrigger}
      />
    </>
  )
}
