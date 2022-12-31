import { useCallback } from 'react'
import usePlayerRef from '../../../hooks/use-player-ref'
import MapTile from '../../../objects/map-tile'
import MapTrigger from '../../../objects/map-trigger'
import Altar from '../../../objects/props/altar'
import BloodyFootprint from '../../../objects/props/bloody-footprint'

export default function WhatIsThis() {
  const playerRef = usePlayerRef()

  return (
    <>
      {/* ¿¿¿ */}
      <MapTile wall="empty" collisionWall="center-both" x={16} y={28} />
      <MapTile wall="empty" collisionWall="center-both" x={15} y={28} />
      <MapTile wall="empty" collisionWall="center-both" x={14} y={28} />
      <MapTile wall="empty" collisionWall="center-both" x={13} y={28} />
      <MapTile wall="empty" collisionWall="center-both" x={12} y={28} />
      <MapTile wall="empty" collisionWall="center-both" x={11} y={28} />
      <MapTile wall="empty" collisionWall="center-both" x={10} y={28} />
      <MapTile wall="empty" collisionWall="center-both" x={9} y={28} />
      <MapTile wall="empty" collisionWall="right-top" x={8} y={17} />
      <MapTile wall="empty" collisionWall="right" x={8} y={18} />
      <MapTile wall="empty" collisionWall="right" x={8} y={19} />
      <MapTile wall="empty" collisionWall="right" x={8} y={20} />
      <MapTile wall="empty" collisionWall="right" x={8} y={21} />
      <MapTile wall="empty" collisionWall="right" x={8} y={22} />
      <MapTile wall="empty" collisionWall="right" x={8} y={23} />
      <MapTile wall="empty" collisionWall="right" x={8} y={24} />
      <MapTile wall="empty" collisionWall="right" x={8} y={25} />
      <MapTile wall="empty" collisionWall="right" x={8} y={26} />
      <MapTile wall="empty" collisionWall="right" x={8} y={27} />
      <MapTile wall="empty" x={8} y={28} />
      <MapTile wall="empty" collisionWall="right" x={8} y={29} />
      <MapTile wall="empty" collisionWall="right" x={8} y={30} />
      <MapTile wall="empty" collisionWall="right" x={8} y={31} />
      <MapTile wall="empty" collisionWall="right" x={8} y={32} />
      <MapTile wall="empty" collisionWall="right" x={8} y={33} />
      <MapTile wall="empty" collisionWall="right" x={8} y={34} />
      <MapTile wall="empty" collisionWall="right" x={8} y={35} />
      <MapTile wall="empty" collisionWall="right" x={8} y={36} />
      <MapTile wall="empty" collisionWall="right-bottom" x={8} y={37} />
      <MapTile wall="empty" collisionWall="top" x={7} y={17} />
      <MapTile wall="empty" collisionWall="bottom" x={7} y={37} />
      <MapTile wall="empty" collisionWall="top" x={6} y={17} />
      <MapTile wall="empty" collisionWall="bottom" x={6} y={37} />
      <MapTile wall="empty" collisionWall="top" x={5} y={17} />
      <MapTile wall="empty" collisionWall="bottom" x={5} y={37} />
      <MapTile wall="empty" collisionWall="top" x={4} y={17} />
      <MapTile wall="empty" collisionWall="bottom" x={4} y={37} />
      <MapTile wall="empty" collisionWall="top" x={3} y={17} />
      <MapTile wall="empty" collisionWall="bottom" x={3} y={37} />
      <MapTile wall="empty" collisionWall="top" x={2} y={17} />
      <MapTile wall="empty" collisionWall="bottom" x={2} y={37} />
      <MapTile wall="empty" collisionWall="top" x={1} y={17} />
      <MapTile wall="empty" collisionWall="bottom" x={1} y={37} />
      <MapTile wall="empty" collisionWall="left-top" x={0} y={17} />
      <MapTile wall="empty" collisionWall="left" x={0} y={18} />
      <MapTile wall="empty" collisionWall="left" x={0} y={19} />
      <MapTile wall="empty" collisionWall="left" x={0} y={20} />
      <MapTile wall="empty" collisionWall="left" x={0} y={21} />
      <MapTile wall="empty" collisionWall="left" x={0} y={22} />
      <MapTile wall="empty" collisionWall="left" x={0} y={23} />
      <MapTile wall="empty" collisionWall="left" x={0} y={24} />
      <MapTile wall="empty" collisionWall="left" x={0} y={25} />
      <MapTile wall="empty" collisionWall="left" x={0} y={26} />
      <MapTile wall="empty" collisionWall="left" x={0} y={27} />
      <MapTile wall="empty" collisionWall="left" x={0} y={28} />
      <MapTile wall="empty" collisionWall="left" x={0} y={29} />
      <MapTile wall="empty" collisionWall="left" x={0} y={30} />
      <MapTile wall="empty" collisionWall="left" x={0} y={31} />
      <MapTile wall="empty" collisionWall="left" x={0} y={32} />
      <MapTile wall="empty" collisionWall="left" x={0} y={33} />
      <MapTile wall="empty" collisionWall="left" x={0} y={34} />
      <MapTile wall="empty" collisionWall="left" x={0} y={35} />
      <MapTile wall="empty" collisionWall="left" x={0} y={36} />
      <MapTile wall="empty" collisionWall="left-bottom" x={0} y={37} />

      <MapTrigger
        boundingBox={{ x1: 32, x2: 34, y1: 16 * 32, y2: 38 * 32 }}
        onPlayerInside={useCallback(() => {
          if (!playerRef.current) {
            return
          }

          playerRef.current.move(85 * 32, 26 * 32)
        }, [playerRef])}
      />

      <Altar x={80 - 85} y={56 - 26} />

      <BloodyFootprint x={87 - 85} y={61 - 26} />

      <BloodyFootprint x={5} y={30} r={270} />

      <BloodyFootprint x={8} y={28} />
      <BloodyFootprint x={11.55} y={28} />

      <BloodyFootprint x={4} y={25} r={-15} />
    </>
  )
}
