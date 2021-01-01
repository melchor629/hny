import create from 'zustand'

const usePhasesStore = create((set) => ({
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
}))

export default usePhasesStore
