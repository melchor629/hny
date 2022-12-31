import { animated, useTransition } from '@react-spring/web'
import { useCallback, useEffect, useState } from 'react'
import useInput from '../../hooks/use-input'
import useInventory from '../../hooks/use-inventory'
import InventoryBook from './inventory-book'
import InventoryControls from './inventory-controls'
import InventoryHeader from './inventory-header'
import styles from './inventory-hud.module.scss'
import InventoryLove from './inventory-love'
import InventoryTheRealOne from './inventory-the-real-one'

export default function InventoryHud({ gameScale }: { gameScale: number }) {
  const [headerFocus, setHeaderFocus] = useState(true)
  const [isOpen, tab] = useInventory((state) => [state.isOpen, state.tab])
  const input = useInput()
  const inventoryInput = useInput('inventory')
  const containerTransition = useTransition(isOpen, {
    from: { t: 0 },
    enter: { t: 1 },
    leave: { t: 0 },
  })

  const contentMouseInteraction = useCallback(() => {
    if (headerFocus) {
      setHeaderFocus(false)
    }
  }, [headerFocus])

  useEffect(
    () =>
      input.forKey('cancel-interact').subscribe({
        release() {
          const { focusTarget } = input
          if (focusTarget === 'player') {
            useInventory.getState().open()
            setHeaderFocus(true)
          }
        },
      }),
    [headerFocus],
  )

  useEffect(
    () =>
      inventoryInput.forKey('interact').subscribe({
        release() {
          setHeaderFocus((v) => (v ? false : v))
        },
      }),
    [],
  )

  useEffect(
    () =>
      inventoryInput.forKey('cancel-interact').subscribe({
        release() {
          if (headerFocus) {
            useInventory.getState().close()
          } else {
            setHeaderFocus(true)
          }
        },
      }),
    [headerFocus],
  )

  useEffect(() => {
    if (isOpen) {
      inventoryInput.focus()
    } else {
      inventoryInput.blur()
    }
  }, [isOpen])

  return containerTransition(
    (style, s) =>
      s && (
        <animated.div
          className={styles.container}
          style={{
            opacity: style.t,
            transform: style.t.to((v) => `scale(${0.95 + 0.05 * v})`),
          }}
        >
          <InventoryHeader hasFocus={headerFocus} />
          <div
            className={styles.content}
            onMouseEnter={contentMouseInteraction}
            onClick={contentMouseInteraction}
          >
            {tab === 'book' && <InventoryBook hasFocus={!headerFocus} />}
            {tab === 'items' && (
              <InventoryTheRealOne hasFocus={!headerFocus} gameScale={gameScale} />
            )}
            {tab === 'controls' && (
              <InventoryControls hasFocus={!headerFocus} gameScale={gameScale} />
            )}
            {tab === 'about' && <InventoryLove hasFocus={!headerFocus} gameScale={gameScale} />}
          </div>
        </animated.div>
      ),
  )
}
