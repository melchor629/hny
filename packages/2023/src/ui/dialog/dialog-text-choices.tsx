import { animated, useTransition } from '@react-spring/web'
import { useCallback, useEffect, useState } from 'react'
import useInput from '../../hooks/use-input'
import type { DialogEntry } from '../../types/dialogs'
import clsx from '../../utils/clsx'
import styles from './dialog-text.module.scss'

interface DialogTextChoicesProps {
  show: boolean
  choices: DialogEntry['choices']
  onClick: (id: `${string}:${string}:${string}`) => void
}

export default function DialogTextChoices({ choices, show, onClick }: DialogTextChoicesProps) {
  const [selectedChoice, setSelectedChoice] = useState<`${string}:${string}:${string}` | null>(null)
  const [transitionRestVisible, setTransitionRestVisible] = useState(false)
  const input = useInput('dialog')
  const k = show && !!choices ? [choices] : []
  const transition = useTransition(k, {
    key: () => 'c',
    from: { t: 0 },
    enter: { t: 1 },
    leave: { t: 0 },
    onRest: (_1: any, _2: any, v: any) => {
      if (!show && transitionRestVisible) {
        setTransitionRestVisible(false)
      } else if (show && !transitionRestVisible) {
        setTransitionRestVisible(true)
      }
    },
  })

  const choiceClick = useCallback(
    (id: `${string}:${string}:${string}`) => (e: any) => {
      e.preventDefault()
      onClick(id)
    },
    [onClick],
  )

  const choiceSelect = useCallback(
    (id: `${string}:${string}:${string}`) => () => {
      if (selectedChoice !== id) {
        setSelectedChoice(id)
      }
    },
    [selectedChoice],
  )

  useEffect(() => {
    setSelectedChoice(choices?.[0].id ?? null)
    if (choices && transitionRestVisible) {
      const fns = [
        input.forKey('up').subscribe({
          press() {
            setSelectedChoice((s) => {
              const idx = choices.findIndex((c) => c.id === s)
              if (idx > 0) {
                return choices[idx - 1].id
              }

              return s
            })
          },
        }),
        input.forKey('down').subscribe({
          press() {
            setSelectedChoice((s) => {
              const idx = choices.findIndex((c) => c.id === s)
              if (idx < choices.length - 1) {
                return choices[idx + 1].id
              }

              return s
            })
          },
        }),
        input.forKey('interact').once({
          release() {
            setSelectedChoice((s) => {
              s && setTimeout(() => onClick(s))
              return s
            })
          },
        }),
      ]
      return () => fns.forEach((fn) => fn())
    }

    return () => {}
  }, [choices, transitionRestVisible])

  return transition(
    (style, s) =>
      s && (
        <animated.div
          className={styles.choices}
          style={{
            opacity: style.t,
            transform: style.t.to((v) => `translateY(${(1.0 - v) * -5.0}px)`),
            visibility: style.t.to((v) => (v === 0 ? 'hidden' : 'visible')),
          }}
        >
          {s.map(({ id, text }) => (
            <div
              key={id}
              className={clsx(styles.choice, id === selectedChoice && styles['choice-selected'])}
              onClick={choiceClick(id)}
              onMouseMove={choiceSelect(id)}
            >
              {text}
            </div>
          ))}
        </animated.div>
      ),
  )
}
