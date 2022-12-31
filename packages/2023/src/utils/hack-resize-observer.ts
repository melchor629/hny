// why this? you may ask
// react-three-fiber does not support disabling the use of react-use-measure hook
// but I don't need it, so I moked the ResizeObserver
// still does weird things but the value from the observer should prevail
export default class HackResizeObserver {
  static #rect: { w: number; h: number } = { w: 100, h: 100 }

  static #refs: HackResizeObserver[] = []

  #fn: ResizeObserverCallback

  #elements: HTMLElement[] = []

  constructor(fn: ResizeObserverCallback) {
    this.#fn = fn
    HackResizeObserver.#refs.push(this)
  }

  disconnect() {
    HackResizeObserver.#refs.splice(HackResizeObserver.#refs.indexOf(this), 1)
  }

  unobserve(element: HTMLElement) {
    this.#elements.splice(this.#elements.indexOf(element), 1)
  }

  observe(element: HTMLElement) {
    this.#elements.push(element)
    this.#pushChange()
  }

  #pushChange() {
    this.#elements.forEach((element) =>
      this.#fn(
        [
          {
            borderBoxSize: [],
            contentBoxSize: [],
            contentRect: {
              bottom: HackResizeObserver.#rect.h,
              height: HackResizeObserver.#rect.h,
              left: 0,
              right: HackResizeObserver.#rect.w,
              top: 0,
              x: 0,
              y: 0,
              width: HackResizeObserver.#rect.w,
              toJSON() {},
            },
            devicePixelContentBoxSize: [],
            target: element,
          },
        ],
        this as any,
      ),
    )
  }

  static resize(w: number, h: number) {
    HackResizeObserver.#rect = { w, h }
    HackResizeObserver.#refs.forEach((ref) => ref.#pushChange())
  }
}
