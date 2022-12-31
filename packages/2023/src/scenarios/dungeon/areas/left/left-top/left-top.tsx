import MapTile from '../../../../../objects/map-tile'
import LeftTopRoom from './left-top-room'
import LeftTopRoomLeft from './left-top-room-left'
import LeftTopRoomRightPortals from './left-top-room-right-portals'

export default function LeftTop() {
  return (
    <>
      {/* main hall > branch left > branch top */}
      <MapTile wall="both-center" corners={['left-aftertop', 'right-aftertop']} x={31} y={43} />
      <MapTile wall="both-center" x={31} y={42} />
      <MapTile wall="both-center" x={31} y={41} />
      <MapTile wall="both-center" x={31} y={40} />
      <MapTile wall="left-top" corners={['right-bottom']} x={31} y={39} />
      <MapTile wall="center-both" x={32} y={39} />
      <MapTile wall="center-both" x={33} y={39} />
      <MapTile wall="right-bottom" corners={['left-top']} x={34} y={39} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={34} y={38} />
      <MapTile wall="both-center" x={34} y={37} />

      <LeftTopRoom />
      <LeftTopRoomRightPortals />
      <LeftTopRoomLeft />
    </>
  )
}
