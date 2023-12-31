import { a, config, useSpring } from '@react-spring/web'
import { useCallback, useMemo } from 'react'
import { changingClosing, useGiftStatus } from '../../hooks/use-gift-status'
import { getObject } from '../../objects'
import { getRarity, getTotalObjects } from '../../objects/logic'
import styles from './styles.module.scss'
import { createPortal } from 'react-dom'

type Props = {
  isOpen: boolean
  close: () => void
}

export default function TheDialog({ close, isOpen }: Props) {
  const giftsVisited = useGiftStatus(useCallback((e) => e.giftsVisited, []))
  const containerStyles = useSpring({
    scale: +isOpen,
    config: config.wobbly,
  })
  const giftsWithInfo = useMemo(
    () =>
      giftsVisited.map((giftId) => {
        const gift = getObject(giftId)
        return [
          gift,
          getRarity(gift),
          () => {
            changingClosing(giftId)
            close()
          },
        ] as const
      }),
    [giftsVisited],
  )

  return createPortal(
    <a.div
      className={styles.dialog}
      style={{
        opacity: containerStyles.scale,
        pointerEvents: containerStyles.scale.to((v) => (v < 1 ? 'none' : 'all')),
      }}
      onClick={close}
    >
      <a.div
        className={`${styles.dialogContainer} ${styles.bg}`}
        style={containerStyles}
        role="dialog"
        aria-labelledby="dialog-title"
        onClick={useCallback((e: any) => e.stopPropagation(), [])}
      >
        <h2 role="heading" id="dialog-title">
          Regalos descubiertos&nbsp;
          <small>{`(${giftsWithInfo.length} de ${getTotalObjects()})`}</small>
        </h2>
        <ul>
          {giftsWithInfo.map(([gift, rarity, onClick]) => (
            <li key={gift.id} className={styles[rarity]} onClick={onClick}>
              <div className={styles.rarity} />
              <span>&nbsp;{gift.name}</span>
            </li>
          ))}
        </ul>
      </a.div>
    </a.div>,
    document.body,
  )
}
