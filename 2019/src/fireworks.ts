import anime from 'animejs';

import Color from './color';
import { IFireworks, FireworkEvents } from './fireworks.interfaces'
import { PressListener } from './press-listener';

interface Point {
    x: number;
    y: number;
}

interface Particule extends Point {
    color: Color;
    radius: number;
    bigRadius: number;
    endPos: Point;
    draw: (this: Particule, ctx: CanvasRenderingContext2D) => void;
}

interface Circle extends Point {
    color: Color;
    radius: number;
    alpha: number;
    lineWidth: number;
    draw: (this: Circle, ctx: CanvasRenderingContext2D) => void;
}

interface Trail extends Point {
    trail: Point[];
    t: number;
    easing: string;
    draw: (this: Trail, ctx: CanvasRenderingContext2D) => void;
}

function setParticuleDirection(p: Point): Point {
    var angle = anime.random(0, 360) * Math.PI / 180;
    var value = anime.random(50, 180);
    var radius = [-1, 1][anime.random(0, 1)] * value;
    return {
        x: p.x + radius * Math.cos(angle),
        y: p.y + radius * Math.sin(angle)
    }
}

function createParticule(x: number, y: number, color: Color): Particule {
    const particule: Particule = {
        x,
        y,
        color,
        radius: 0.001,
        bigRadius: anime.random(16, 32),
        endPos: setParticuleDirection({ x, y }),
        draw: function(ctx) {
            if(Math.abs(this.radius) > 0.01) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
                ctx.fillStyle = this.color.toHex();
                ctx.fill();
            }
        },
    };
    particule.draw = particule.draw.bind(particule);
    return particule;
}

