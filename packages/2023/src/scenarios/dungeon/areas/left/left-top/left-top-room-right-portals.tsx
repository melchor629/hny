import MapTile from '../../../../../objects/map-tile'
import Portal from '../../../../../objects/props/portal'

export default function LeftTopRoomRightPortals() {
  return (
    <>
      {/* main hall > branch left > branch top > room > branch right */}
      <MapTile wall="center-both" x={35} y={29} />
      <MapTile wall="center-both" x={36} y={29} />
      <MapTile wall="center-both" x={37} y={29} />
      <MapTile wall="center-both" x={38} y={29} />
      <MapTile wall="center-both" x={39} y={29} />

      <MapTile wall="left-top" x={40} y={27} />
      <MapTile wall="left" corners={['left-aftertop']} x={40} y={28} />
      <MapTile wall="center" corners={['left-top', 'left-bottom']} x={40} y={29} />
      <MapTile wall="left" x={40} y={30} />
      <MapTile wall="left-bottom" x={40} y={31} />

      {/* TODO make portals or portal frames at least */}
      <MapTile wall="both-top" corners={['left-aftertop', 'right-aftertop']} x={41} y={26} />
      <Portal dir="top" x={41} y={26.43} toX={29} toY={9} />
      <MapTile wall="center" corners={['left-top', 'right-top']} x={41} y={27} />
      <MapTile wall="center" x={41} y={28} />
      <MapTile wall="center" x={41} y={29} />
      <MapTile wall="center" x={41} y={30} />
      <MapTile wall="bottom" x={41} y={31} />

      <MapTile wall="right-top" corners={['right-aftertop']} x={42} y={27} />
      <MapTile wall="center" corners={['right-top', 'right-bottom']} x={42} y={28} />
      <MapTile wall="right" corners={['right-aftertop']} x={42} y={29} />
      <MapTile wall="center" corners={['right-top', 'right-bottom']} x={42} y={30} />
      <MapTile wall="right" corners={['left-bottom']} x={42} y={31} />
      <MapTile wall="both-center" x={42} y={32} />
      <Portal dir="bottom" x={42} y={32} toX={43} toY={28} />

      <MapTile wall="center-both" x={43} y={28} />
      <Portal dir="right" x={43} y={28} toX={52} toY={3} />
      <MapTile wall="center-both" x={43} y={30} />
      <Portal dir="right" x={43} y={30} toX={41} toY={22} />
    </>
  )
}
