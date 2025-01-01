import { animated, to, useSpring, useTransition } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useGameState from '../use-game-state'
import AnimalPicture from './animal-picture'
import AnimalSelector from './animal-selector'
import styles from './animals-container.module.css'

const calcX = (y: number) => -(y - window.innerHeight / 2) / 60
const calcY = (x: number) => (x - window.innerWidth / 2) / 60

export default function AnimalsContainer() {
  const { stage, stageReady, animalKey, nextRandomAnimal } = useGameState()
  const [targetRef, setTargetRef] = useState<HTMLElement | null>(null)

  const [{ rotateX, rotateY, zoom }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    zoom: 1,
    config: { mass: 5, tension: 350, friction: 40 },
  }))
  const transitions = useTransition(
    (!stageReady || stage !== 'animals' || animalKey == null ? '💀' : animalKey) as
      | NonNullable<typeof animalKey>
      | '💀',
    {
      keys: null,
      from: { opacity: 0, scale: 0.95, translateY: -30 },
      enter: { opacity: 1, scale: 1, translateY: 0 },
      leave: { opacity: 0, scale: 1.05, translateY: 30 },
    },
  )

  const changeTargetRef = useCallback((element: HTMLElement | null) => {
    setTargetRef((r) => element ?? r)
  }, [])

  useGesture(
    useMemo(
      () => ({
        onHover: ({ hovering }) => !hovering && api.start({ rotateX: 0, rotateY: 0, zoom: 1 }),
        onMove: ({ xy: [px, py] }) =>
          api.start({ rotateX: calcX(py), rotateY: calcY(px), zoom: 1 }),
      }),
      [api],
    ),
    { eventOptions: { passive: false }, move: { mouseOnly: true }, target: targetRef || undefined },
  )

  useEffect(() => {
    if (stage === 'animals' && animalKey === null) {
      nextRandomAnimal()
    }
  }, [stage])

  return (
    <div className={styles.containement}>
      {transitions((style, key) => (
        <animated.div key={key} className={styles.container} style={style}>
          {key !== '💀' && (
            <AnimalPicture
              ref={changeTargetRef}
              animalKey={key}
              nextAnimal={nextRandomAnimal}
              effectStyles={{ transform: 'perspective(50cm)', rotateX, rotateY, scale: zoom }}
            />
          )}
        </animated.div>
      ))}

      <AnimalSelector />
    </div>
  )
}
