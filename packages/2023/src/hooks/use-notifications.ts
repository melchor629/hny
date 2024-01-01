import { devtools } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import inventory from '../data/inventory'
import photos from '../data/photos'
import type { PixiMovie } from '../types/pixi-movie'

interface Notification {
  id: string
  icon: string | { spritesheet: PixiMovie; frame: string; scale?: number; position?: string }
  title: string
  duration: number
}

interface State {
  notifications: Notification[]

  show(notification: Omit<Notification, 'id'>): void
  showForPhoto(photoId: string): void
  showForItem(itemId: string): void
  remove(id: string): void
}

let nid = 0

const useNotifications = createWithEqualityFn(
  devtools<State>(
    (set, get) => ({
      notifications: [],

      show(notification) {
        set(
          (state) => ({
            notifications: [...state.notifications, { ...notification, id: `${nid++}` }],
          }),
          false,
          {
            type: 'notifications:show',
            notification,
          },
        )
      },

      showForPhoto(photoId: string) {
        const photo = photos[photoId]
        if (!photo) {
          return
        }

        get().show({
          duration: 5000,
          icon: photo.thumbnailPath,
          title: '¡Foto obtenida!',
        })
      },

      showForItem(itemId: string) {
        const item = inventory[itemId]
        if (!item || !item.prop.texture) {
          return
        }

        get().show({
          duration: 5000,
          icon: {
            spritesheet: item.prop.texture.spritesheet,
            frame: item.prop.texture.name,
            scale: item.scale,
            position: item.position,
          },
          title: `Has obtenido: ${item.name}`,
        })
      },

      remove(id: string) {
        set(
          (state) => {
            const idx = state.notifications.findIndex((n) => n.id === id)
            if (idx === -1) {
              return {}
            }

            return {
              notifications: [
                ...state.notifications.slice(0, idx),
                ...state.notifications.slice(idx + 1),
              ],
            }
          },
          false,
          { type: 'notifications:remove', id },
        )
      },
    }),
    { enabled: import.meta.env.DEV, name: 'notifications' },
  ),
  shallow,
)

export default useNotifications
