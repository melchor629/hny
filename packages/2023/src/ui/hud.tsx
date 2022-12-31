import { useLayoutEffect, useMemo, useState, useTransition } from 'react'
import DialogHud from './dialog/dialog-hud'
import InventoryHud from './inventory/inventory-hud'
import MenuHud from './menu/menu-hud'
import NotificationHud from './notifications/notification-hud'

export default function Hud({ width, height, scale }: any) {
  const [div, setDiv] = useState<HTMLDivElement | null>(null)
  const [gameScale, setGameScale] = useState(1)
  const [_, startTransition] = useTransition()
  const resizeObserver = useMemo(
    () =>
      new ResizeObserver(([entry]) => {
        // applies proper scaling to the hud element to match screen size
        const value = entry.contentRect.width / (width * scale)
        const el = entry.target.querySelector('#hud') as HTMLDivElement
        el.style.setProperty('--game-scale', `${value * scale}`)
        el.style.setProperty('--game-width', `${width * scale * value}px`)
        el.style.setProperty('--game-height', `${height * scale * value}px`)
        startTransition(() => setGameScale(value * scale))
      }),
    [width, height, scale],
  )

  useLayoutEffect(() => () => resizeObserver.disconnect(), [resizeObserver])

  useLayoutEffect(() => {
    div && resizeObserver.observe(div.parentElement!)

    return () => {
      div && resizeObserver.unobserve(div.parentElement!)
    }
  }, [div])

  return (
    <div
      ref={setDiv}
      id="hud"
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        transformOrigin: 'left top',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <MenuHud gameScale={gameScale} />
      <DialogHud />
      <InventoryHud gameScale={gameScale} />
      <NotificationHud gameScale={gameScale} />
    </div>
  )
}
