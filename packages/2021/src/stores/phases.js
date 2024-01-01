import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

const usePhasesStore = createWithEqualityFn(
  (set) => ({
    phase: 1,
    start: async () => {
      const wait = (t) => new Promise((resolve) => setTimeout(resolve, t))

      await wait(1000)
      await new Promise((resolve) => requestAnimationFrame(resolve))
      set({ phase: 2 })

      await wait(2500)
      set({ phase: 3 })

      await wait(1500)
      set({ phase: 4 })
    },
  }),
  shallow,
)

export default usePhasesStore
