import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

const useCardsStore = createWithEqualityFn(
  (set) => ({
    openCard: null,
    toggleCard: (card) =>
      set((store) => {
        if (store.openCard?.name === card) {
          return { openCard: null }
        }

        return { openCard: { name: card, openedAt: new Date() } }
      }),
    close: (card) =>
      set((store) => {
        if (store.openCard?.name === card && Date.now() - +store.openCard.openedAt > 100) {
          return { openCard: null }
        }

        return {}
      }),
    open: (card) => set(() => ({ openCard: { name: card, openedAt: new Date() } })),
  }),
  shallow,
)

export default useCardsStore
