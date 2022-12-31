import MapTile from '../../../objects/map-tile'
import Photo from '../../../objects/props/photo'
import Portal from '../../../objects/props/portal'

const a = [...Array(17)]
  .fill('')
  .map((_, i) => <MapTile key={i} wall="center-both" x={12 + i} y={9} />)

const b = [...Array(4)]
  .fill('')
  .map((_, i) => <MapTile key={i} wall="both-center" x={11} y={4 + i} />)

export default function Island3() {
  return (
    <>
      <MapTile wall="right-both" x={29} y={9} />
      {a}
      <MapTile wall="left-bottom" corners={['right-top']} collisionWall="bottom" x={11} y={9} />
      <MapTile wall="both-center" corners={['right-aftertop']} x={11} y={8} />
      {b}
      <MapTile wall="both-top" x={11} y={3} />
      <Portal dir="top" x={11} y={3.43} toX={41} toY={22} />

      <MapTile wall="empty" collisionWall="center-both" x={10} y={9} />
      <MapTile wall="empty" collisionWall="center-both" x={9} y={9} />
      <MapTile wall="empty" collisionWall="center-both" x={8} y={9} />
      <MapTile wall="empty" collisionWall="center-both" x={7} y={9} />
      <MapTile wall="empty" collisionWall="left-bottom" x={6} y={9} />
      <MapTile wall="empty" collisionWall="both-center" x={6} y={8} />
      <MapTile wall="empty" collisionWall="both-center" x={6} y={7} />
      <MapTile wall="empty" collisionWall="both-center" x={6} y={6} />
      <MapTile wall="empty" collisionWall="both-center" x={6} y={5} />
      <MapTile wall="empty" collisionWall="both-center" x={6} y={4} />
      <MapTile wall="empty" collisionWall="both-center" x={6} y={3} />
      <MapTile wall="empty" collisionWall="both-center" x={6} y={2} />
      <MapTile wall="empty" collisionWall="both-center" x={6} y={1} />
      <MapTile wall="empty" collisionWall="both-top" x={6} y={0} />
      <Photo alt={2} photoId="special-3" x={6} y={0.5} />
    </>
  )
}
