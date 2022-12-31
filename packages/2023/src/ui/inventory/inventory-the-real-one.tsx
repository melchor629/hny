import { useEffect, useState } from 'react'
import theInventory from '../../data/inventory'
import useInput from '../../hooks/use-input'
import useInventory from '../../hooks/use-inventory'
import clsx from '../../utils/clsx'
import SpritesheetImage from '../spritesheet-image'
import styles from './inventory-the-real-one.module.scss'

const ELEMENTS_PER_ROW = 7

const emptyTitles = [
  '¡¡Está vacío!!',
  '¿Buscas algo que aún no tienes?',
  'Nada que ver…',
  'Waiting for something to happen?',
]
const emptySubtitles = [
  'Sal y ve a buscar cosas por ahí…',
  'Esta sección no se va a rellenar solita, ¿sabes?',
  'Aquí aparecerá lo que recolectes por el mundo, que sea de utilidad',
  'Ve a buscar algo por la mazmorra, ¿quieres?',
]

export default function InventoryTheRealOne({
  hasFocus,
  gameScale,
}: {
  hasFocus: boolean
  gameScale: number
}) {
  const [inventory, [et, es]] = useInventory((state) => [state.inventory, state.inventoryNumbers])
  const [selectedItem, setSelectedItem] = useState(inventory[0]?.id)
  const input = useInput('inventory')

  useEffect(() => {
    if (hasFocus && inventory.length > 0) {
      const fns = [
        input.forKey('left').subscribe({
          press() {
            setSelectedItem((value) => {
              const inv = useInventory.getState().inventory
              const idx = inv.findIndex((i) => i.id === value)
              const col = idx % ELEMENTS_PER_ROW
              if (col > 0) {
                return inv[idx - 1]?.id ?? value
              }

              return value
            })
          },
        }),
        input.forKey('right').subscribe({
          press() {
            setSelectedItem((value) => {
              const inv = useInventory.getState().inventory
              const idx = inv.findIndex((i) => i.id === value)
              const col = idx % ELEMENTS_PER_ROW
              if (col < ELEMENTS_PER_ROW - 1) {
                return inv[idx + 1]?.id ?? value
              }

              return value
            })
          },
        }),
        input.forKey('up').subscribe({
          press() {
            setSelectedItem((value) => {
              const inv = useInventory.getState().inventory
              const idx = inv.findIndex((i) => i.id === value)
              const row = Math.trunc(idx / ELEMENTS_PER_ROW)
              const col = idx % ELEMENTS_PER_ROW
              if (row > 0) {
                const newIndex = (row - 1) * ELEMENTS_PER_ROW + col
                return inv[newIndex].id
              }

              return value
            })
          },
        }),
        input.forKey('down').subscribe({
          press() {
            setSelectedItem((value) => {
              const inv = useInventory.getState().inventory
              const idx = inv.findIndex((i) => i.id === value)
              const row = Math.trunc(idx / ELEMENTS_PER_ROW)
              const col = idx % ELEMENTS_PER_ROW
              if (row + 1 < Math.ceil(inv.length / ELEMENTS_PER_ROW)) {
                const newIndex = (row + 1) * ELEMENTS_PER_ROW + col
                return inv[newIndex]?.id ?? inv[inv.length - 1].id
              }

              return value
            })
          },
        }),
      ]

      return () => fns.forEach((fn) => fn())
    }

    return () => {}
  }, [hasFocus, inventory.length])

  if (inventory.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <span>{emptyTitles[et]}</span>
          <small>{emptySubtitles[es]}</small>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {inventory
          .map((item) => [item, theInventory[item.id]] as const)
          .map(([item, data]) => (
            <div
              key={item.id}
              className={clsx(
                styles.item,
                hasFocus && selectedItem === item.id && styles['selected-item'],
              )}
              onMouseEnter={() => selectedItem !== item.id && setSelectedItem(item.id)}
            >
              {data?.prop.texture && (
                <SpritesheetImage
                  frame={data.prop.texture.name}
                  spritesheet={data.prop.texture.spritesheet}
                  position={data.position}
                  scale={(data.scale ?? 1) * gameScale}
                />
              )}
              <div className={styles['item-count']}>x{item.count}</div>
              <div className={styles['item-name']}>
                <div>{data.name}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
