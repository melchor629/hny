import { memo, useContext, useEffect } from 'react'
import type { Trigger } from '../types/map'
import Map from './map'

interface MapTriggerProps extends Trigger {}

function MapTrigger({ boundingBox, onPlayerInside, onPlayerOutside }: MapTriggerProps) {
  const mapUpdater = useContext(Map.Context)

  useEffect(
    () =>
      mapUpdater({
        boundingBox,
        onPlayerInside,
        onPlayerOutside,
      }),
    [boundingBox, onPlayerInside, onPlayerOutside],
  )

  return null
}

export default memo(MapTrigger)
