import MapTile from '../../../objects/map-tile'
import Photo from '../../../objects/props/photo'
import Portal from '../../../objects/props/portal'

export default function Island2() {
  return (
    <>
      <MapTile wall="both-bottom" x={42} y={12} />
      <MapTile wall="both-center" x={42} y={11} />
      <MapTile wall="both-center" x={42} y={10} />
      <MapTile
        wall="center"
        corners={['left-top', 'right-top', 'left-bottom', 'right-bottom']}
        x={42}
        y={9}
      />
      <MapTile wall="center-both" x={41} y={9} />
      <MapTile wall="both-top" corners={['left-aftertop', 'right-aftertop']} x={42} y={8} />
      <MapTile wall="center-both" x={43} y={9} />

      <Photo alt={6} photoId="photo-14" x={42} y={9} />
      <Portal dir="left" x={41} y={9} toX={44} toY={22} />
      <Portal dir="top" x={42} y={8.43} toX={48} toY={12} />
      <Portal dir="right" x={43} y={9} toX={44} toY={22} />
    </>
  )
}
