import create from 'zustand'

const usePartStore = create((set) => ({
  selectedPart: null,
  selectedPartTrackInfo: null,
  allVisited: false,

  selectPart: (part) => set(() => ({ selectedPart: part })),
  unselectPart: () => set(() => ({ selectedPart: null, selectedPartTrackInfo: null })),
  setTrackInfo: (trackInfo) =>
    set(({ selectedPart }) => ({
      selectedPartTrackInfo: selectedPart && trackInfo,
    })),
  markAllVisited: () => set(() => ({ allVisited: true })),
}))

export default usePartStore
