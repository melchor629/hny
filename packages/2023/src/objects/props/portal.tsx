import { useCallback, useMemo } from 'react'
import portalFront from '../../data/props/stuff/portal-front'
import portalSide from '../../data/props/stuff/portal-side'
import usePlayerRef from '../../hooks/use-player-ref'
import MapProp from '../map-prop'
import MapTrigger from '../map-trigger'

interface PortalProps {
  dir: 'left' | 'right' | 'top' | 'bottom'
  x: number
  y: number
  toX: number
  toY: number
  onTeleport?: () => void
}

export default function Portal({ dir, x, y, toX, toY, onTeleport }: PortalProps) {
  const playerRef = usePlayerRef()

  const boundingBox = useMemo(() => {
    if (dir === 'left') {
      return { x1: (x - 0.5) * 32, y1: (y - 0.5) * 32, x2: (x - 0.5) * 32 + 2, y2: (y + 0.5) * 32 }
    }

    if (dir === 'right') {
      return { x1: (x + 0.5) * 32, y1: (y - 0.5) * 32, x2: (x + 0.5) * 32 + 2, y2: (y + 0.5) * 32 }
    }

    if (dir === 'top') {
      return { x1: (x - 0.5) * 32, y1: (y - 0.5) * 32 - 2, x2: (x + 0.5) * 32, y2: (y - 0.5) * 32 }
    }

    return { x1: (x - 0.5) * 32, y1: (y + 0.5) * 32 - 4, x2: (x + 0.5) * 32, y2: (y + 0.5) * 32 }
  }, [dir, x, y])

  const playerOnPortal = useCallback(() => {
    const { current: player } = playerRef
    if (!player) {
      return
    }

    player.moveTo(toX * 32, toY * 32)
    onTeleport?.()
  }, [playerRef, toX, toY, onTeleport])

  const portal = useMemo(() => {
    if (dir === 'top') {
      return <MapProp prop={portalFront} x={x * 32 - 16} y={(y - 1.36) * 32} />
    }

    if (dir === 'bottom') {
      return <MapProp prop={portalFront} x={x * 32 - 16} y={(y - 0.5) * 32} flipVertical />
    }

    if (dir === 'right') {
      return <MapProp prop={portalSide} x={x * 32 - 2} y={y * 32 - 30} />
    }

    return <MapProp prop={portalSide} x={x * 32 - 30} y={y * 32 - 30} flipHorizontal />
  }, [dir, x, y])

  return (
    <>
      {portal}
      <MapTrigger boundingBox={boundingBox} onPlayerInside={playerOnPortal} />
    </>
  )
}
