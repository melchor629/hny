import { animated, useTransition } from '@react-spring/web'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useAcademiaRoomState from '../../hooks/use-academia-room-state'
import useInput from '../../hooks/use-input'
import useScenario from '../../hooks/use-scenario'
import clsx from '../../utils/clsx'
import InventoryControls from '../inventory/inventory-controls'
import Video from '../video'
import styles from './menu-hud.module.scss'

const generateRandomLayout = () => {
  const num = Math.trunc(Math.random() * 15)
  if (num < 8) return 'intro2'
  if (num < 12) return 'intro1'
  return 'intro3'
}

export default function MenuHud({ gameScale }: { gameScale: number }) {
  const [videoStartPlaying, setVideoStartPlaying] = useState(false)
  const [controls, setShowControls] = useState(false)
  const layout = useMemo(generateRandomLayout, [])
  const startButtonRef = useRef<HTMLButtonElement>(null)
  const controlsButtonRef = useRef<HTMLButtonElement>(null)
  const exitButtonRef = useRef<HTMLButtonElement>(null)
  const input = useInput('menu')
  const introDone = useAcademiaRoomState(useCallback((s) => s.intro, []))
  const hasScenario = useScenario(useCallback((s) => (s.nextScenario || s.scenario) != null, []))
  const opts = useMemo(() => {
    if (!videoStartPlaying) {
      return []
    }

    return controls ? (['controls'] as const) : (['menu'] as const)
  }, [videoStartPlaying, controls])
  const optionsTransition = useTransition(opts, {
    keys: (v) => v,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  const containerTransition = useTransition(!hasScenario, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 150,
  })

  const onStartPlaying = useCallback(() => setTimeout(() => setVideoStartPlaying(true), 1000), [])

  const exit = useCallback(() => window.location.assign('/'), [])

  const showControls = useCallback(() => setShowControls(true), [])

  const startGame = useCallback(() => {
    useScenario.getState().change('academia-room')
    input.blur()
  }, [])

  useEffect(() => {
    // delay some time so the other parts of the game can load fine
    setTimeout(() => input.focus(), 500)

    const fns = [
      input.forKey('right').subscribe({
        release() {
          const { activeElement } = document
          if (activeElement == null) {
            startButtonRef.current?.focus()
          } else if (startButtonRef.current === activeElement) {
            controlsButtonRef.current?.focus()
          } else if (controlsButtonRef.current === activeElement) {
            exitButtonRef.current?.focus()
          } else {
            startButtonRef.current?.focus()
          }
        },
      }),
      input.forKey('left').subscribe({
        release() {
          const { activeElement } = document
          if (activeElement == null) {
            exitButtonRef.current?.focus()
          } else if (exitButtonRef.current === activeElement) {
            controlsButtonRef.current?.focus()
          } else if (controlsButtonRef.current === activeElement) {
            startButtonRef.current?.focus()
          } else {
            exitButtonRef.current?.focus()
          }
        },
      }),
      input.forKey('interact').subscribe({
        release() {
          const { activeElement } = document
          if (activeElement == null) {
            // do nothing
          } else if (startButtonRef.current === activeElement) {
            startGame()
          } else if (controlsButtonRef.current === activeElement) {
            showControls()
          } else if (exitButtonRef.current === activeElement) {
            exit()
          }
        },
      }),
      input.forKey('cancel-interact').subscribe({
        release() {
          setShowControls(false)
        },
      }),
    ]

    return () => fns.forEach((fn) => fn())
  }, [input])

  useEffect(() => {
    if (controls) {
      return input.showTouchBack()
    }

    return () => {}
  }, [controls])

  return containerTransition(
    (containerStyles, show) =>
      show && (
        <animated.div
          className={styles.container}
          style={containerStyles}
          onPointerDown={input.focus}
        >
          <Video onStartPlaying={onStartPlaying} src={layout} fadeIn />

          {optionsTransition((optionsStyles, kind) => {
            if (kind === 'menu') {
              return (
                <animated.div
                  className={clsx(styles.options, styles[layout])}
                  style={optionsStyles}
                >
                  <h1>Un juego de año nuevo</h1>
                  <div className={styles.buttons}>
                    <button ref={startButtonRef} type="button" onClick={startGame}>
                      {introDone ? 'Continuar' : 'Empezar'}
                    </button>
                    <button ref={controlsButtonRef} type="button" onClick={showControls}>
                      Controles
                    </button>
                    <button ref={exitButtonRef} type="button" onClick={exit}>
                      Salir
                    </button>
                  </div>
                </animated.div>
              )
            }

            if (kind === 'controls') {
              return (
                <animated.div
                  className={clsx(styles.controls, styles[layout])}
                  style={optionsStyles}
                >
                  <InventoryControls hasFocus gameScale={gameScale} />
                </animated.div>
              )
            }

            return <animated.div style={optionsStyles} />
          })}
        </animated.div>
      ),
  )
}
