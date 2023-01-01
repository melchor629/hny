import {
  TouchEventHandler,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import useDialog from '../../hooks/use-dialog'
import useInput from '../../hooks/use-input'
import useInventory from '../../hooks/use-inventory'
import useScenario from '../../hooks/use-scenario'
import handleFullscreen from '../../utils/handle-fullscreen'
import { ArrowLeft, Fullscreen, FullscreenExit } from '../icons'
import styles from './touch-input-handler.module.scss'
import type { InputAbstractionFunctions } from './types'

const touchById = (touches: any, id: number) => {
  for (const touch of touches) {
    if (touch.identifier === id) {
      return touch
    }
  }
}

export default function TouchInputHandler({
  fns,
  showTouchBack,
}: {
  fns: InputAbstractionFunctions
  showTouchBack: boolean
}) {
  const [joystickCenter, setJoystickCenter] = useState<readonly [number, number] | null>(null)
  const stickRef = useRef<HTMLDivElement>(null)
  const touchIdRef = useRef<number>()
  const touchStateRef = useRef<{ x: -1 | 0 | 1; y: -1 | 0 | 1 }>({ x: 0, y: 0 })
  const hasScenario = useScenario(useCallback((s) => (s.nextScenario || s.scenario) != null, []))
  const [isFullscreen, setFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const deferredShowControls = useDeferredValue(showControls)
  const input = useInput()

  const joystickTranslation = useMemo(() => {
    if (!joystickCenter) {
      return undefined
    }

    const [dx, dy] = joystickCenter
    return `translate(${dx}px, ${dy}px)`
  }, [joystickCenter])

  const onJoystickTouchStart: TouchEventHandler<HTMLDivElement> = useCallback((e) => {
    if (touchIdRef.current != null) {
      // ignore other touches
      return
    }

    const touch = e.changedTouches.item(0)
    const box = (e.target as HTMLDivElement).getBoundingClientRect()
    const [centerX, centerY] = [box.x + box.width / 2, box.y + box.height / 2]
    const center = [touch.clientX - centerX, touch.clientY - centerY] as const
    setJoystickCenter(center)
    touchIdRef.current = touch.identifier
  }, [])

  const onJoystickTouchEnd: TouchEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (touchIdRef.current != null && touchById(e.changedTouches, touchIdRef.current)) {
        setJoystickCenter(null)
        stickRef.current!.style.transform = ''
        touchIdRef.current = undefined

        if (touchStateRef.current.x === 1) {
          fns.release.right('touch')
        } else if (touchStateRef.current.x === -1) {
          fns.release.left('touch')
        }
        if (touchStateRef.current.y === 1) {
          fns.release.up('touch')
        } else if (touchStateRef.current.y === -1) {
          fns.release.down('touch')
        }
        ;[touchStateRef.current.x, touchStateRef.current.y] = [0, 0]
      }
    },
    [fns],
  )

  const onJoystickTouchMove: TouchEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (touchIdRef.current == null) {
        return
      }

      const touch = touchById(e.changedTouches, touchIdRef.current)
      if (!touch) {
        return
      }

      const box = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
      const [width, height] = [box.width / 2, box.height / 2]
      const [dx, dy] = [touch.clientX - box.x - width, touch.clientY - box.y - height]
      // atan is the function, but only returns [90, -90]º, atan2 fixes this
      const angle = Math.atan2(dy, dx)
      const [maxX, maxY] = [width * Math.cos(angle), height * Math.sin(angle)]
      // depending on the quarter, the clamp will apply differently
      const x = dx < 0 ? Math.max(maxX, dx) : Math.min(dx, maxX)
      const y = dy < 0 ? Math.max(maxY, dy) : Math.min(dy, maxY)
      stickRef.current!.style.transform = `translate(${x}px, ${y}px)`

      // now, the fun: in which direction should the player go
      const angleDeg = (angle * 180) / Math.PI
      const nextTouchState: { x: -1 | 0 | 1; y: -1 | 0 | 1 } = { x: 0, y: 0 }
      if (Math.abs(dy / height) > 0.4) {
        if (angleDeg < 0) {
          nextTouchState.y = 1
        } else {
          nextTouchState.y = -1
        }
      } else {
        nextTouchState.y = 0
      }
      if (Math.abs(dx / width) > 0.4) {
        if (Math.abs(angleDeg) < 90) {
          nextTouchState.x = 1
        } else {
          nextTouchState.x = -1
        }
      } else {
        nextTouchState.x = 0
      }

      // check differences
      if (nextTouchState.x !== touchStateRef.current.x) {
        if (touchStateRef.current.x === 1) {
          fns.release.right('touch')
        } else if (touchStateRef.current.x === -1) {
          fns.release.left('touch')
        }

        if (nextTouchState.x === 1) {
          fns.press.right('touch')
        } else if (nextTouchState.x === -1) {
          fns.press.left('touch')
        }
      }
      if (nextTouchState.y !== touchStateRef.current.y) {
        if (touchStateRef.current.y === 1) {
          fns.release.up('touch')
        } else if (touchStateRef.current.y === -1) {
          fns.release.down('touch')
        }

        if (nextTouchState.y === 1) {
          fns.press.up('touch')
        } else if (nextTouchState.y === -1) {
          fns.press.down('touch')
        }
      }

      ;[touchStateRef.current.x, touchStateRef.current.y] = [nextTouchState.x, nextTouchState.y]
    },
    [fns],
  )

  const avoidContextMenu = useCallback((e: any) => {
    e.preventDefault()
  }, [])

  const onInteractTouchStart = useCallback(() => {
    fns.press.interact('touch')
  }, [fns])

  const onInteractTouchEnd = useCallback(() => {
    fns.release.interact('touch')
  }, [fns])

  const onCancelInteractTouchStart = useCallback(() => {
    fns.press['cancel-interact']('touch')
  }, [fns])

  const onCancelInteractTouchEnd = useCallback(() => {
    fns.release['cancel-interact']('touch')
  }, [fns])

  const onFullscreenClicked = useCallback(() => {
    handleFullscreen()
  }, [])

  const onBackClicked = useCallback(() => {
    fns.press['cancel-interact']('touch')
    fns.release['cancel-interact']('touch')
  }, [fns])

  useEffect(() => {
    const handler = () => {
      setFullscreen(document.fullscreenElement != null)
    }

    document.addEventListener('fullscreenchange', handler, false)
    return () => document.removeEventListener('fullscreenchange', handler, false)
  }, [])

  useEffect(
    () =>
      input.onFocusChange((focus) => {
        setShowControls(focus === 'player')
      }),
    [],
  )

  if (navigator.maxTouchPoints === 0) {
    return null
  }

  if (!hasScenario || !deferredShowControls) {
    return createPortal(
      <div className={styles.container}>
        {handleFullscreen.isEnabled && (
          <div
            className={styles['fullscreen-button']}
            onContextMenu={avoidContextMenu}
            onClick={onFullscreenClicked}
          >
            {!isFullscreen && <Fullscreen />}
            {isFullscreen && <FullscreenExit />}
          </div>
        )}
        {showTouchBack && (
          <div
            className={styles['back-button']}
            onContextMenu={avoidContextMenu}
            onClick={onBackClicked}
          >
            <ArrowLeft />
          </div>
        )}
      </div>,
      document.body,
    )
  }

  return createPortal(
    <div className={styles.container}>
      <div
        className={styles.joystick}
        style={{ transform: joystickTranslation }}
        onTouchStart={onJoystickTouchStart}
        onTouchMove={onJoystickTouchMove}
        onTouchEnd={onJoystickTouchEnd}
        onContextMenu={avoidContextMenu}
      >
        <div ref={stickRef} className={styles.stick}>
          &nbsp;
        </div>
      </div>
      <div className={styles.buttons}>
        <div
          className={styles['interact-button']}
          onTouchStart={onInteractTouchStart}
          onTouchEnd={onInteractTouchEnd}
          onContextMenu={avoidContextMenu}
        >
          A
        </div>
        <div
          className={styles['cancel-interact-button']}
          onTouchStart={onCancelInteractTouchStart}
          onTouchEnd={onCancelInteractTouchEnd}
          onContextMenu={avoidContextMenu}
        >
          B
        </div>
      </div>

      {handleFullscreen.isEnabled && (
        <div
          className={styles['fullscreen-button']}
          onContextMenu={avoidContextMenu}
          onClick={onFullscreenClicked}
        >
          {!isFullscreen && <Fullscreen />}
          {isFullscreen && <FullscreenExit />}
        </div>
      )}

      {showTouchBack && (
        <div
          className={styles['back-button']}
          onContextMenu={avoidContextMenu}
          onClick={onBackClicked}
        >
          <ArrowLeft />
        </div>
      )}
    </div>,
    document.body,
  )
}
