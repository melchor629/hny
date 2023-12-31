import { useCallback, useEffect } from 'react'
import { appearing, useGiftStatus } from '../../hooks/use-gift-status'
import styles from './styles.module.scss'
import { animated, config, useSpringValue } from '@react-spring/web'

export default function TheWelcome() {
  const state = useGiftStatus(useCallback((s) => s.state, []))
  const opacitySpringValue = useSpringValue(1)
  const text1SpringValue = useSpringValue('scale(0)')
  const text3SpringValue = useSpringValue('scale(0)')
  const text4SpringValue = useSpringValue('scale(0)', { config: config.wobbly })
  const text5SpringValue = useSpringValue('scale(0)', { config: config.molasses })

  const onButtonClick = useCallback(async () => {
    await opacitySpringValue.start(0)
    appearing()
  }, [])

  useEffect(() => {
    if (state === 'welcome') {
      ;(async () => {
        await new Promise((r) => setTimeout(r, 1000))
        await text1SpringValue.start('scale(1)')
        await text3SpringValue.start('scale(1)', { delay: 1000 })
        await text4SpringValue.start('scale(1)', { delay: 1250 })
        await text5SpringValue.start('scale(1)', { delay: 2250 })
      })()
    }
  }, [state])

  if (state !== 'welcome') {
    return null
  }

  return (
    <animated.div className={styles.container} style={{ opacity: opacitySpringValue }}>
      <animated.div className={styles.text1} style={{ transform: text1SpringValue }}>
        Ha llegado un nuevo año…
      </animated.div>
      <animated.div className={styles.text1} style={{ transform: text3SpringValue }}>
        Espero que éste sea bueno para tí :)
      </animated.div>
      <animated.div className={styles.text2} style={{ transform: text4SpringValue }}>
        ¡Feliz año 2024!
      </animated.div>
      <animated.div className={styles.text1} style={{ transform: text5SpringValue }}>
        Por tanto, te mereces un regalo
        <br />
        <button className={styles.button} onClick={onButtonClick}>
          ¡Quiero mi regalo!
        </button>
      </animated.div>
    </animated.div>
  )
}
