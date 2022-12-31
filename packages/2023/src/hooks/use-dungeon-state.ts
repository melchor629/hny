import createStore from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import serializer from './state-serializer'

type DoorIds =
  | 'door1'
  | 'door2'
  | 'door3'
  | 'door4'
  | 'door5'
  | 'door6'
  | 'doorNpc1'
  | 'doorNpc2'
  | 'doorCode1'
  | 'doorCode2'

interface State {
  doors: Record<DoorIds, { isOpen: boolean; hasFirstOpened: boolean }>
  brokenDoorTries: 0 | 1 | 2 | 3
  puzzle6: readonly [boolean, boolean]
  puzzle9: boolean
  epicBattleFinished: boolean
  tomeuQuelyState: 'rest' | 'back' | 'front' | 'gone'
  marinaState: 'rest' | 'working' | 'lookingAtYou' | 'pointingAtYou'
  marisaState: 'rest' | 'working' | 'lookingAtYou'
  puzzle17: 'closed' | 'opened' | 'completed'
  chrisState: 'rest' | 'sleep' | 'wakingUp'
  napGuyState: readonly [
    first: 'rest' | 'sleep' | 'wakingUp' | 'goAway',
    second: 'rest' | 'sleep' | 'wakingUp' | 'goAway',
  ]

  changeDoorOpenState(id: DoorIds, isOpen: boolean): void
  doBrokenDoorTry(): void
  puzzle6CodeAccepted(which: 0 | 1): void
  puzzle9Completed(): void
  epicBattleHasFinished(): void
  changeTomeuState(state: 'rest' | 'back' | 'front' | 'gone'): void
  changeMarinaState(state: 'rest' | 'working' | 'lookingAtYou' | 'pointingAtYou'): void
  changeMarisaState(state: 'rest' | 'working' | 'lookingAtYou'): void
  openClot(): void
  giveSpecialObjectToChris(): void
  changeChrisState(state: 'rest' | 'sleep' | 'wakingUp'): void
  changeNapGuyState(state: 'rest' | 'sleep' | 'wakingUp' | 'goAway', guy: 1 | 2): void
  reset(): void
}

const initialState = {
  doors: {
    door1: { isOpen: false, hasFirstOpened: false },
    door2: { isOpen: false, hasFirstOpened: false },
    door3: { isOpen: false, hasFirstOpened: false },
    door4: { isOpen: false, hasFirstOpened: false },
    door5: { isOpen: false, hasFirstOpened: false },
    door6: { isOpen: false, hasFirstOpened: false },
    doorNpc1: { isOpen: false, hasFirstOpened: false },
    doorNpc2: { isOpen: false, hasFirstOpened: false },
    doorCode1: { isOpen: false, hasFirstOpened: false },
    doorCode2: { isOpen: false, hasFirstOpened: false },
  },
  brokenDoorTries: 0 as 0,
  puzzle6: [false, false] as const,
  puzzle9: false,
  epicBattleFinished: false,
  tomeuQuelyState: 'rest' as const,
  marinaState: 'working' as const,
  marisaState: 'working' as const,
  puzzle17: 'closed' as const,
  chrisState: 'sleep' as const,
  napGuyState: ['sleep', 'sleep'] as const,
}

const useDungeonState = createStore(
  persist(
    devtools<State>(
      (set) => ({
        ...initialState,

        changeDoorOpenState(id, isOpen) {
          set(
            (state) => ({
              doors: {
                ...state.doors,
                [id]: {
                  ...state.doors[id],
                  isOpen,
                  hasFirstOpened: state.doors[id].hasFirstOpened || isOpen,
                },
              },
            }),
            false,
            { type: 'dungeon:change-door-open-state', id, isOpen },
          )
        },

        doBrokenDoorTry() {
          set(
            (state) => {
              if (state.brokenDoorTries < 3) {
                return { brokenDoorTries: (state.brokenDoorTries + 1) as 1 | 2 | 3 }
              }

              return {
                doors: {
                  ...state.doors,
                  door6: { ...state.doors.door6, isOpen: true, hasFirstOpened: true },
                },
              }
            },
            false,
            { type: 'dungeon:do-broken-door-try' },
          )
        },

        puzzle6CodeAccepted(which: 0 | 1) {
          set(
            (state) => ({
              puzzle6: which === 0 ? [true, state.puzzle6[1]] : [state.puzzle6[0], true],
            }),
            false,
            { type: 'dungeon:puzzle6-code-accepted', which },
          )
        },

        puzzle9Completed() {
          set(
            () => ({
              puzzle9: true,
            }),
            false,
            { type: 'dungeon:puzzle9-completed' },
          )
        },

        epicBattleHasFinished() {
          set(() => ({ epicBattleFinished: true }), false, {
            type: 'dungeon:epic-battle-has-finished',
          })
        },

        changeTomeuState(state) {
          set(() => ({ tomeuQuelyState: state }), false, {
            type: 'dungeon:change-tomeu-quely-state',
            state,
          })
        },

        changeMarinaState(state) {
          set(() => ({ marinaState: state }), false, {
            type: 'dungeon:change-marina-state',
            state,
          })
        },

        changeMarisaState(state) {
          set(() => ({ marisaState: state }), false, {
            type: 'dungeon:change-marisa-state',
            state,
          })
        },

        openClot() {
          set(() => ({ puzzle17: 'opened' }), false, {
            type: 'dungeon:open-clot',
          })
        },

        giveSpecialObjectToChris() {
          set(() => ({ puzzle17: 'completed' }), false, {
            type: 'dungeon:give-special-object-to-chris',
          })
        },

        changeChrisState(state) {
          set(() => ({ chrisState: state }), false, {
            type: 'dungeon:change-chris-state',
            state,
          })
        },

        changeNapGuyState(state, guy) {
          set(
            ({ napGuyState: [f, s] }) => ({ napGuyState: guy === 1 ? [state, s] : [f, state] }),
            false,
            {
              type: 'dungeon:change-nap-guy-state',
              state,
              guy,
            },
          )
        },

        reset() {
          set(() => initialState, false, { type: 'dungeon:reset' })
        },
      }),
      { enabled: process.env.NODE_ENV !== 'production', name: 'dungeon-state' },
    ),
    {
      name: 'fan:2023:dungeon',
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([, value]) => typeof value !== 'function'),
        ),
      ...serializer,
    },
  ),
)

export default useDungeonState
