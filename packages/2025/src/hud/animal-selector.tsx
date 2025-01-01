import { animated, useTransition } from '@react-spring/web'
import { useCallback, useMemo, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import { type AnimalKey, animalKeys, animals } from '../animals'
import useGameState from '../use-game-state'
import styles from './animal-selector.module.css'

function AnimalItemSelector({ animalKey }: { animalKey: AnimalKey }) {
  const visitedAnimalKeys = useGameState(useShallow((state) => state.visitedAnimalKeys))
  const currentAnimalKey = useGameState(useShallow((state) => state.animalKey))
  const isVisited = useMemo(
    () => visitedAnimalKeys.includes(animalKey),
    [animalKey, visitedAnimalKeys],
  )
  const animal = animals[animalKey]

  const onAnimalItemClicked = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      useGameState.getState().showAnimal(animalKey)
    },
    [animalKey],
  )

  return (
    <li
      className={`${styles['selector-item']} ${!isVisited ? styles['selector-item-disabled'] : ''} ${currentAnimalKey === animalKey ? styles['selector-item-selected'] : ''}`}
      onClick={onAnimalItemClicked}
    >
      {isVisited ? `${animal.name} (📷 ${animal.photographer})` : '???'}
    </li>
  )
}

export default function AnimalSelector() {
  const { stage, stageReady } = useGameState()
  const [selectorVisible, setSelectorVisible] = useState(false)
  const transitions = useTransition(stage === 'animals' && selectorVisible, {
    from: { opacity: 0, y: -12 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -12 },
  })
  const otherTransitions = useTransition(stageReady && stage !== 'text', {
    from: { opacity: 0, scale: 0.9, y: 12 },
    enter: { opacity: 1, scale: 1, y: 0 },
    leaver: { opacity: 0, scale: 0.9, y: 12 },
  })

  const toggleSelectorDialog = useCallback(() => setSelectorVisible((v) => !v), [])
  const toggleObserveMode = useCallback(() => useGameState.getState().toggleObserveStage(), [])

  return (
    <>
      {otherTransitions(
        (trStyles, show) =>
          show && (
            <animated.button
              className={`${styles.button} ${stage === 'vibing' ? styles.vibing : ''}`}
              style={trStyles}
              onClick={toggleSelectorDialog}
              onDoubleClick={toggleObserveMode}
            >
              🐈
            </animated.button>
          ),
      )}

      {transitions(
        (trStyles, show) =>
          show && (
            <animated.div style={trStyles} className={styles['selector-container']}>
              <ul className={styles['selector-list']}>
                {animalKeys.map((animalKey) => (
                  <AnimalItemSelector key={animalKey} animalKey={animalKey} />
                ))}
              </ul>
            </animated.div>
          ),
      )}
    </>
  )
}
