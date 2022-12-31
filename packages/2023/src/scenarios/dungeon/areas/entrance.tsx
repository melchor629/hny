import { useCallback, useMemo } from 'react'
import firstPhotoDialog from '../../../data/dialogs/first-photo-found'
import useDialog from '../../../hooks/use-dialog'
import useInventory from '../../../hooks/use-inventory'
import useScenario from '../../../hooks/use-scenario'
import MapTile from '../../../objects/map-tile'
import MapTrigger from '../../../objects/map-trigger'
import Barrel from '../../../objects/props/barrel'
import DungeonStairs from '../../../objects/props/dungeon-stairs'

export default function Entrance() {
  const { book, discover } = useInventory((s) => ({ book: s.book, discover: s.discoverPhoto }))
  const showDialog = useDialog((s) => s.reset)

  const toAcademiaRoom = useCallback(() => {
    useScenario.getState().change('academia-room')
  }, [])

  const grabPhoto = useCallback(() => {
    if (!book.find(({ id }) => id === 'photo-1')!.discovered) {
      discover('photo-1')
      showDialog(firstPhotoDialog)
    }
  }, [book, discover, showDialog])

  return (
    <>
      <DungeonStairs x={47} y={66} />
      <DungeonStairs x={47} y={65} />
      <DungeonStairs x={47} y={64} />
      <DungeonStairs x={47} y={63} />
      <DungeonStairs x={47} y={62} />
      <MapTile wall="left" x={47} y={61} />
      <MapTile wall="right" x={48} y={61} />
      <MapTile wall="left" x={47} y={60} />
      <MapTile wall="right" x={48} y={60} />
      <MapTile wall="left" x={47} y={59} />
      <MapTile wall="right" x={48} y={59} />
      <MapTile wall="left" x={47} y={58} />
      <MapTile wall="right" x={48} y={58} />
      <MapTile wall="left" x={47} y={57} />
      <MapTile wall="right" x={48} y={57} />
      <MapTile wall="left" x={47} y={56} />
      <MapTile wall="right" x={48} y={56} />
      <MapTile wall="left" x={47} y={55} />
      <MapTile wall="right" x={48} y={55} />
      <MapTile wall="left" x={47} y={54} />
      <MapTile wall="right" x={48} y={54} />
      <MapTile wall="left" x={47} y={53} />
      <MapTile wall="right" x={48} y={53} />
      <MapTile wall="left" x={47} y={52} />
      <MapTile wall="right" x={48} y={52} />
      <MapTile wall="left" x={47} y={51} />
      <MapTile wall="right" x={48} y={51} />
      <MapTile wall="left" x={47} y={50} />
      <MapTile wall="right" x={48} y={50} />
      <MapTile wall="left" x={47} y={49} />
      <MapTile wall="right" x={48} y={49} />
      <MapTile wall="left" x={47} y={48} />
      <MapTile wall="right" x={48} y={48} />

      <Barrel dir="right" x={47.1} y={58} />
      <Barrel dir="left" x={48} y={57.2} />
      <Barrel dir="left" x={48} y={57} />

      <Barrel dir="up" x={47.1} y={51.4} />
      <Barrel dir="right" x={47.15} y={51.2} />
      <Barrel dir="right" x={47.1} y={51} />
      <Barrel dir="right" x={47.15} y={50.8} />
      <Barrel dir="right" x={47.175} y={50.6} />
      <Barrel dir="right" x={47.15} y={50.4} />
      <Barrel dir="up" x={47.2} y={50.2} onInteraction={grabPhoto} />

      <MapTrigger
        boundingBox={useMemo(
          () => ({ x1: 46.5 * 32, x2: 48.5 * 32, y1: 63 * 32, y2: 63.1 * 32 }),
          [],
        )}
        onPlayerInside={toAcademiaRoom}
      />
    </>
  )
}
