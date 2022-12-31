import { useCallback, useEffect, useRef, useState } from 'react'
import type { InputAbstractionFunctions, InputKey } from './types'

export default function GamepadInputHandler({ fns }: { fns: InputAbstractionFunctions }) {
  const [gamepads, setGamepads] = useState<Gamepad[]>([])
  const [isPointerLocked, setIsPointerLocked] = useState(
    // allow gamepad in smartphones or tablets
    () => navigator.maxTouchPoints !== 0 || document.pointerLockElement != null,
  )
  const gamepadStateRef = useRef<{
    x: -1 | 0 | 1
    y: -1 | 0 | 1
    cUp: boolean
    cDown: boolean
    cLeft: boolean
    cRight: boolean
    b1: boolean
    b2: boolean
    b3: boolean
    b4: boolean
  }>({
    x: 0,
    y: 0,
    cUp: false,
    cDown: false,
    cLeft: false,
    cRight: false,
    b1: false,
    b2: false,
    b3: false,
    b4: false,
  })

  const applyButtonState = useCallback(
    (
      { pressed }: GamepadButton,
      key: Exclude<keyof typeof gamepadStateRef.current, 'x' | 'y'>,
      inputKey: InputKey,
    ) => {
      if (pressed !== gamepadStateRef.current[key]) {
        gamepadStateRef.current[key] = pressed
        if (pressed) {
          fns.press[inputKey]('gamepad')
        } else {
          fns.release[inputKey]('gamepad')
        }
      }
    },
    [fns],
  )

  useEffect(() => {
    const gamepadConnected = (ev: GamepadEvent) => {
      setGamepads((g) => [...g, ev.gamepad])
    }
    const gamepadDisconnected = (ev: GamepadEvent) => {
      setGamepads((g) => {
        const idx = g.findIndex((gp) => gp.id === ev.gamepad.id)
        if (idx !== -1) {
          return [...g.slice(0, idx), ...g.slice(idx + 1)]
        }

        return g
      })
    }
    window.addEventListener('gamepadconnected', gamepadConnected)
    window.addEventListener('gamepaddisconnected', gamepadDisconnected)

    return () => {
      window.removeEventListener('gamepadconnected', gamepadConnected)
      window.removeEventListener('gamepaddisconnected', gamepadDisconnected)
    }
  })

  useEffect(() => {
    gamepadStateRef.current = {
      x: 0,
      y: 0,
      cUp: false,
      cDown: false,
      cLeft: false,
      cRight: false,
      b1: false,
      b2: false,
      b3: false,
      b4: false,
    }
    if (gamepads.length === 0 || !isPointerLocked) {
      return () => {}
    }

    let id = -1
    const handler = () => {
      // use only the first gamepad
      // chrome requires to poll for updated information using this API
      const [gamepad] = navigator
        .getGamepads()
        .filter((g) => gamepads.some((gg) => gg.id === g?.id))
        .filter((g) => g!.mapping === 'standard' && g!.connected)
        .map((g) => g!) // thanks TS

      // check if movement applies per axis
      const [x, y] = gamepad.axes
      const nextGamepadState: { x: -1 | 0 | 1; y: -1 | 0 | 1 } = { x: 0, y: 0 }
      if (Math.abs(x) > 0.5) {
        if (x > 0) {
          nextGamepadState.x = 1
        } else {
          nextGamepadState.x = -1
        }
      } else {
        nextGamepadState.x = 0
      }
      if (Math.abs(y) > 0.5) {
        if (y < 0) {
          nextGamepadState.y = 1
        } else {
          nextGamepadState.y = -1
        }
      } else {
        nextGamepadState.y = 0
      }

      // check differences
      if (nextGamepadState.x !== gamepadStateRef.current.x) {
        if (gamepadStateRef.current.x === 1) {
          fns.release.right('gamepad')
        } else if (gamepadStateRef.current.x === -1) {
          fns.release.left('gamepad')
        }

        if (nextGamepadState.x === 1) {
          fns.press.right('gamepad')
        } else if (nextGamepadState.x === -1) {
          fns.press.left('gamepad')
        }

        gamepadStateRef.current.x = nextGamepadState.x
      }
      if (nextGamepadState.y !== gamepadStateRef.current.y) {
        if (gamepadStateRef.current.y === 1) {
          fns.release.up('gamepad')
        } else if (gamepadStateRef.current.y === -1) {
          fns.release.down('gamepad')
        }

        if (nextGamepadState.y === 1) {
          fns.press.up('gamepad')
        } else if (nextGamepadState.y === -1) {
          fns.press.down('gamepad')
        }

        gamepadStateRef.current.y = nextGamepadState.y
      }

      // check buttons
      const [cUp, cDown, cLeft, cRight] = gamepad.buttons.slice(12)
      applyButtonState(cUp, 'cUp', 'up')
      applyButtonState(cDown, 'cDown', 'down')
      applyButtonState(cLeft, 'cLeft', 'left')
      applyButtonState(cRight, 'cRight', 'right')
      const [b1, b2, b3, b4] = gamepad.buttons
      applyButtonState(b1, 'b1', 'interact')
      applyButtonState(b2, 'b2', 'interact')
      applyButtonState(b3, 'b3', 'cancel-interact')
      applyButtonState(b4, 'b4', 'cancel-interact')

      id = requestAnimationFrame(handler)
    }

    id = requestAnimationFrame(handler)
    return () => cancelAnimationFrame(id)
  }, [gamepads, fns, isPointerLocked])

  useEffect(() => {
    const fn = () => setIsPointerLocked(document.pointerLockElement != null)

    document.addEventListener('pointerlockchange', fn, false)
    return () => document.removeEventListener('pointerlockchange', fn, false)
  }, [])

  return null
}
