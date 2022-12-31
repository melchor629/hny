import { useTransition } from '@react-spring/web'
import useNotifications from '../../hooks/use-notifications'
import Notification from './notification'
import s from './notification-hud.module.scss'

export default function NotificationHud({ gameScale }: { gameScale: number }) {
  const notifications = useNotifications((s) => s.notifications)
  const transitions = useTransition(notifications, {
    keys: (item) => item.id,
    from: { transform: `translateX(${2.55 * gameScale}rem)` },
    enter: { transform: 'translateX(0rem)' },
    leave: { transform: `translateX(${2.55 * gameScale}rem)` },
  })

  return (
    <div className={s.container}>
      {transitions((styles, item) => (
        <Notification styles={styles} notification={item} gameScale={gameScale} />
      ))}
    </div>
  )
}
