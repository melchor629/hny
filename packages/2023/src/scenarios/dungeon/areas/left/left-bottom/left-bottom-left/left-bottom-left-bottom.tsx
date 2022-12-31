import MapTile from '../../../../../../objects/map-tile'
import Photo from '../../../../../../objects/props/photo'

export default function LeftBottomLeftBottom() {
  return (
    <>
      {/* main hall > branch left > branch bottom > branch left > branch bottom */}
      <MapTile wall="both-center" x={14} y={58} />
      <MapTile wall="both-center" x={14} y={59} />
      <MapTile wall="both-center" corners={['right-aftertop']} x={14} y={60} />
      <MapTile wall="left-bottom" corners={['right-top']} x={14} y={61} />
      <MapTile wall="center-both" x={15} y={61} />
      <MapTile wall="right-both" x={16} y={61} />
      <Photo alt={6} photoId="photo-7" x={16} y={61} />
    </>
  )
}
