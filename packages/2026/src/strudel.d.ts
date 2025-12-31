declare module '@strudel/web' {
  interface InitStrudelOptions {
    prebake?: () => void | Promise<void>
  }

  export function initStrudel(options?: InitStrudelOptions): Promise<void>

  export function evaluate(code: string, autoplay?: boolean): Promise<void>

  export function hush(): void

  export function samples(url: string): Promise<void>

  export function ref<T>(fn: () => T): unknown
}
