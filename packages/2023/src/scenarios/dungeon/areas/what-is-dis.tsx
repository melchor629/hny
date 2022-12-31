import { useCallback } from 'react'
import usePlayerRef from '../../../hooks/use-player-ref'
import MapTile from '../../../objects/map-tile'
import MapTrigger from '../../../objects/map-trigger'
import Altar from '../../../objects/props/altar'
import BloodyFootprint from '../../../objects/props/bloody-footprint'

export default function WhatIsDis() {
  const playerRef = usePlayerRef()

  return (
    <>
      {/* ??? */}
      <MapTile wall="empty" collisionWall="center-both" x={67} y={53} />
      <MapTile wall="empty" collisionWall="center-both" x={68} y={53} />
      <MapTile wall="empty" collisionWall="center-both" x={69} y={53} />
      <MapTile wall="empty" collisionWall="center-both" x={70} y={53} />
      <MapTile wall="empty" collisionWall="center-both" x={71} y={53} />
      <MapTile wall="empty" collisionWall="center-both" x={72} y={53} />
      <MapTile wall="empty" collisionWall="center-both" x={73} y={53} />

      <MapTile wall="empty" collisionWall="left-top" x={74} y={43} />
      <MapTile wall="empty" collisionWall="left" x={74} y={44} />
      <MapTile wall="empty" collisionWall="left" x={74} y={45} />
      <MapTile wall="empty" collisionWall="left" x={74} y={46} />
      <MapTile wall="empty" collisionWall="left" x={74} y={47} />
      <MapTile wall="empty" collisionWall="left" x={74} y={48} />
      <MapTile wall="empty" collisionWall="left" x={74} y={49} />
      <MapTile wall="empty" collisionWall="left" x={74} y={50} />
      <MapTile wall="empty" collisionWall="left" x={74} y={51} />
      <MapTile wall="empty" collisionWall="left" x={74} y={52} />
      <MapTile wall="empty" x={74} y={53} />
      <MapTile wall="empty" collisionWall="left" x={74} y={54} />
      <MapTile wall="empty" collisionWall="left" x={74} y={55} />
      <MapTile wall="empty" collisionWall="left" x={74} y={56} />
      <MapTile wall="empty" collisionWall="left" x={74} y={57} />
      <MapTile wall="empty" collisionWall="left" x={74} y={58} />
      <MapTile wall="empty" collisionWall="left" x={74} y={59} />
      <MapTile wall="empty" collisionWall="left" x={74} y={60} />
      <MapTile wall="empty" collisionWall="left" x={74} y={61} />
      <MapTile wall="empty" collisionWall="left" x={74} y={62} />
      <MapTile wall="empty" collisionWall="left-bottom" x={74} y={63} />

      <MapTile wall="empty" collisionWall="top" x={75} y={43} />
      <MapTile wall="empty" collisionWall="bottom" x={75} y={63} />

      <MapTile wall="empty" collisionWall="top" x={76} y={43} />
      <MapTile wall="empty" collisionWall="bottom" x={76} y={63} />

      <MapTile wall="empty" collisionWall="top" x={77} y={43} />
      <MapTile wall="empty" collisionWall="bottom" x={77} y={63} />

      <MapTile wall="empty" collisionWall="top" x={78} y={43} />
      <MapTile wall="empty" collisionWall="bottom" x={78} y={63} />

      <MapTile wall="empty" collisionWall="top" x={79} y={43} />
      <MapTile wall="empty" collisionWall="bottom" x={79} y={63} />

      <MapTile wall="empty" collisionWall="top" x={80} y={43} />
      <MapTile wall="empty" collisionWall="bottom" x={80} y={63} />

      <MapTile wall="empty" collisionWall="top" x={81} y={43} />
      <MapTile wall="empty" collisionWall="bottom" x={81} y={63} />

      <MapTile wall="empty" collisionWall="top" x={82} y={43} />
      <MapTile wall="empty" collisionWall="bottom" x={82} y={63} />

      <MapTile wall="empty" collisionWall="top" x={83} y={43} />
      <MapTile wall="empty" collisionWall="bottom" x={83} y={63} />

      <MapTile wall="empty" collisionWall="top" x={84} y={43} />
      <MapTile wall="empty" collisionWall="bottom" x={84} y={63} />

      <MapTile wall="empty" collisionWall="top" x={85} y={43} />
      <MapTile wall="empty" collisionWall="bottom" x={85} y={63} />

      <MapTile wall="empty" collisionWall="top" x={86} y={43} />
      <MapTile wall="empty" collisionWall="bottom" x={86} y={63} />

      <MapTile wall="empty" collisionWall="right-top" x={87} y={43} />
      <MapTile wall="empty" collisionWall="right" x={87} y={44} />
      <MapTile wall="empty" collisionWall="right" x={87} y={45} />
      <MapTile wall="empty" collisionWall="right" x={87} y={46} />
      <MapTile wall="empty" collisionWall="right" x={87} y={47} />
      <MapTile wall="empty" collisionWall="right" x={87} y={48} />
      <MapTile wall="empty" collisionWall="right" x={87} y={49} />
      <MapTile wall="empty" collisionWall="right" x={87} y={50} />
      <MapTile wall="empty" collisionWall="right" x={87} y={51} />
      <MapTile wall="empty" collisionWall="right" x={87} y={52} />
      <MapTile wall="empty" collisionWall="right" x={87} y={53} />
      <MapTile wall="empty" collisionWall="right" x={87} y={54} />
      <MapTile wall="empty" collisionWall="right" x={87} y={55} />
      <MapTile wall="empty" collisionWall="right" x={87} y={56} />
      <MapTile wall="empty" collisionWall="right" x={87} y={57} />
      <MapTile wall="empty" collisionWall="right" x={87} y={58} />
      <MapTile wall="empty" collisionWall="right" x={87} y={59} />
      <MapTile wall="empty" collisionWall="right" x={87} y={60} />
      <MapTile wall="empty" collisionWall="right" x={87} y={61} />
      <MapTile wall="empty" collisionWall="right" x={87} y={62} />
      <MapTile wall="empty" collisionWall="right-bottom" x={87} y={63} />

      <MapTrigger
        boundingBox={{ x1: 87 * 32, x2: 87 * 32 + 2, y1: 42 * 32, y2: 64 * 32 }}
        onPlayerInside={useCallback(() => {
          if (!playerRef.current) {
            return
          }

          playerRef.current.move(-85 * 32, -26 * 32)
        }, [playerRef])}
      />

      <Altar x={80} y={56} />

      <BloodyFootprint x={71.5} y={53} />
      <BloodyFootprint x={76} y={52} r={10} />

      <BloodyFootprint x={81} y={54} r={90} />
      <BloodyFootprint x={78} y={57} r={-15} />

      <BloodyFootprint x={87} y={61} />

      <BloodyFootprint x={4 + 85} y={25 + 26} r={-15} />

      <BloodyFootprint x={83} y={49} r={270} />
    </>
  )
}
