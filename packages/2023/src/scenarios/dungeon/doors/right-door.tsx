import {
  doorClosedRightDownProp,
  doorClosedRightUpProp,
  doorOpenedRightDownProp,
  doorOpenedRightUpProp,
} from '../../../data/props'
import MapProp from '../../../objects/map-prop'

export default function RightDoor({
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
        <MapProp x={x * 32} y={y * 32 - 10} prop={doorOpenedRightUpProp} onInteraction={toggle} />
        <MapProp x={x * 32} y={y * 32 + 10} prop={doorOpenedRightDownProp} onInteraction={toggle} />
      </>
    )
  }

  return (
    <>
      <MapProp x={x * 32} y={y * 32 - 1} prop={doorClosedRightUpProp} onInteraction={toggle} />
      <MapProp x={x * 32} y={y * 32 + 11} prop={doorClosedRightDownProp} onInteraction={toggle} />
    </>
  )
}
