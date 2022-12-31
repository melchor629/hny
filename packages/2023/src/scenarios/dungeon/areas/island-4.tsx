import MapTile from '../../../objects/map-tile'
import Photo from '../../../objects/props/photo'
import Portal from '../../../objects/props/portal'
import WritenPaper from '../../../objects/props/writen-paper'

export default function Island4() {
  return (
    <>
      <MapTile wall="both-bottom" x={53} y={13} />
      <MapTile wall="right-top" corners={['left-bottom']} x={53} y={12} />
      <MapTile wall="center-both" x={52} y={12} />
      <MapTile wall="bottom" corners={['left-top', 'right-top']} x={51} y={12} />

      {/* left */}
      <MapTile wall="center-both" x={50} y={12} />
      <MapTile wall="center-both" x={49} y={12} />
      <MapTile wall="left-both" x={48} y={12} />

      {/* top */}
      <MapTile wall="both-center" corners={['left-aftertop', 'right-aftertop']} x={51} y={11} />
      <MapTile wall="left" corners={['right-top', 'right-bottom']} x={51} y={10} />
      <MapTile wall="both-center" corners={['right-aftertop']} x={51} y={9} />
      <MapTile wall="right-top" corners={['left-bottom']} x={51} y={8} />
      <MapTile wall="center-both" x={50} y={8} />
      <MapTile wall="bottom" corners={['right-top']} x={49} y={8} />
      <MapTile wall="left-bottom" x={48} y={8} />
      <MapTile wall="right-top" corners={['right-aftertop']} x={49} y={7} />
      <MapTile wall="left" corners={['right-top']} x={48} y={7} />
      <MapTile wall="both-center" corners={['right-aftertop']} x={48} y={6} />
      <MapTile wall="right" corners={['left-top', 'left-bottom']} x={48} y={5} />
      <MapTile wall="both-top" corners={['left-aftertop']} x={48} y={4} />
      <MapTile wall="center-both" x={47} y={5} />
      <MapTile wall="center-both" x={46} y={5} />
      <MapTile wall="left-bottom" corners={['right-top']} x={45} y={5} />
      <MapTile wall="both-top" corners={['right-aftertop']} x={45} y={4} />
      <Portal dir="top" x={45} y={4.43} toX={41} toY={27} />

      {/* top > right */}
      <MapTile wall="right-bottom" corners={['left-top']} x={52} y={10} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={52} y={9} />
      <MapTile wall="both-center" x={52} y={8} />
      <MapTile wall="both-center" x={52} y={7} />
      <MapTile wall="left" corners={['right-top', 'right-bottom']} x={52} y={6} />
      <MapTile wall="both-center" corners={['right-aftertop']} x={52} y={5} />
      <MapTile wall="both-center" x={52} y={4} />
      <MapTile wall="both-top" x={52} y={3} />
      <Portal dir="top" x={52} y={3.43} toX={42} toY={31} />

      {/* top > right > right */}
      <MapTile wall="center-both" x={53} y={6} />
      <MapTile wall="center-both" x={54} y={6} />
      <MapTile wall="center-both" x={55} y={6} />
      <MapTile wall="right-both" x={56} y={6} />
      <WritenPaper paperId="paper-code-1" x={56} y={6} />

      <Photo alt={1} photoId="photo-13" x={53} y={13} />
      <Photo alt={2} photoId="photo-12" x={48} y={4} />
    </>
  )
}
