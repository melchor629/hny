import { animated } from '@react-spring/web'
import { useEffect } from 'react'
import useNotifications from '../../hooks/use-notifications'
import SpritesheetImage from '../spritesheet-image'
import s from './notification-hud.module.scss'

export default function Notification({ styles, notification, gameScale }: any) {
  useEffect(() => {
    const id = setTimeout(() => {
      useNotifications.getState().remove(notification.id)
    }, notification.duration)
    return () => clearTimeout(id)
  }, [notification])

  return (
    <animated.div className={s.notification} style={styles}>
      {typeof notification.icon === 'string' && <img src={notification.icon} />}
      {typeof notification.icon === 'object' && (
        <SpritesheetImage
          spritesheet={notification.icon.spritesheet}
          frame={notification.icon.frame}
          scale={(notification.icon.scale ?? 0.925) * gameScale}
          position={notification.icon.position}
        />
      )}
      <span>{notification.title}</span>
    </animated.div>
  )
}
