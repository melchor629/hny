export class EventListener<EventType extends Event = Event> {

    private callback: (this: Element, e: EventType) => any;
    private _times: number = 0;

    constructor(private elem: Element | Document, private event: string) {
        this._timesImpl = this._timesImpl.bind(this);
    }

    public once(callback: (this: Element, e: EventType) => any) {
        this.times(callback, 1);
    }

    public oncePromise(): Promise<EventType> {
        return new Promise(resolve => {
            this.once(e => resolve(e));
        });
    }

    public times(callback: (this: Element, e: EventType) => any, times: number) {
        this.callback = callback;
        this._times = times;
        this.elem.addEventListener(this.event, this._timesImpl, false);
    }

    public forever(callback: (this: Element, e: EventType) => any) {
        this.times(callback, Infinity);
    }

    public cancel() {
        this._times = 0;
        this.elem.removeEventListener(this.event, this._timesImpl, false);
    }

    public _timesImpl(e: EventType) {
        this.callback.call(e.target, e);
        this._times -= 1;
        if(this._times === 0) {
            this.elem.removeEventListener(this.event, this._timesImpl, false);
        }
    }
}

export class PressListener extends EventListener<TouchEvent | MouseEvent> {

    private static event = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';

    constructor(elem: Element | Document) {
        super(elem, PressListener.event);
    }

}