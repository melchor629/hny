import {
  doorClosedBottomLeftProp,
  doorClosedBottomRightProp,
  doorOpenedBottomLeftProp,
  doorOpenedBottomRightProp,
} from '../../../data/props'
import MapProp from '../../../objects/map-prop'

export default function BottomDoor({
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
        <MapProp
          x={x * 32 - 12}
          y={y * 32 + 11}
          prop={doorOpenedBottomLeftProp}
          onInteraction={toggle}
        />
        <MapProp
          x={x * 32 + 6}
          y={y * 32 + 11}
          prop={doorOpenedBottomRightProp}
          onInteraction={toggle}
        />
      </>
    )
  }

  return (
    <>
      <MapProp x={x * 32 - 12} y={y * 32} prop={doorClosedBottomLeftProp} onInteraction={toggle} />
      <MapProp x={x * 32 - 1} y={y * 32} prop={doorClosedBottomRightProp} onInteraction={toggle} />
    </>
  )
}
