import {
  doorClosedLeftDownProp,
  doorClosedLeftUpProp,
  doorOpenedLeftDownProp,
  doorOpenedLeftUpProp,
} from '../../../data/props'
import MapProp from '../../../objects/map-prop'

export default function LeftDoor({
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
        <MapProp x={x * 32} y={y * 32 - 10} prop={doorOpenedLeftUpProp} onInteraction={toggle} />
        <MapProp x={x * 32} y={y * 32 + 10} prop={doorOpenedLeftDownProp} onInteraction={toggle} />
      </>
    )
  }

  return (
    <>
      <MapProp x={x * 32} y={y * 32 - 1} prop={doorClosedLeftUpProp} onInteraction={toggle} />
      <MapProp x={x * 32} y={y * 32 + 11} prop={doorClosedLeftDownProp} onInteraction={toggle} />
    </>
  )
}
