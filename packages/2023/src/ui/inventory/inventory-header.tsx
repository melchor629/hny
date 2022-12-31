import { useCallback, useEffect } from 'react'
import useInput from '../../hooks/use-input'
import useInventory from '../../hooks/use-inventory'
import clsx from '../../utils/clsx'
import styles from './inventory-header.module.scss'

const InventoryHeaderButton = ({ children, hasFocus, tab }: any) => {
  const selectedTab = useInventory((state) => state.tab)
  return (
    <div
      className={clsx(
        styles.button,
        selectedTab === tab && styles['selected-button'],
        selectedTab === tab && hasFocus && styles['focused'],
      )}
      role="button"
      onClick={useCallback(
        (e: any) => {
          e.preventDefault()
          useInventory.getState().changeTab(tab)
        },
        [tab],
      )}
    >
      {children}
    </div>
  )
}

export default function InventoryHeader({ hasFocus }: { hasFocus?: boolean }) {
  const input = useInput()

  useEffect(() => {
    if (hasFocus) {
      const fns = [
        input.forKey('left').subscribe({
          press() {
            useInventory.getState().previousTab()
          },
        }),
        input.forKey('right').subscribe({
          press() {
            useInventory.getState().nextTab()
          },
        }),
      ]

      return () => fns.forEach((fn) => fn())
    }
  }, [hasFocus])

  return (
    <div className={styles.container}>
      <InventoryHeaderButton tab="book" hasFocus={hasFocus}>
        Libro
      </InventoryHeaderButton>
      <InventoryHeaderButton tab="items" hasFocus={hasFocus}>
        Inventario
      </InventoryHeaderButton>
      <InventoryHeaderButton tab="controls" hasFocus={hasFocus}>
        Controles
      </InventoryHeaderButton>
      <InventoryHeaderButton tab="about" hasFocus={hasFocus}>
        &lt;3
      </InventoryHeaderButton>
      <div
        className={styles['close-button']}
        role="button"
        onClick={useCallback((e: any) => {
          e.preventDefault()
          useInventory.getState().close()
        }, [])}
      >
        &times;
      </div>
    </div>
  )
}
