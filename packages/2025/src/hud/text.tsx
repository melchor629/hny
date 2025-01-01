import { type PropsWithChildren, useCallback, useState } from 'react'
import styles from './text.module.css'
import useGameState from '../use-game-state'
import { useShallow } from 'zustand/shallow'
import AnimatedText from './animated-text'

const Typography = ({
  children,
  variant = '2',
}: PropsWithChildren<{ variant?: '1' | '2' | 'neko' }>) => (
  <div className={styles[`text${variant}`]}>{children}</div>
)

type TextStates = 'greeting' | 'onegai' | 'hny' | 'waiting' | 'present' | null
const textStateTransitions = Object.freeze({
  greeting: 'onegai',
  onegai: 'hny',
  hny: 'waiting',
  waiting: 'present',
  present: null,
} satisfies Record<NonNullable<TextStates>, TextStates>)

export default function Text() {
  const stage = useGameState(useShallow((state) => (state.stageReady ? state.stage : 'loading')))
  const [text, setText] = useState<TextStates>('greeting')
  const onTextEnd = useCallback(() => {
    setText((v) => {
      const nextState = (v && textStateTransitions[v]) || null
      if (nextState === null) {
        requestAnimationFrame(() => useGameState.setState({ stage: 'animals' }))
      }
      return nextState
    })
  }, [])

  if (stage !== 'text') {
    return null
  }

  return (
    <div className={styles.container}>
      {text === 'greeting' && (
        <AnimatedText delay={4_000} onEnd={onTextEnd}>
          <Typography variant="1">Otro año más pasa...</Typography>
          <Typography>Otro año más de experiencias y vivencias...</Typography>
        </AnimatedText>
      )}
      {text === 'onegai' && (
        <AnimatedText delay={5_000} onEnd={onTextEnd}>
          <Typography>Espero que todos podamos seguir viviendo</Typography>
          <Typography>nuevas experiencias durante muchos años más...</Typography>
        </AnimatedText>
      )}
      {text === 'hny' && (
        <AnimatedText delay={7_000} onEnd={onTextEnd} pause={10_000}>
          <Typography variant="1">
            <span className={styles.reverte}>🎉</span>
            &nbsp;
            <span className={styles.woke}>Feliz año 2025</span>
            &nbsp;🎉
          </Typography>
        </AnimatedText>
      )}
      {text === 'waiting' && (
        <AnimatedText delay={2_000} onEnd={onTextEnd} pause={15_000}>
          <Typography variant="1">¿Esperando a que ocurra algo?</Typography>
          <Typography variant="neko">🐈</Typography>
        </AnimatedText>
      )}
      {text === 'present' && (
        <AnimatedText delay={500} onEnd={onTextEnd}>
          <Typography variant="1">Venga</Typography>
          <Typography>toma un animalillo graciosillo</Typography>
        </AnimatedText>
      )}
    </div>
  )
}
