import { useFrame } from '@react-three/fiber'
import { memo, useCallback, useState } from 'react'
import testDialog from '../data/dialogs/test'
import useDialog from '../hooks/use-dialog'
import usePlayerRef from '../hooks/use-player-ref'
import useScenario from '../hooks/use-scenario'
import Map, { OnMapUpdateCallback } from '../objects/map'
import MapProp from '../objects/map-prop'
import MapTile from '../objects/map-tile'
import MapTrigger from '../objects/map-trigger'

const prop = {
  type: 'table',
  size: { w: 32, h: 32 },
  boundingBox: { x1: 4, y1: 3, x2: 28, y2: 17 },
}

function TestScenario({ onMapUpdate }: { onMapUpdate: OnMapUpdateCallback }) {
  // NOTE: this is not the way to handle scenario state, zustand is the way (but this is a test component, so...)
  const [inside, setInside] = useState(false)
  const playerRef = usePlayerRef()

  useFrame(() => {
    if (!useScenario.getState().isLoading('test')) {
      return
    }

    document.querySelector<HTMLDivElement>('#app')!.style.backgroundColor = 'white'
    useScenario.getState().loaded()
    playerRef.current?.moveTo(32, 0)
  })

  return (
    <Map onMapUpdate={onMapUpdate}>
      <MapTile wall="left-aftertop" x={0} y={-1} />
      <MapTile wall="left-top" x={0} y={0} />
      <MapTile wall="left" x={0} y={1} />
      <MapTile wall="left" corners={['right-bottom']} x={0} y={2} />
      <MapTile wall="both-center" x={0} y={3} />
      <MapTile wall="both-bottom" x={0} y={4} />
      <MapTile wall="both-top" x={0} y={5} />
      <MapTile wall="both-bottom" x={0} y={6} />

      <MapTile wall="right-aftertop" x={1} y={-1} />
      <MapTile wall="right-top" corners={['right-aftertop']} x={1} y={0} />
      <MapTile wall="center" corners={['right-top']} x={1} y={1} />
      <MapTile wall="bottom" x={1} y={2} />

      <MapTile wall="right-aftertop" x={2} y={0} />
      <MapTile wall="right-top" corners={['right-aftertop']} x={2} y={1} />
      <MapTile wall="bottom" corners={['right-top']} x={2} y={2} />

      <MapTile wall="right-aftertop" x={3} y={1} />
      <MapTile wall="right-both" x={3} y={2} />

      <MapProp
        x={32}
        y={32}
        prop={prop}
        onInteraction={() => useDialog.getState().reset(testDialog)}
      />
      {inside && <MapProp x={0} y={64} prop={prop} />}

      <MapTrigger
        boundingBox={{ x1: -16, y1: 4 * 32 + 16, x2: 16, y2: 4 * 32 + 17 }}
        onPlayerInside={useCallback(() => {
          setInside(true)
        }, [])}
        onPlayerOutside={useCallback(() => {
          setInside(false)
        }, [])}
      />
    </Map>
  )
}

export default memo(TestScenario)

if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  window.changeScenario = (scenario: string) => useScenario.getState().change(scenario)
}
