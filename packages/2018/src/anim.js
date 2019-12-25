import { styler, tween, chain, svg, easing, everyFrame, keyframes } from 'popmotion';
import coolAndGoodImage from './img/c&g.png';

if(document.body.clientWidth <= 1200) {
    alert("Debes usar un ordenador para ver esto, y que sea 1280px mínimo")
    throw new Error("Pantalla mas grande plox");
}

const sobre = document.querySelector('#sobreContainer');
const parte = document.querySelector('#parteQueSeAbre') || document.querySelector('.parteQueSeAbre');
const otherStuff = document.querySelector('.otherStuff');
const textNoice = document.querySelector('.textNoice');
const f1 = document.querySelector('#f1');
const f2 = document.querySelector('#f2');
const sobreStyler = styler(sobre);
const parteStyler = svg(parte);
const otherStuffStyler = styler(otherStuff);
const textNoiceStyler = styler(textNoice);
const f1Styler = styler(f1);
const f2Styler = styler(f2);

class AudioContext {
    constructor() {
        this._ctx = new (window.AudioContext || window.webkitAudioContext)();
        this._sounds = [];
        let a = new Audio();
        this.canPlay = {
            m4a: a.canPlayType('audio/m4a') || a.canPlayType('audio/x-m4a') || a.canPlayType('audio/aac'),
            mp3: a.canPlayType('audio/mp3') || a.canPlayType('audio/mpeg;'),
            ogg: a.canPlayType('audio/ogg; codecs="vorbis"'),
            wav: a.canPlayType('audio/wav; codecs="1"')
        };
    }

    _doLoad(file, cbk) {
        let request = new XMLHttpRequest();
        request.open('GET', `snd/${file}`);
        request.responseType = 'arraybuffer';
        request.onload = (e) => {
            this._ctx.decodeAudioData(request.response, buffer => {
                cbk(buffer);
            });
        };
        request.send();
    }

    load(name, snd1, snd2) {
        return new Promise((resolve, reject) => {
            this._doLoad(snd1, buffer => {
                if(buffer) {
                    this._sounds[name] = buffer;
                    console.log(name);
                    resolve(name);
                } else {
                    this._doLoad(snd2, buffer => {
                        if(buffer) {
                            this._sounds[name] = buffer;
                            console.log(name);
                            resolve(name);
                        } else {
                            reject(new Error());
                        }
                    });
                }
            });
        });
    }

    play(name) {
        return new Promise((resolve, reject) => {
            let buffer = this._ctx.createBufferSource();
            buffer.buffer = this._sounds[name];
            buffer.connect(this._ctx.destination);
            buffer.start(0);
            buffer.onended = resolve;
        });
    }

    resume() {
        this._ctx.resume();
    }
}

const actx = new AudioContext();
(function loadAudio() {
    const audios = [ [ "c&g.mp3","c&g.wav" ], [ "hhm.mp3","hhm.wav" ], [ "noice.mp3","noice.wav" ], [ "cb.mp3", "cb.wav" ] ];
    let loadedSounds = 0;
    const thenCbk = () => {
        loadedSounds++;
        if(loadedSounds === audios.length) {
            let boton = document.querySelector('#dale');
            let mensaje = document.querySelector('.mensaje');
            boton.removeAttribute('disabled', null);
            boton.onclick = (e) => {
                e.preventDefault();
                actx.resume();
                tween({ from: { opacity: 1 }, to: { opacity: 0 }, duration: 750 }).start({
                    update: styler(mensaje).set,
                    complete: () => {
                        mensaje.style.display = 'none';
                        effect();
                    }
                });
            };
        }
    }

    for(let audio of audios) {
        actx.load(audio[0].substr(0, audio[0].indexOf('.')), audio[0], audio[1])
            .then(thenCbk)
            .catch(e => console.error(e));
    }
})();

const r = /translateX\((-?\d+\.?\d*)px\) translateY\((-?\d+\.?\d*)px\) rotateZ\((-?\d+\.?\d*)deg\) translateZ\(-?\d+\.?\d*px\)/;

const effect = () => {
    const stop = chain(
        tween({
            from: { x: -400, y: 300, rotateZ: -45 },
            to: { x: 0, y: 0, rotateZ: 0 },
            ease: easing.easeOut,
            duration: 1000
        }),
        tween({
            from: { x: 0, y: 0, rotateZ: 0 },
            to: { x: 400, y: -300, rotateZ: 45 },
            duration: 1000 * 100,
            flip: Infinity
        })
    ).start(sobreStyler.set);

    parte.onclick = e => {
        stop.stop();
        parte.onclick = null;
        parte.classList.remove('notClicked');
        tween({
            from: { translateY: 0, scaleY: +1, originX: 0, originY: 0 },
            to: { translateY: 0, scaleY: -1, originX: 0, originY: 0 },
            duration: 750
        }).start({ update: parteStyler.set, complete: crazySobre });
    };
};

