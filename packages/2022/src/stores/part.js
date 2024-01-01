import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

const usePartStore = createWithEqualityFn(
  (set) => ({
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
  }),
  shallow,
)

export default usePartStore
