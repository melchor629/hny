import MapTile from '../../../../../objects/map-tile'
import LeftBottomLeft from './left-bottom-left'
import LeftBottomTop from './left-bottom-top'

export default function LeftBottom() {
  return (
    <>
      {/* main hall > branch left > branch bottom */}
      <MapTile wall="both-center" x={31} y={45} />
      <MapTile wall="both-center" x={31} y={46} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={31} y={47} />
      <MapTile wall="right-bottom" corners={['left-top']} x={31} y={48} />
      <MapTile wall="center-both" x={30} y={48} />
      <MapTile wall="center-both" x={29} y={48} />
      <MapTile wall="center-both" x={28} y={48} />
      <MapTile wall="left-top" corners={['right-bottom']} x={27} y={48} />
      <MapTile wall="both-center" x={27} y={49} />
      <MapTile wall="both-center" corners={['right-aftertop']} x={27} y={50} />
      <MapTile wall="left-bottom" corners={['right-top']} x={27} y={51} />
      <MapTile wall="center-both" x={28} y={51} />
      <MapTile wall="center-both" x={29} y={51} />
      <MapTile wall="center-both" x={30} y={51} />
      <MapTile wall="center-both" x={31} y={51} />
      <MapTile wall="right-bottom" corners={['left-top']} x={32} y={51} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={32} y={50} />
      <MapTile wall="both-center" x={32} y={49} />
      <MapTile wall="left-top" corners={['right-bottom']} x={32} y={48} />
      <MapTile wall="right-top" corners={['left-bottom']} x={33} y={48} />
      <MapTile wall="both-center" x={33} y={49} />
      <MapTile wall="both-center" x={33} y={50} />
      <MapTile wall="both-center" x={33} y={51} />
      <MapTile wall="both-center" x={33} y={52} />
      <MapTile wall="both-center" x={33} y={53} />
      <MapTile wall="both-center" x={33} y={54} />
      <MapTile wall="both-center" x={33} y={55} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={33} y={56} />
      <MapTile wall="right-bottom" corners={['left-top']} x={33} y={57} />
      <MapTile wall="center-both" x={32} y={57} />
      <MapTile wall="center-both" x={31} y={57} />
      <MapTile wall="center-both" x={30} y={57} />
      <MapTile wall="bottom" corners={['left-top', 'right-top']} x={29} y={57} />

      <LeftBottomTop />
      <LeftBottomLeft />
    </>
  )
}
