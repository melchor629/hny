import { useFrame } from '@react-three/fiber'
import { memo } from 'react'
import usePlayerRef from '../../hooks/use-player-ref'
import useScenario from '../../hooks/use-scenario'
import Map from '../../objects/map'
import type { ScenarioProps } from '../../types/scenario'
import {
  BottomLeft,
  BottomRight,
  Entrance,
  Island1,
  Island2,
  Island3,
  Island4,
  Left,
  MainHall,
  Top,
  TopRight,
  WhatIsDis,
  WhatIsThis,
} from './areas'

function DungeonScenario({ onMapUpdate }: ScenarioProps) {
  const playerRef = usePlayerRef()

  useFrame(() => {
    if (!useScenario.getState().isLoading('dungeon')) {
      return
    }

    document.querySelector<HTMLDivElement>('#app')!.style.backgroundColor = 'rebeccapurple'
    useScenario.getState().loaded()
    playerRef.current?.moveTo(47.5 * 32, 61.5 * 32)
    playerRef.current!.dir = 'up'
  })

  return (
    <Map onMapUpdate={onMapUpdate}>
      <Entrance />
      <MainHall />
      <TopRight />
      <BottomRight />
      <BottomLeft />
      <Left />
      <Top />

      <Island1 />
      <Island2 />
      <Island3 />
      <Island4 />

      <WhatIsDis />
      <WhatIsThis />
    </Map>
  )
}

export default memo(DungeonScenario)