const crazySobre = () => {
    document.body.classList.add('trascending');
    const rRes = r.exec(document.querySelector('#sobreContainer').style.transform);
    const x = Number(rRes[1]);
    const y = Number(rRes[2]);
    const rotateZ = Number(rRes[3]);
    let selfAppearing = false;
    actx.play("noice");
    const stop = everyFrame().start(t => {
        sobreStyler.set({
            translateX: x + Math.sqrt(t) * (Math.random() - 0.5),
            translateY: y + Math.sqrt(t) * (Math.random() - 0.5),
            rotateZ
        });
        if(t > 4 * 1000 && !selfAppearing) {
            selfAppears();
            selfAppearing = true;
        }
        if(t > 4.2 * 1000) {
            stop.stop();
        }
    });
};

const selfAppears = () => {
    otherStuff.style.display = 'block';
    tween({
        from: { scale: 0.8, translateX: document.body.clientWidth, rotateZ: 360 * 5 },
        to: { scale: 1, translateX: 0, rotateZ: 0 },
        duration: 500,
    }).start({ update: otherStuffStyler.set, complete: () => {
        selfStanding();
        tween({
            from: { scale: 1, translateX: 0, translateY: 0, rotateZ: 0, opacity: 1 },
            to: { scale: 0, translateX: -document.body.clientWidth, translateY: 0, rotateZ: -3 * 360, opacity: 0 },
            duration: 500
        }).start({ update: styler(document.querySelector('#sobre')).set, complete: () => document.querySelector('#sobre').style.opacity = 0 });
    } });
};

const selfStanding = () => {
    keyframes({
        values: [
            { translateX: 0, translateY: 0 },
            { translateX: 6, translateY: 6 },
            { translateX: 10, translateY: 10 },
            { translateX: 16, translateY: 4 },
            { translateX: 20, translateY: 0 },
            { translateX: 14, translateY: -6 },
            { translateX: 10, translateY: -10 },
            { translateX: 4, translateY: -6 },
            { translateX: 0, translateY: 0 },
        ],
        ease: easing.linear,
        easings: easing.linear,
        loop: Infinity,
        duration: 5000
    }).start(otherStuffStyler.set);
    document.querySelector('.otherStuff img').onclick = function() {
        setTimeout(showText, 1000);
        this.onclick = null;
        this.onmouseover = null;
        this.classList.remove('clickable');
        actx.play("hhm");
        keyframes({
            values: [
                { opacity: 1, translateX: document.body.clientWidth - 600 },
                { opacity: 1, translateX: document.body.clientWidth - 600 },
                { opacity: 0, translateX: document.body.clientWidth - 800 }
            ],
            times: [ 0, 0.01, 1 ],
            easings: easing.easeOut,
            duration: 1000
        }).start(styler(document.querySelector('#hhm')).set);
    };
};

const showText = () => {
    textNoice.classList.remove('nope');
    tween({
        from: { opacity: 0 },
        to: { opacity: 1 },
        duration: 500
    }).start(textNoiceStyler.set);
    tween({
        from: { skewX: 90 },
        to: { skewX: 0 },
        ease: easing.cubicBezier(0.175, 0.885, 0.32, 1.275),
        duration: 2500
    }).start(f1Styler.set);
    tween({
        from: { skewY: -90 },
        to: { skewY: 0 },
        ease: easing.easeIn,
        duration: 2000
    }).start({ update: f2Styler.set, complete: () => {
        actx.play("c&g");
        document.querySelector('#self').setAttribute('src', coolAndGoodImage);
        keyframes({
            values: [
                { opacity: 1, translateX: document.body.clientWidth - 800 },
                { opacity: 1, translateX: document.body.clientWidth - 800 },
                { opacity: 0.75, translateX: document.body.clientWidth - 900 },
                { opacity: 0, translateX: document.body.clientWidth - 1000 }
            ],
            times: [ 0, 0.01, 0.51, 1 ],
            easings: [easing.linear, easing.linear, easing.linear, easing.easeOut],
            duration: 2000
        }).start(styler(document.querySelector('#cg')).set);
        setTimeout(cykabliat, 4000);
    } });
};

const cykabliat = () => {
    actx.play("cb").then(() => window.location = "about:blank");
    setTimeout(() => window.location = "about:blank", 9000); //Para Safari
    everyFrame().start(t => {
        t = t / 1000 * 145 / 60;
        const tt = Math.trunc(t) % 7 + 1;
        const tCycle = t - Math.trunc(t);
        document.body.classList.forEach(v => document.body.classList.remove(v));
        document.body.classList.add('bg' + tt);
        f1Styler.set({ scale: 1 + 0.5*tCycle });
        f2Styler.set({ scale: 1 + 0.5*(1-tCycle) });
    });
};
