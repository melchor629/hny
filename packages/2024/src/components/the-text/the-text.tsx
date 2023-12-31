import { animated, config, useSpring } from '@react-spring/web'
import { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { closing, useGiftStatus } from '../../hooks/use-gift-status'
import { getObject } from '../../objects'
import { getRarity, getTotalObjects } from '../../objects/logic'
import styles from './styles.module.scss'
import TheButton from './the-button'
import TheDialog from './the-dialog'

const gifted = [
  'Enhorabuena, te han regalado:',
  'Has sido agraciado con:',
  'Disfruta de:',
  'Ostras, que envidia, te han regalado:',
  'uwu 👉👈',
  'De parte de tu amigo, espero que te guste:',
]

export default function TheText() {
  const [dialogIsOpen, setDialogOpened] = useState(false)
  const { state, gift, giftsVisited } = useGiftStatus()
  const giftInfo = useMemo(() => (gift ? getObject(gift) : null), [gift])
  const giftRarity = useMemo(() => (giftInfo ? getRarity(giftInfo) : ''), [giftInfo])
  const randomGiftedText = useMemo(
    () => (gift ? gifted[Math.trunc(Math.random() * gifted.length)] : ''),
    [gift],
  )
  const hasGiftInfo = state === 'opened' && !!giftInfo
  const [springStyles, springApi] = useSpring(
    () => ({
      opacity: +hasGiftInfo,
      scale: +hasGiftInfo,
      config: config.wobbly,
    }),
    [hasGiftInfo],
  )

  const otherGiftButtonClicked = useCallback(() => {
    setTimeout(closing, 300)
  }, [])

  const openDialog = useCallback(() => setDialogOpened(true), [])
  const closeDialog = useCallback(() => setDialogOpened(false), [])

  useLayoutEffect(() => {
    if (state === 'opened') {
      springApi.start({ opacity: 1, scale: 1, from: { opacity: 0, scale: 0 } })
    }
  }, [])

  if (!giftInfo) {
    return null
  }

  return (
    <animated.div
      className={`${styles.container} ${styles.bg} ${styles[giftRarity]}`}
      role="note"
      style={springStyles}
    >
      <div className={styles.outside}>
        <TheButton
          className={`${styles.button} ${styles.bg}`}
          type="button"
          onClick={otherGiftButtonClicked}
        >
          Quiero otro…
        </TheButton>
        {giftsVisited.length > 1 && (
          <TheButton className={`${styles.button} ${styles.bg}`} type="button" onClick={openDialog}>
            {`${giftsVisited.length} de ${getTotalObjects()}`}
          </TheButton>
        )}
      </div>
      <div className={styles.gifted}>{randomGiftedText}</div>
      <div className={styles.giftName}>
        <div className={styles.rarity} />
        <span>{giftInfo.name}</span>
      </div>
      <div className={styles.giftDescription}>{giftInfo.description}</div>
      <TheDialog isOpen={dialogIsOpen} close={closeDialog} />
    </animated.div>
  )
}
