import MapTile from '../../../objects/map-tile'
import Portal from '../../../objects/props/portal'

export default function Island1() {
  return (
    <>
      <MapTile wall="right-both" x={41} y={22} />
      <MapTile wall="left-bottom" corners={['right-top']} x={40} y={22} />
      <MapTile wall="both-center" corners={['right-aftertop']} x={40} y={21} />
      <MapTile wall="both-center" x={40} y={20} />
      <MapTile wall="both-center" x={40} y={19} />
      <MapTile wall="left-top" corners={['right-bottom']} x={40} y={18} />
      <MapTile wall="center-both" x={41} y={18} />
      <MapTile wall="top" corners={['left-bottom', 'right-bottom']} x={42} y={18} />

      {/* bottom */}
      <MapTile wall="both-center" corners={['right-aftertop', 'left-aftertop']} x={42} y={19} />
      <MapTile wall="bottom" corners={['left-top', 'right-top']} x={42} y={20} />
      <MapTile wall="left-both" x={41} y={20} />
      <MapTile wall="center-both" x={43} y={20} />
      <MapTile wall="right-top" corners={['left-bottom']} x={44} y={20} />
      <MapTile wall="both-center" x={44} y={21} />
      <MapTile wall="both-center" x={44} y={22} />
      <Portal dir="bottom" x={44} y={22} toX={42} toY={12} />

      {/* right */}
      <MapTile wall="center-both" x={43} y={18} />
      <MapTile wall="center-both" x={44} y={18} />
      <Portal dir="right" x={44} y={18} toX={42} toY={31} />
    </>
  )
}
