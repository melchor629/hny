import create from 'zustand'

const useCardsStore = create((set) => ({
  openCard: null,
  toggleCard: (card) => set((store) => ({ openCard: store.openCard === card ? null : card })),
  close: () => set(() => ({ openCard: null })),
  open: (card) => set(() => ({ openCard: card })),
}))

export default useCardsStore
