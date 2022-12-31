import { useCallback, useMemo, useState } from 'react'
import puzzle9EndDialog from '../../../../../../data/dialogs/puzzle-9-end'
import puzzle9StartDialog from '../../../../../../data/dialogs/puzzle-9-start'
import puzzle9SurrenderDialog from '../../../../../../data/dialogs/puzzle-9-surrender'
import useDialog from '../../../../../../hooks/use-dialog'
import useDungeonState from '../../../../../../hooks/use-dungeon-state'
import useInventory from '../../../../../../hooks/use-inventory'
import usePlayerRef from '../../../../../../hooks/use-player-ref'
import MapTile from '../../../../../../objects/map-tile'
import MapTrigger from '../../../../../../objects/map-trigger'
import Photo from '../../../../../../objects/props/photo'
import Rubbish from '../../../../../../objects/props/rubbish'
import SmallWeirdChest from '../../../../../../objects/props/small-weird-chest'
import BottomDoor from '../../../../doors/bottom-door'

export default function LeftBottomLeftTop() {
  const isOpen = useDungeonState((s) => s.doors.door4.isOpen)
  const isSmallWeirdChestOpen = useDungeonState((s) => s.puzzle9)
  const playerRef = usePlayerRef()
  const [rubbishPosition1, setRubbishPosition1] = useState(0)
  const [rubbishPosition2, setRubbishPosition2] = useState(0)
  const [rubbishPosition3, setRubbishPosition3] = useState([0, 0] as [number, number])
  const [rubbishPosition4, setRubbishPosition4] = useState(0)
  const [rubbishPosition5, setRubbishPosition5] = useState(0)

  const openSmallChest = useCallback(() => {
    if (!isSmallWeirdChestOpen) {
      useDialog.getState().reset(puzzle9EndDialog)
    }
  }, [isSmallWeirdChestOpen])

  const startPuzzleTrigger = useCallback(
    (dir: string) => {
      const hasItem = useInventory.getState().inventory.some((i) => i.id === 'pow-gun')
      if (!hasItem && dir === 'right') {
        useDialog.getState().reset(puzzle9StartDialog)
      } else if (!isSmallWeirdChestOpen && dir === 'left') {
        useDialog.getState().reset(puzzle9SurrenderDialog, (cont) => {
          if (cont) {
            playerRef.current?.move(-2, 0)
          }
        })
      }
    },
    [isSmallWeirdChestOpen],
  )

  const pushRubbish1 = useCallback(
    (dir: string) => {
      const couldCollision = rubbishPosition3[0] === 1
      const pos3 = couldCollision ? -rubbishPosition3[1] + 2 : -123

      if (dir === 'bottom') {
        setRubbishPosition1((v) => {
          const newV = v + 1
          return Math.min(newV === pos3 ? v : newV, 3)
        })
      } else if (dir === 'top') {
        setRubbishPosition1((v) => {
          const newV = v - 1
          return Math.max(newV === pos3 ? v : newV, 0)
        })
      }
    },
    [rubbishPosition3],
  )

  const pushRubbish2 = useCallback((dir: string) => {
    if (dir === 'right') {
      setRubbishPosition2((v) => Math.max(v - 1, -2))
    } else if (dir === 'left') {
      setRubbishPosition2((v) => Math.min(v + 1, 1))
    }
  }, [])

  const pushRubbish3 = useCallback(
    (dir: string) => {
      const pos1 = 59.4 - rubbishPosition1 * 0.4 // y
      const pos2 = 3.2 + rubbishPosition2 * 0.7 // x

      if (dir === 'right') {
        setRubbishPosition3(([x, y]) => {
          const newX = Math.max(x - 1, -1)
          const newPosX = 3.2 + newX * 0.7
          return [newPosX === pos2 ? x : newX, y]
        })
      } else if (dir === 'left') {
        setRubbishPosition3(([x, y]) => {
          const newX = Math.min(x + 1, 1)
          const newPosX = 3.2 + newX * 0.7
          const posY = 58.6 + y * 0.4
          return [newPosX === pos2 || pos1 === posY ? x : newX, y]
        })
      } else if (dir === 'bottom') {
        setRubbishPosition3(([x, y]) => {
          const newY = Math.max(y - 1, -1)
          const newPosY = 58.6 + newY * 0.4
          return [x, newPosY === pos1 ? y : newY]
        })
      } else if (dir === 'top') {
        setRubbishPosition3(([x, y]) => {
          const newY = Math.min(y + 1, 1)
          const newPosY = 58.6 + newY * 0.4
          return [x, newPosY === pos1 ? y : newY]
        })
      }
    },
    [rubbishPosition1, rubbishPosition2],
  )

  const pushRubbish4 = useCallback((dir: string) => {
    if (dir === 'right') {
      setRubbishPosition4((v) => Math.max(v - 1, -1))
    } else if (dir === 'left') {
      setRubbishPosition4((v) => Math.min(v + 1, 2))
    }
  }, [])

  const pushRubbish5 = useCallback((dir: string) => {
    if (dir === 'bottom') {
      setRubbishPosition5((v) => Math.max(v - 1, -3.5))
    }
  }, [])

  return (
    <>
      {/* main hall > branch left > branch bottom > branch left > branch top */}
      <MapTile wall="both-center" corners={['right-aftertop']} x={14} y={56} />
      <MapTile wall="both-center" x={14} y={55} />
      <MapTile wall="both-center" x={14} y={54} />
      <MapTile wall="both-center" x={14} y={53} />
      <MapTile wall="right-top" corners={['left-bottom']} x={14} y={52} />
      <MapTile wall="center-both" x={13} y={52} />
      <MapTile wall="center-both" x={12} y={52} />
      <MapTile wall="left-top" corners={['right-bottom']} x={11} y={52} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={11} y={53} />
      <MapTile wall="right-bottom" corners={['left-top']} x={11} y={54} />
      <MapTile wall="center-both" x={10} y={54} />
      <MapTile wall="center-both" x={9} y={54} />
      <MapTile
        wall="center"
        corners={['left-top', 'right-top', 'left-bottom', 'right-bottom']}
        x={8}
        y={54}
      />
      <MapTile wall="left-both" x={7} y={54} />

      {/* main hall > branch left > branch bottom > branch left > branch top > branch top */}
      <MapTile wall="both-center" corners={['left-aftertop', 'right-aftertop']} x={8} y={53} />
      <MapTile wall="both-center" x={8} y={52} />
      <MapTile wall="left-top" corners={['right-bottom']} x={8} y={51} />
      <MapTile wall="center-both" x={9} y={51} />
      <MapTile wall="right-bottom" corners={['left-top']} x={10} y={51} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={10} y={50} />
      <MapTile wall="both-center" x={10} y={49} />
      <MapTile wall="both-center" x={10} y={48} />
      <MapTile wall="both-top" x={10} y={47} />
      <Photo alt={4} photoId="photo-8" x={10} y={47} />

      {/* main hall > branch left > branch bottom > branch left > branch top > branch bottom */}
      <BottomDoor x={8} y={53.45} isOpen={isOpen} />
      <MapTile wall="both-center" corners={['right-aftertop']} x={8} y={55} />
      <MapTile wall="left-bottom" corners={['right-top']} x={8} y={56} />
      <MapTile wall="center-both" x={9} y={56} />
      <MapTile wall="center-both" x={10} y={56} />
      <MapTile wall="right-top" corners={['left-bottom']} x={11} y={56} />
      <MapTile wall="both-center" x={11} y={57} />
      <MapTile wall="both-center" x={11} y={58} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={11} y={59} />
      <MapTile wall="right-bottom" corners={['left-top']} x={11} y={60} />
      <MapTile wall="center-both" x={10} y={60} />
      <MapTile wall="center-both" x={9} y={60} />
      <MapTile wall="center-both" x={8} y={60} />
      <MapTile wall="center-both" x={7} y={60} />
      <MapTile wall="center-both" x={6} y={60} />
      <MapTile wall="center-both" x={5} y={60} />

      <MapTile wall="left-bottom" x={0} y={60} />
      <MapTile wall="bottom" x={1} y={60} />
      <MapTile wall="bottom" x={2} y={60} />
      <MapTile wall="bottom" x={3} y={60} />
      <MapTile wall="bottom" corners={['right-top']} x={4} y={60} />

      <MapTile wall="left" x={0} y={59} />
      <MapTile wall="center" x={1} y={59} />
      <MapTile wall="center" x={2} y={59} />
      <MapTile wall="center" x={3} y={59} />
      <MapTile wall="right" corners={['right-aftertop']} x={4} y={59} />

      <MapTile wall="left" x={0} y={58} />
      <MapTile wall="center" x={1} y={58} />
      <MapTile wall="center" x={2} y={58} />
      <MapTile wall="center" corners={['right-top']} x={3} y={58} />
      <MapTile wall="right-top" x={4} y={58} />

      <MapTile wall="left-top" x={0} y={57} />
      <MapTile wall="top" x={1} y={57} />
      <MapTile wall="top" x={2} y={57} />
      <MapTile wall="right-top" corners={['right-aftertop']} x={3} y={57} />

      <MapTrigger
        boundingBox={useMemo(
          () => ({ x1: 4.5 * 32, y1: 59.5 * 32, x2: 4.5 * 32 + 2, y2: 60.5 * 32 }),
          [],
        )}
        onPlayerInside={startPuzzleTrigger}
      />

      <Rubbish x={0.0} y={60.1} />
      <Rubbish x={1.8 + rubbishPosition4 * 0.7} y={60.1} onInteraction={pushRubbish4} />

      <Rubbish x={3.2} y={59.8} />
      <Rubbish x={2.5} y={59.8} />

      <Rubbish x={3.9} y={59.4 - rubbishPosition1 * 0.4} onInteraction={pushRubbish1} />
      <Rubbish x={3.2} y={59.4} />
      <Rubbish x={2.5} y={59.4} />
      <Rubbish x={1.8} y={59.4} />
      <Rubbish x={0.7} y={59.4} />
      <Rubbish x={0} y={59.4} />

      <Rubbish x={3.2 + rubbishPosition2 * 0.7} y={59} onInteraction={pushRubbish2} />
      <Rubbish x={0.7} y={59} />

      <Rubbish
        x={3.2 + rubbishPosition3[0] * 0.7}
        y={58.6 + rubbishPosition3[1] * 0.4}
        onInteraction={pushRubbish3}
      />
      <Rubbish x={1.8} y={58.6} />
      <Rubbish x={1.1} y={58.6} />

      <Rubbish x={0} y={58.2 + rubbishPosition5 * 0.4} onInteraction={pushRubbish5} />

      <Rubbish x={3.9} y={57.8} />
      <Rubbish x={3.2} y={57.8} />
      <Rubbish x={2.5} y={57.8} />
      <Rubbish x={1.8} y={57.8} />
      <Rubbish x={1.1} y={57.8} />
      <Rubbish x={0.5} y={57.8} />

      <Rubbish x={2.5} y={57.4} />
      <Rubbish x={1.1} y={57.4} />

      <Rubbish x={1.8} y={56.8} />
      <SmallWeirdChest
        open={isSmallWeirdChestOpen}
        onInteraction={openSmallChest}
        x={3.2}
        y={56.8}
      />
    </>
  )
}
