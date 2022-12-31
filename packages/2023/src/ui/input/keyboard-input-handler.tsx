import { useEffect, useRef, useState } from 'react'
import handleFullscreen from '../../utils/handle-fullscreen'
import type { InputAbstractionFunctions, InputKey } from './types'

const keyMaps = Object.freeze<Record<string, InputKey>>({
  ArrowLeft: 'left',
  KeyA: 'left',
  ArrowRight: 'right',
  KeyD: 'right',
  ArrowUp: 'up',
  KeyW: 'up',
  ArrowDown: 'down',
  KeyS: 'down',
  Space: 'interact',
  Enter: 'interact',
  KeyM: 'cancel-interact',
  KeyX: 'cancel-interact',
})

export default function KeyboardInputHandler({ fns }: { fns: InputAbstractionFunctions }) {
  const kbdStateRef = useRef<Record<keyof typeof keyMaps, boolean>>({})
  const [isPointerLocked, setIsPointerLocked] = useState(() => document.pointerLockElement != null)

  useEffect(() => {
    if (!isPointerLocked) {
      return () => {}
    }

    const keyDown = (e: KeyboardEvent) => {
      const { code } = e
      if (code in keyMaps) {
        e.preventDefault()
        if (kbdStateRef.current[code]) {
          return
        }

        kbdStateRef.current[code] = true
        const inputKey = keyMaps[code]
        fns.press[inputKey]('keyboard')
      }
    }
    const keyUp = (e: KeyboardEvent) => {
      const { code } = e
      if (code in keyMaps) {
        e.preventDefault()
        if (!kbdStateRef.current[code]) {
          return
        }

        kbdStateRef.current[code] = false
        const inputKey = keyMaps[code]
        fns.release[inputKey]('keyboard')
      } else if (code === 'KeyF') {
        const { pointerLockElement } = document
        handleFullscreen().then(() => {
          pointerLockElement?.requestPointerLock()
        })
      }
    }

    window.addEventListener('keydown', keyDown, false)
    window.addEventListener('keyup', keyUp, false)
    return () => {
      window.removeEventListener('keydown', keyDown, false)
      window.removeEventListener('keyup', keyUp, false)
    }
  }, [fns, isPointerLocked])

  useEffect(() => {
    const fn = () => setIsPointerLocked(document.pointerLockElement != null)

    document.addEventListener('pointerlockchange', fn, false)
    return () => document.removeEventListener('pointerlockchange', fn, false)
  }, [])

  return null
}
