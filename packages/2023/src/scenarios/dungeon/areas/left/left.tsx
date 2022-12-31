import MapTile from '../../../../objects/map-tile'
import LeftBottom from './left-bottom'
import LeftLeft from './left-left'
import LeftTop from './left-top'

export default function Left() {
  return (
    <>
      {/* main hall > branch left */}
      <MapTile wall="center-both" x={40} y={44} />
      <MapTile wall="center-both" x={39} y={44} />
      <MapTile wall="center-both" x={38} y={44} />
      <MapTile wall="center-both" x={37} y={44} />
      <MapTile wall="center-both" x={36} y={44} />
      <MapTile wall="center-both" x={35} y={44} />
      <MapTile wall="center-both" x={34} y={44} />
      <MapTile wall="center-both" x={33} y={44} />
      <MapTile wall="center-both" x={32} y={44} />
      <MapTile
        wall="center"
        corners={['left-top', 'right-top', 'left-bottom', 'right-bottom']}
        x={31}
        y={44}
      />

      <LeftLeft />
      <LeftBottom />
      <LeftTop />
    </>
  )
}
