import { animated, useSpringValue } from '@react-spring/web'
import { useCallback } from 'react'

export default function TheButton({
  style,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  ...props
}: React.ComponentPropsWithoutRef<'button'>) {
  const buttonSpringValue = useSpringValue('scale(1)')

  const buttonPointerEnter = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      buttonSpringValue.start(`scale(${e.buttons ? 0.9 : 1.25})`)
      onPointerEnter?.(e)
    },
    [buttonSpringValue, onPointerEnter],
  )

  const buttonPointerLeave = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      buttonSpringValue.start('scale(1)')
      onPointerLeave?.(e)
    },
    [buttonSpringValue, onPointerLeave],
  )

  const buttonPointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      buttonSpringValue.start('scale(0.9)')
      onPointerDown?.(e)
    },
    [buttonSpringValue, onPointerDown],
  )

  const buttonPointerUp = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      buttonSpringValue.start('scale(1.25)')
      onPointerUp?.(e)
    },
    [buttonSpringValue, onPointerUp],
  )

  return (
    <animated.button
      {...props}
      onPointerEnter={buttonPointerEnter}
      onPointerLeave={buttonPointerLeave}
      onPointerDown={buttonPointerDown}
      onPointerUp={buttonPointerUp}
      style={{ ...style, transform: buttonSpringValue }}
    />
  )
}
