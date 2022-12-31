export type InputKey = 'up' | 'down' | 'left' | 'right' | 'interact' | 'cancel-interact'

export type InputSource = 'keyboard' | 'touch' | 'gamepad'

export type Focus = 'player' | 'dialog' | 'inventory' | 'menu' | 'nothing'

export interface InputHandlers {
  press?: (key: InputKey, source: InputSource) => void
  release?: (key: InputKey, source: InputSource) => void
}

export interface InputHandlerScoped<F extends Focus | undefined> {
  forKey(key: InputKey): {
    subscribe(handlers: InputHandlers): () => void
    once(handlers: InputHandlers): () => void
  }
  readonly focus: F extends Focus ? (arg: Focus) => void : () => void
  blur(): void
  readonly focusTarget: Focus
  onFocusChange(fn: (focus: Focus) => void): () => void
  showTouchBack(): () => void
}

export interface InputHandlerContextType {
  forFocus(focus: Focus): InputHandlerScoped<undefined>
  forGlobal(): InputHandlerScoped<Focus>
}

interface HandlerType {
  fn(key: InputKey, source: InputSource): void
  for?: Focus
}

export interface InputHandlerState {
  pressCallbacks: Record<InputKey, HandlerType[]>
  releaseCallbacks: Record<InputKey, HandlerType[]>
  focusCallbacks: Array<{ fn: (focus: Focus) => void }>
  lastInputSource: InputSource
  focus: Focus
}

export interface InputAbstractionFunctions {
  press: Record<InputKey, (source: InputSource) => void>
  release: Record<InputKey, (source: InputSource) => void>
}
