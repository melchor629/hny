import {
  doorClosedTopLeftProp,
  doorClosedTopRightProp,
  doorOpenedTopLeftProp,
  doorOpenedTopRightProp,
} from '../../../data/props'
import MapProp from '../../../objects/map-prop'

export default function TopDoor({
  x,
  y,
  isOpen,
  toggle,
}: {
  x: number
  y: number
  isOpen: boolean
  toggle?: () => void
}) {
  if (isOpen) {
    return (
      <>
        <MapProp x={x * 32 - 12} y={y * 32} prop={doorOpenedTopLeftProp} onInteraction={toggle} />
        <MapProp x={x * 32 + 6} y={y * 32} prop={doorOpenedTopRightProp} onInteraction={toggle} />
      </>
    )
  }

  return (
    <>
      <MapProp x={x * 32 - 12} y={y * 32} prop={doorClosedTopLeftProp} onInteraction={toggle} />
      <MapProp x={x * 32 - 1} y={y * 32} prop={doorClosedTopRightProp} onInteraction={toggle} />
    </>
  )
}
