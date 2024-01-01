import { devtools, persist } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import serializer from './state-serializer'
import useNotifications from './use-notifications'

type Tab = 'book' | 'items' | 'controls' | 'about'

export interface State {
  isOpen: boolean
  tab: Tab
  book: Array<{ id: string; discovered: boolean; opened: boolean }>
  inventory: Array<{ id: string; count: number }>
  inventoryNumbers: readonly [number, number]

  open(tab?: Tab): void
  close(): void
  nextTab(): void
  previousTab(): void
  changeTab(tab: Tab): void
  discoverPhoto(id: string): void
  addToInventory(id: string): void
  removeFromInventory(id: string, count?: number): void
  markPhotoAsOpened(id: string): void
  reset(): void
  complete(): void
}

const stateTransitions = ['book', 'items', 'controls', 'about'] as const

const initialState = {
  isOpen: false,
  tab: 'book' as const,
  book: [
    { id: 'photo-1', discovered: false, opened: false },
    { id: 'photo-2', discovered: false, opened: false },
    { id: 'photo-3', discovered: false, opened: false },
    { id: 'photo-4', discovered: false, opened: false },
    { id: 'photo-5', discovered: false, opened: false },
    { id: 'photo-6', discovered: false, opened: false },
    { id: 'photo-7', discovered: false, opened: false },
    { id: 'photo-8', discovered: false, opened: false },
    { id: 'photo-9', discovered: false, opened: false },
    { id: 'photo-10', discovered: false, opened: false },
    { id: 'photo-11', discovered: false, opened: false },
    { id: 'photo-12', discovered: false, opened: false },
    { id: 'photo-13', discovered: false, opened: false },
    { id: 'photo-14', discovered: false, opened: false },
    // didn't expect to have too many photos :/
    { id: 'photo-22', discovered: false, opened: false },
    { id: 'photo-15', discovered: false, opened: false },
    { id: 'photo-16', discovered: false, opened: false },
    { id: 'photo-17', discovered: false, opened: false },
    { id: 'photo-18', discovered: false, opened: false },
    { id: 'photo-19', discovered: false, opened: false },
    { id: 'photo-20', discovered: false, opened: false },
    { id: 'photo-21', discovered: false, opened: false },
    { id: 'special-1', discovered: false, opened: false },
    { id: 'special-2', discovered: false, opened: false },
    { id: 'special-3', discovered: false, opened: false },
  ],
  inventory: [],
  inventoryNumbers: [-1, -1] as const,
}

const useInventory = createWithEqualityFn(
  persist(
    devtools<State>(
      (set) => ({
        ...initialState,

        open(tab) {
          set(
            (state) => ({
              isOpen: true,
              tab: tab ?? state.tab,
              inventoryNumbers: [
                Math.trunc((Math.random() * 7) / 2),
                Math.trunc((Math.random() * 7) / 2),
              ],
            }),
            false,
            { type: 'inventory:open', tab },
          )
        },

        close() {
          set(() => ({ isOpen: false }), false, { type: 'inventory:close' })
        },

        nextTab() {
          set(
            (state) => {
              const idx = stateTransitions.indexOf(state.tab)
              return { tab: stateTransitions[Math.min(stateTransitions.length - 1, idx + 1)] }
            },
            false,
            { type: 'inventory:next-tab' },
          )
        },

        previousTab() {
          set(
            (state) => {
              const idx = stateTransitions.indexOf(state.tab)
              return { tab: stateTransitions[Math.max(0, idx - 1)] }
            },
            false,
            { type: 'inventory:previous-tab' },
          )
        },

        changeTab(tab: Tab) {
          set(() => ({ tab }), false, { type: 'inventory:change-tab' })
        },

        discoverPhoto(id: string) {
          set(
            (state) => {
              const index = state.book.findIndex((i) => i.id === id)
              if (index === -1) return {}

              useNotifications.getState().showForPhoto(id)
              return {
                book: [
                  ...state.book.slice(0, index),
                  { ...state.book[index], discovered: true },
                  ...state.book.slice(index + 1),
                ],
              }
            },
            false,
            { type: 'inventory:discover-photo', id },
          )
        },

        addToInventory(id: string) {
          set(
            (state) => {
              useNotifications.getState().showForItem(id)
              const index = state.inventory.findIndex((i) => i.id === id)
              if (index === -1) {
                return {
                  inventory: [...state.inventory, { id, count: 1 }],
                }
              }

              return {
                inventory: [
                  ...state.inventory.slice(0, index),
                  { ...state.inventory[index], count: state.inventory[index].count + 1 },
                  ...state.inventory.slice(index + 1),
                ],
              }
            },
            false,
            { type: 'inventory:add-to-inventory', id },
          )
        },

        removeFromInventory(id, count) {
          set(
            (state) => {
              const index = state.inventory.findIndex((i) => i.id === id)
              if (index === -1) {
                return {}
              }

              return {
                inventory: [
                  ...state.inventory.slice(0, index),
                  { ...state.inventory[index], count: state.inventory[index].count - (count ?? 1) },
                  ...state.inventory.slice(index + 1),
                ],
              }
            },
            false,
            { type: 'inventory:remove-from-inventory', id, count },
          )
        },

        markPhotoAsOpened(id) {
          set(
            (state) => {
              const index = state.book.findIndex((i) => i.id === id)
              if (index === -1) return {}

              return {
                book: [
                  ...state.book.slice(0, index),
                  { ...state.book[index], opened: true },
                  ...state.book.slice(index + 1),
                ],
              }
            },
            false,
            { type: 'inventory:mark-photo-as-opened', id },
          )
        },

        reset() {
          set(() => initialState, false, { type: 'inventory:reset' })
        },

        complete() {
          set(
            (state) => ({
              book: state.book.map((p) =>
                p.id.startsWith('photo-') ? { ...p, discovered: true } : p,
              ),
            }),
            false,
            { type: 'inventory:complete' },
          )
        },
      }),
      { enabled: import.meta.env.DEV, name: 'inventory' },
    ),
    {
      name: 'fan:2023:inventory',
      partialize: (state) => ({ book: state.book, inventory: state.inventory }),
      ...serializer,
    },
  ),
  shallow,
)

export default useInventory
