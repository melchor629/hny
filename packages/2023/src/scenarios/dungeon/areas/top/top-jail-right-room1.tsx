import MapTile from '../../../../objects/map-tile'

export default function TopJailRightRoom1() {
  return (
    <>
      {/* main hall > branch top > jail > right > room > branch top > room */}
      <MapTile wall="both-center" corners={['left-aftertop', 'right-aftertop']} x={72} y={14} />

      <MapTile wall="left-bottom" x={69} y={13} />
      <MapTile wall="bottom" x={70} y={13} />
      <MapTile wall="bottom" x={71} y={13} />
      <MapTile wall="center" corners={['left-bottom', 'right-bottom']} x={72} y={13} />
      <MapTile wall="bottom" x={73} y={13} />
      <MapTile wall="right-bottom" x={74} y={13} />

      <MapTile wall="center" corners={['left-top', 'left-bottom']} x={69} y={12} />
      <MapTile wall="center" x={70} y={12} />
      <MapTile wall="center" x={71} y={12} />
      <MapTile wall="center" x={72} y={12} />
      <MapTile wall="center" x={73} y={12} />
      <MapTile wall="right" x={74} y={12} />

      <MapTile wall="left-top" corners={['left-aftertop']} x={69} y={11} />
      <MapTile wall="top" x={70} y={11} />
      <MapTile wall="top" x={71} y={11} />
      <MapTile wall="top" x={72} y={11} />
      <MapTile wall="center" corners={['left-top', 'right-top']} x={73} y={11} />
      <MapTile wall="right-top" x={74} y={11} />
    </>
  )
}
