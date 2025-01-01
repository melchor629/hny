import { animated, easings, useSpring } from '@react-spring/web'
import { type PropsWithChildren, useMemo } from 'react'
import styles from './text.module.css'

type AnimatedTextProps = PropsWithChildren<{
  delay: number
  pause?: number
  onEnd: () => void
}>

export default function AnimatedText({ children, delay, pause = 1000, onEnd }: AnimatedTextProps) {
  const [animStyles] = useSpring(
    () => ({
      from: { transform: -50 },
      to: async (next) => {
        await next({ transform: 0, config: { easing: easings.easeOutCubic } })
        await next({ transform: 50, delay, config: { easing: easings.easeInCubic } })
        await next({ transform: 51, config: { duration: pause, easing: easings.easeInCubic } })
      },
      config: {
        duration: 4_000,
        easing: easings.easeOutBounce,
      },
      onRest: (result) => result.finished && onEnd(),
    }),
    [delay, pause, onEnd],
  )

  return (
    <animated.div
      className={styles['animated-text']}
      style={useMemo(
        () => ({
          transform: animStyles.transform.to((v) => `translateY(calc(${v}dvh + ${v}%))`),
        }),
        [animStyles],
      )}
    >
      {children}
    </animated.div>
  )
}
