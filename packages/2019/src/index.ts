import 'core-js/stable';
import 'regenerator-runtime/runtime';
import anime from 'animejs';

import { EventListener, PressListener } from './press-listener';
import { wait, randomPosOnScreen } from './utils';

import './styles.scss';

let PreTextsAnimation: typeof import('./texts').PreTextsAnimation;
let HappyNewYearAnimation: typeof import('./texts').HappyNewYearAnimation;
let Fireworks: typeof import('./fireworks').Fireworks;

import('./fireworks').then(({ Fireworks: FireworksImpl }) => {
    Fireworks = FireworksImpl;
}).catch((reason) => console.error(reason));
import('./texts').then(({ HappyNewYearAnimation: Impl1, PreTextsAnimation: Impl2 }) => {
    HappyNewYearAnimation = Impl1;
    PreTextsAnimation = Impl2;
}).catch((reason) => console.error(reason));


const F = (e: KeyboardEvent) => {
    if(e.key.toLowerCase() === 'f') {
        window.open('/2018', '_blank');
        console.log('Respects paid');
    }
};

function enterFullscreen(): Promise<void> {
    const elem = document.querySelector('body');
    if(elem.requestFullscreen) {
        return elem.requestFullscreen();
    } else if((<any>elem).webkitRequestFullscreen) {
        (<any>elem).webkitRequestFullscreen();
        //Suppose it is Safari on macOS, fullscreen animation takes almost 1s
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
    return Promise.resolve();
}

function start(e: Event) {
    anime({
        targets: '.anime.intro',
        opacity: 0,
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: (anim) => (<any>anim.animatables[0]).target.style.visibility = 'hidden',
    });

    const func = async () => {
        const canvas: HTMLCanvasElement = document.querySelector('canvas#fireworks');
        const fireworks = new Fireworks(canvas);
        const texts = new PreTextsAnimation(fireworks);
        const hny = new HappyNewYearAnimation(fireworks, canvas);

        await wait(500);
        await texts.animate();

        const clicker = new PressListener(document);
        for(let i = anime.random(3, 10); i > 0; i--) {
            const e = await clicker.oncePromise();
            if(e instanceof MouseEvent) {
                fireworks.throwFirework(e.clientX, e.clientY);
            } else {
                for(let i = 0; i < e.touches.length; i++) {
                    fireworks.throwFirework(e.touches[i].clientX, e.touches[i].clientY);
                }
            }
        }

        await wait(anime.random(10, 490));
        fireworks.startListening();
        {
            const [ x, y ] = randomPosOnScreen();
            fireworks.throwFirework(x, y);
        }

        await wait(anime.random(990, 1990));
        await hny.animate();

        await wait(anime.random(100, 2345));
        await modoFiesta(fireworks);
    };

    enterFullscreen().then(func, func);
}

async function modoFiesta(fireworks: any) {
    while(true) {
        await wait(anime.random(300, 1500));
        const [ randomX, randomY ] = randomPosOnScreen();
        fireworks.throwFirework(randomX, randomY);
    }
}

anime({
    targets: '.anime.intro',
    opacity: 1,
    delay: 500,
    duration: 1500,
    easing: 'easeInOutQuad',
    begin: (anim) => {
        (<any>anim.animatables[0]).target.style.visibility = 'visible';
        new EventListener((<any>anim.animatables[0]).target.querySelector('button'), 'click').once((e) => {
            anim.pause();
            start(e);
        });
    },
});

window.addEventListener('keyup', F, false);
