import { devtools } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import type { Scenarios } from '../types/scenario'

interface State {
  readonly loading: boolean
  readonly scenario: Scenarios | null
  readonly previousScenario: Scenarios | null
  readonly nextScenario: Scenarios | null

  change(scenario: Scenarios): void
  load(): void
  loaded(): void
  isLoading(scenario: Scenarios): boolean
}

const useScenario = createWithEqualityFn(
  devtools<State>(
    (set, get) => ({
      loading: false,
      scenario: null,
      previousScenario: null,
      nextScenario: null,

      change(scenario) {
        set(() => ({ loading: true, nextScenario: scenario }), false, {
          type: 'scenario:change',
          scenario,
        })
      },

      load() {
        set(
          (state) => ({
            previousScenario: state.scenario,
            scenario: state.nextScenario,
            nextScenario: null,
          }),
          false,
          { type: 'scenario:load' },
        )
      },

      loaded() {
        // give some time to fully finalize loading in the GPU side
        // but also prevent the code in the scenario to call this function again
        set((state) => ({ nextScenario: state.scenario }), false, {
          type: 'scenario:almost-loaded',
        })
        // wait one frame just in case (as per above note)
        requestAnimationFrame(() =>
          set(() => ({ loading: false, nextScenario: null }), false, { type: 'scenario:loaded' }),
        )
      },

      isLoading(scenario: Scenarios) {
        const state = get()
        return state.loading && state.scenario === scenario && state.nextScenario === null
      },
    }),
    { enabled: import.meta.env.DEV, name: 'scenario' },
  ),
  shallow,
)

export default useScenario
