import { createContext, PropsWithChildren, useMemo, useRef, useState } from 'react'
import GamepadInputHandler from './gamepad-input-handler'
import KeyboardInputHandler from './keyboard-input-handler'
import TouchInputHandler from './touch-input-handler'
import type {
  InputHandlerContextType,
  InputHandlerState,
  InputHandlers,
  InputKey,
  InputAbstractionFunctions,
  InputSource,
  Focus,
  InputHandlerScoped,
} from './types'

export const context = createContext<InputHandlerContextType | null>(null)
function removeValue<T, A extends Array<{ fn: T }>>(array: A, value: T): A {
  const idx = array.findIndex((h) => h.fn === value)
  if (idx !== -1) {
    array.splice(idx, 1)
  }

  return array
}

function initState(stateRef: { current?: InputHandlerState }): InputHandlerState {
  stateRef.current ??= {
    pressCallbacks: {
      'cancel-interact': [],
      down: [],
      interact: [],
      left: [],
      right: [],
      up: [],
    },
    releaseCallbacks: {
      'cancel-interact': [],
      down: [],
      interact: [],
      left: [],
      right: [],
      up: [],
    },
    focusCallbacks: [],
    lastInputSource: navigator.maxTouchPoints > 0 ? 'touch' : 'keyboard',
    focus: 'player',
  }
  return stateRef.current
}

export default function InputHandler({ children }: PropsWithChildren) {
  const stateRef = useRef<InputHandlerState>(undefined)
  const [showTouchBack, setShowTouchBack] = useState(false)

  const contextValue = useMemo((): InputHandlerContextType => {
    const changeFocus = (focus: Focus) => {
      const state = initState(stateRef)
      state.focus = focus
      state.focusCallbacks.forEach(({ fn }) => fn(focus))
    }

    function handler<T extends Focus | undefined>(
      focus: T,
    ): InputHandlerScoped<T extends undefined ? Focus : undefined> {
      return {
        forKey: (key) => ({
          subscribe(handlers) {
            const state = initState(stateRef)
            const entries = Object.entries(handlers) as [
              keyof InputHandlers,
              InputHandlers[keyof InputHandlers],
            ][]
            for (const [event, fn] of entries) {
              if (fn) {
                state[`${event}Callbacks`][key].push({
                  fn,
                  for: focus,
                })
              }
            }

            return () => {
              for (const [event, fn] of entries) {
                if (fn) {
                  state[`${event}Callbacks`][key] = removeValue(state[`${event}Callbacks`][key], fn)
                }
              }
            }
          },
          once(handlers) {
            let ret: (() => void) | null = null
            ret = this.subscribe(
              Object.fromEntries(
                Object.entries(handlers).map(([event, fn]) => [
                  event,
                  (key: InputKey, source: InputSource) => {
                    fn(key, source)
                    ret?.()
                  },
                ]),
              ),
            )

            return ret
          },
        }),
        focus(arg?: Focus) {
          changeFocus(focus ?? arg ?? 'player')
        },
        blur() {
          changeFocus('player')
        },
        get focusTarget() {
          return initState(stateRef).focus
        },
        onFocusChange(fn) {
          const state = initState(stateRef)
          state.focusCallbacks.push({ fn })
          setTimeout(() => fn(state.focus))
          return () => {
            state.focusCallbacks = removeValue(state.focusCallbacks, fn)
          }
        },
        showTouchBack() {
          setShowTouchBack(true)
          return () => setShowTouchBack(false)
        },
      }
    }

    return {
      forFocus: handler,
      forGlobal: () => handler(undefined),
    }
  }, [])

  const handlerFns = useMemo((): InputAbstractionFunctions => {
    const inputKeys = ['up', 'down', 'left', 'right', 'interact', 'cancel-interact'] as const
    const modes = ['press', 'release'] as const
    return Object.fromEntries(
      modes.map(
        (mode) =>
          [
            mode,
            Object.fromEntries(
              inputKeys.map(
                (inputKey) =>
                  [
                    inputKey,
                    (source: InputSource) => {
                      const focus = stateRef.current?.focus
                      stateRef.current?.[`${mode}Callbacks`][inputKey]
                        .filter((h) => !h.for || h.for === focus)
                        .forEach(({ fn }) => fn(inputKey, source))
                    },
                  ] as const,
              ),
            ),
          ] as const,
      ),
    ) as any
  }, [])

  return (
    <context.Provider value={contextValue}>
      {children}

      <GamepadInputHandler fns={handlerFns} />
      <KeyboardInputHandler fns={handlerFns} />
      <TouchInputHandler fns={handlerFns} showTouchBack={showTouchBack} />
    </context.Provider>
  )
}