function createCircle(x: number, y: number): Circle {
    const circle: Circle = {
        x,
        y,
        color: Color.hex('#FFF'),
        radius: 0.01,
        alpha: 0.5,
        lineWidth: 6,
        draw: function(ctx) {
            if(Math.abs(this.radius) > 0.01) {
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
                ctx.lineWidth = this.lineWidth;
                ctx.strokeStyle = this.color.toHex();
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        },
    };
    circle.draw = circle.draw.bind(circle);
    return circle;
}

function createTrail(x: number, y: number): Trail {
    const final = { x, y };
    const trail: Trail = {
        x: x + (Math.random() < 0.5 ? -1 : 1) * anime.random(0.3 * window.innerWidth, 0.1 * window.innerWidth),
        y: window.innerHeight + anime.random(5, 105),
        trail: [],
        t: 0,
        easing: Math.random() < 0.35 ? 'easeOutBack' : (Math.random() < 0.35 ? 'easeOutCirc' : 'linear'),
        draw: function(ctx) {
            const t = anime.easings[this.easing](this.t);
            const posX = this.t * (x - this.x) + this.x;
            const posY = t * (y - this.y) + this.y;

            if(Math.abs(posX - x) < 0.01 && Math.abs(posY - y) < 0.01) {
                return;
            }

            if(this.trail.length > 2) {
                ctx.beginPath();
                ctx.lineWidth = 4;
                ctx.strokeStyle = '#dda';
                ctx.moveTo(posX, posY);
                for(let pos of this.trail) {
                    ctx.lineTo(pos.x, pos.y);
                }
                ctx.stroke();
            }

            this.trail = [ { x: posX, y: posY }, ...this.trail.slice(0, 20) ];
        }
    };
    trail.draw = trail.draw.bind(trail);
    return trail;
}

const frandom = (min: number, max: number): number => Math.random() * (max - min) + min;

console.log('Fireworks animation adapted from http://animejs.com/documentation/assets/js/fireworks.js');
export class Fireworks implements IFireworks {

    private ctx: CanvasRenderingContext2D;
    private pointer: [number, number] = [0, 0];
    private clearCanvas: anime.AnimeInstance;
    private pixelRatio: number = Fireworks._pixelRatio();
    private pressListener = new PressListener(document);

    private static _pixelRatio() {
        const ctx = <any>document.createElement('canvas').getContext('2d')!;
        const dpr = window.devicePixelRatio || 1;
        const bsr = ctx['webkitBackingStorePixelRatio'] ||
            ctx['mozBackingStorePixelRatio'] ||
            ctx['msBackingStorePixelRatio'] ||
            ctx['oBackingStorePixelRatio'] ||
            ctx['backingStorePixelRatio'] || 1;

        return dpr / bsr;
    }

    constructor(private canvasEl: HTMLCanvasElement,
                private readonly numberOfParticules?: number,
                private readonly colors: Color[] = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'].map(Color.hex)) {
        this.ctx = canvasEl.getContext('2d');
        this.numberOfParticules = this.numberOfParticules || 40;

        this.renderTimeline = this.renderTimeline.bind(this);
        this.setCanvasSize = this.setCanvasSize.bind(this);
        this.onPress = this.onPress.bind(this);

        window.addEventListener('resize', this.setCanvasSize, false);

        this.clearCanvas = anime({
            duration: Infinity,
            targets: [],
            update: () => {
                this.ctx.clearRect(0, 0, this.pixelRatio * canvasEl.width, this.pixelRatio * canvasEl.height);
            },
            autoplay: false,
        });

        requestAnimationFrame(this.setCanvasSize);
    }

    public startListening() {
        this.pressListener.forever(this.onPress);
    }

    public destroy() {
        document.removeEventListener('resize', this.setCanvasSize, false);
        this.pressListener.cancel();
        this.clearCanvas.pause();
    }

    public throwFirework(x: number, y: number): FireworkEvents {
        this.clearCanvas.play();

        const circle = createCircle(x, y);
        const particules = [];
        const color = this.colors[anime.random(0, this.colors.length - 1)];
        for(let i = 0; i < this.numberOfParticules; i++) {
            const randomOffsetColor = Color.rgb(frandom(-0.2, 0.2),
                                                frandom(-0.2, 0.2),
                                                frandom(-0.2, 0.2));
            particules.push(createParticule(x, y, color.add(randomOffsetColor)));
        }

        const trail = createTrail(x, y);
        const dist = Math.sqrt(Math.pow(trail.x - x, 2) + Math.pow(trail.y - y, 2));
        const fiumTime = (dist / 400) * anime.random(700, 1400);
        const events: FireworkEvents = {};

        anime.timeline()
        .add({
            targets: [ trail ],
            t: 1,
            duration: fiumTime,
            easing: 'easeOutExpo',
            update: this.renderTimeline,
        })
        .add({
            targets: particules,
            radius: (p: Particule) => p.bigRadius,
            easing: 'easeInExpo',
            update: this.renderTimeline,
            duration: 0.2,
            complete: () => events.explode && events.explode(),
        })
        .add({
            targets: particules,
            x: (p: Particule) => p.endPos.x,
            y: (p: Particule) => p.endPos.y,
            radius: 0.1,
            duration: anime.random(1200, 1800),
            easing: 'easeOutExpo',
            update: this.renderTimeline,
        })
        .add({
            targets: circle,
            radius: anime.random(80, 160),
            lineWidth: 0,
            alpha: {
                value: 0,
                easing: 'linear',
                duration: anime.random(600, 800),
            },
            duration: anime.random(1200, 1800),
            easing: 'easeOutExpo',
            update: this.renderTimeline,
            offset: fiumTime,
        });

        return events;
    }

    private onPress(e: MouseEvent | TouchEvent) {
        this.updateCoords(e);
        this.throwFirework(this.pointer[0], this.pointer[1]);
    }

    private setCanvasSize() {
        this.canvasEl.width = Math.trunc(window.innerWidth * this.pixelRatio);
        this.canvasEl.height = Math.trunc(window.innerHeight * this.pixelRatio);
        this.canvasEl.style.width = `${window.innerWidth}px`;
        this.canvasEl.style.height = `${window.innerHeight}px`;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }

    private updateCoords(e: MouseEvent | TouchEvent) {
        if(e instanceof MouseEvent) {
            this.pointer = [ e.clientX, e.clientY ];
        } else {
            this.pointer = [ e.touches[0].clientX, e.touches[0].clientY ];
        }
    }

    private renderTimeline(anim: anime.AnimeInstance) {
        for(let animatable of anim.animatables) {
            (<any>animatable).target.draw(this.ctx);
        }
    }

}