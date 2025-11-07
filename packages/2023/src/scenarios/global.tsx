import { useCallback, useMemo, useRef, useState } from 'react'
import { context as PlayerRefContext } from '../hooks/use-player-ref'
import useScenario from '../hooks/use-scenario'
import CollisionsDebugger from '../objects/collisions-debugger'
import LeFundido from '../objects/le-fundido'
import Player from '../objects/player'
import generateCollisionBoxes from '../utils/generate-collision-boxes'
import AcademiaRoomScenario from './academia-room'
import DungeonScenario from './dungeon'
import TestScenario from './test'

const [initialCollisions] = generateCollisionBoxes({
  npcs: [],
  props: [],
  tiles: [],
  triggers: [{ boundingBox: { x1: 1000, x2: 1001, y1: 1000, y2: 10001 } }],
})

function GlobalScenario() {
  const playerRef = useRef(null)
  const [bvh, setBvh] = useState(initialCollisions)
  const [collisions, setCollisions] = useState<ReturnType<typeof generateCollisionBoxes>[1]>()
  const scenario = useScenario((state) => state.scenario)
  const Scenario = useMemo(() => {
    if (scenario === 'academia-room') {
      return AcademiaRoomScenario
    }

    if (scenario === 'dungeon') {
      return DungeonScenario
    }

    if (scenario === 'test') {
      return TestScenario
    }
  }, [scenario])

  const onMapUpdate = useCallback((_: any, bvh: any, collisions: any) => {
    setBvh(bvh)
    setCollisions(collisions)
  }, [])

  return (
    <PlayerRefContext.Provider value={playerRef}>
      {Scenario && <Scenario onMapUpdate={onMapUpdate} />}

      {bvh && <Player ref={playerRef} collisions={bvh} />}

      {collisions && <CollisionsDebugger collisions={collisions} />}
      <LeFundido />
    </PlayerRefContext.Provider>
  )
}

export default GlobalScenario
