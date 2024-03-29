import { devtools, persist } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import serializer from './state-serializer'

interface State {
  intro: boolean
  finalPhoto: boolean
  dungeonOpen: boolean
  ending: boolean

  introDone(): void
  showFinalPhoto(showEnding?: boolean): void
  openDungeon(): void
  endingDone(): void
  reset(): void
}

const initialState = {
  intro: false,
  finalPhoto: false,
  dungeonOpen: false,
  ending: false,
}

const useAcademiaRoomState = createWithEqualityFn(
  persist(
    devtools<State>(
      (set) => ({
        ...initialState,

        introDone() {
          set(
            () => ({
              intro: true,
            }),
            false,
            { type: 'academia-room:intro-done' },
          )
        },

        showFinalPhoto(showEnding: boolean = true) {
          set(() => ({ finalPhoto: true, ending: !showEnding }), false, {
            type: 'academia-room:show-final-photo',
          })
        },

        openDungeon() {
          set(() => ({ dungeonOpen: true }), false, { type: 'academia-room:open-dungeon' })
        },

        endingDone() {
          set(() => ({ ending: true }), false, { type: 'academia-room:ending-done' })
        },

        reset() {
          set(() => initialState, false, { type: 'academia-room:reset' })
        },
      }),
      { enabled: import.meta.env.DEV, name: 'academia-room-state' },
    ),
    {
      name: 'fan:2023:academia-room',
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([, value]) => typeof value !== 'function'),
        ),
      ...serializer,
    },
  ),
  shallow,
)

export default useAcademiaRoomState
