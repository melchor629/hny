import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { animalKeys, type AnimalKey } from './animals'

type GameState = Readonly<{
  stageReady: boolean
  stage: 'text' | 'animals' | 'vibing'
  animalKey: AnimalKey | null
  visitedAnimalKeys: ReadonlyArray<AnimalKey>

  nextRandomAnimal: () => void
  showAnimal: (key: AnimalKey) => void
  markStageReady: () => void
  toggleObserveStage: () => void
}>

const useGameState = create(
  persist(
    devtools<GameState>((set, get) => ({
      stageReady: false,
      stage: 'text',
      animalKey: null,
      visitedAnimalKeys: [],

      nextRandomAnimal: () => {
        const { visitedAnimalKeys, animalKey } = get()
        let newAnimalKey: AnimalKey
        do {
          const randomIndex = Math.trunc(Math.random() * animalKeys.length)
          newAnimalKey = animalKeys[randomIndex]
        } while (newAnimalKey === animalKey)
        set(
          {
            animalKey: newAnimalKey,
            visitedAnimalKeys: Array.from(new Set(visitedAnimalKeys).add(newAnimalKey)),
          },
          false,
          { type: 'next-random-animal' },
        )
      },
      showAnimal: (key) => {
        const { visitedAnimalKeys } = get()
        if (visitedAnimalKeys.includes(key)) {
          set(
            {
              animalKey: key,
            },
            false,
            { type: 'show-animal' },
          )
        }
      },
      markStageReady: () => {
        set({ stageReady: true }, false, { type: 'mark-stage-ready' })
      },
      toggleObserveStage: () => {
        const { stage } = get()
        if (stage === 'animals') {
          set({ stage: 'vibing' }, false, { type: 'set-vibing-mode' })
        } else if (stage === 'vibing') {
          set({ stage: 'animals' }, false, { type: 'set-animals-mode' })
        }
      },
    })),
    {
      name: 'me.melchor9000.2025',
      partialize: (state) => ({ ...state, stageReady: undefined }),
    },
  ),
)

export default useGameState
