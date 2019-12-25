import anime from "animejs";

export function randomPosOnScreen(marginX: number = 50, marginY: number = 50) {
    return [ anime.random(marginX, window.innerWidth - marginX), anime.random(marginY, window.innerHeight - marginY) ];
}

export function centerElementOn(x: number, y: number, element: HTMLElement, scale: number = 1) {
    const { width, height } = element.getBoundingClientRect();
    element.style.left = `${x - (width / 2 / scale)}px`;
    element.style.top = `${y - (height / 2 / scale)}px`;
}

export function wait(time: number): Promise<void> {
    return new Promise(resolve => setTimeout(() => resolve(), time));
}

export function* zip<T>(...iterators: Array<T[]>) {
    const length = iterators.reduce((prev, iterator) => Math.min(prev, iterator.length), Infinity);
    for(let i = 0; i < length; i++) {
        yield iterators.map(iterator => iterator[i]);
    }
}