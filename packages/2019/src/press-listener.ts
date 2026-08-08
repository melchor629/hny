type EventType<
  Elem extends Element | Document,
  EventKey extends keyof (Elem extends Element ? HTMLElementEventMap : DocumentEventMap),
> = Elem extends Element
  ? EventKey extends keyof HTMLElementEventMap
    ? HTMLElementEventMap[EventKey]
    : never
  : EventKey extends keyof DocumentEventMap
    ? DocumentEventMap[EventKey]
    : never

export class EventListener<
  const Elem extends Element | Document,
  const EventKey extends keyof (Elem extends Element ? HTMLElementEventMap : DocumentEventMap) &
    string,
> {
  private callback: ((this: Elem, e: EventType<Elem, EventKey>) => any) | undefined
  private _times: number = 0

  constructor(
    private readonly elem: Elem,
    private readonly event: EventKey,
  ) {
    this._timesImpl = this._timesImpl.bind(this)
  }

  public once(callback: (this: Elem, e: EventType<Elem, EventKey>) => any) {
    this.times(callback, 1)
  }

  public oncePromise(): Promise<EventType<Elem, EventKey>> {
    return new Promise((resolve) => {
      this.once((e) => resolve(e))
    })
  }

  public times(callback: (this: Elem, e: EventType<Elem, EventKey>) => any, times: number) {
    this.callback = callback
    this._times = times
    this.elem.addEventListener(this.event, this._timesImpl, false)
  }

  public forever(callback: (this: Elem, e: EventType<Elem, EventKey>) => any) {
    this.times(callback, Infinity)
  }

  public cancel() {
    this._times = 0
    this.elem.removeEventListener(this.event, this._timesImpl, false)
  }

  public _timesImpl(e: Event) {
    this.callback?.call(this.elem, e as EventType<Elem, EventKey>)
    this._times -= 1
    if (this._times === 0) {
      this.elem.removeEventListener(this.event, this._timesImpl, false)
    }
  }
}

export class PressListener<const Elem extends Element | Document> extends EventListener<
  Elem,
  'touchstart' | 'mousedown'
> {
  private static event =
    'ontouchstart' in window || navigator.maxTouchPoints
      ? ('touchstart' as const)
      : ('mousedown' as const)

  constructor(elem: Elem) {
    super(elem, PressListener.event)
  }
}
