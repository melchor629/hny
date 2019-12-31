import {
  Audio,
  AudioListener,
  AudioLoader,
  BufferGeometry,
  Cache,
  Color,
  DirectionalLight,
  Float32BufferAttribute,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass'
import { clamp, random, shuffle } from 'lodash-es'
import { easeCubicIn, easeSinInOut } from 'd3-ease'
import Stats from 'three/examples/jsm/libs/stats.module'

import './styles.css'

Cache.enabled = true

const getAudioExts = async () => {
  const types = [
    {
      ext: 'webm',
      contentType: 'audio/webm; codecs=opus',
      channels: 2,
      bitrate: 128000,
      samplerate: 48000,
    },
    {
      ext: 'ogg',
      contentType: 'audio/ogg; codecs=vorbis',
      channels: 2,
      bitrate: 112000,
      samplerate: 44100,
    },
    {
      ext: 'm4a',
      contentType: 'audio/mp4; codecs=mp4a.40.1',
      channels: 2,
      bitrate: 128000,
      samplerate: 48000,
    },
    { ext: 'wav', contentType: 'audio/wave', channels: 2, samplerate: 96000 },
  ]

  if (navigator.mediaCapabilities && navigator.mediaCapabilities.encodingInfo && navigator.mediaCapabilities.decodingInfo) {
    return (await Promise.all(
      types
        .map(t => ({ type: 'file', audio: t }))
        .map(t =>
          navigator.mediaCapabilities.decodingInfo(t).then(r => [t, r]),
        ),
    ))
      .filter(([, r]) => r.supported)
      .map(([t]) => t.audio)
  }

  const audio = document.createElement('audio')
  return types.filter(t => audio.canPlayType(t.contentType))
}

const listener = new AudioListener()
const audioObjects = new Map()
const loadAudios = async () => {
  const exts = await getAudioExts()
  const ext = exts[0].ext
  const loader = new AudioLoader()

  const loadAudio = name =>
    new Promise((resolve, reject) =>
      loader.load(`snd/${name}.${ext}`, resolve, undefined, reject),
    )

  const audios = [
    'anvil-smash',
    'brush-train',
    'funky-shuffle',
    'matchbox-beat',
    'minimal-disco',
    'space',
  ]
  await Promise.all(
    audios.map(async audioName => {
      const buffer = await loadAudio(audioName)
      const audio = new Audio(listener)
      audio.setBuffer(buffer)
      audio.setLoop(true)
      audio.setVolume(1)
      audioObjects.set(audioName, audio)
    }),
  )
}

const loadDae = () =>
  new Promise((resolve, reject) =>
    new ColladaLoader().load(
      'untitled.dae',
      collada => {
        const [elTexto] = collada.scene.children
        elTexto.scale.set(5, 5, 5)
        elTexto.material = new MeshStandardMaterial()

        scene.add(elTexto)
        resolve()
      },
      null,
      reject,
    ),
  )

const loadStuff = async () => {
  await Promise.all([loadDae(), loadAudios()])
  return undefined
}

//Scene
const scene = new Scene()
scene.background = new Color(0x111111)

//Camera
const camera = new PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  1,
  1500,
)
camera.position.set(0, 15, 70)
camera.add(listener)

const cameraTarget = new Vector3(0, 0, 0)

//Lights
const dirLight = new DirectionalLight(0xffffff, 0.256)
dirLight.position.set(0, 0, 1).normalize()
scene.add(dirLight)

const pointLight = new PointLight(0xffffff, 1.5)
pointLight.position.set(0, 100, 90)
scene.add(pointLight)

//Renderer
const renderer = new WebGLRenderer()
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//Effect Composer
const composer = new EffectComposer(renderer)
composer.setPixelRatio(window.devicePixelRatio)
composer.setSize(window.innerWidth, window.innerHeight)

const ssaaRenderPass = new SSAARenderPass(scene, camera, 0x111111)
ssaaRenderPass.unbiased = false
ssaaRenderPass.sampleLevel = 2
composer.addPass(ssaaRenderPass)

const copyPass = new ShaderPass(CopyShader)
composer.addPass(copyPass)

//Stats
const stats = new Stats()
if (process.env.NODE_ENV !== 'production') {
  document.body.append(stats.dom)
}

//Stars
const numParticles = 1500
const positions = []
for (let i = 0; i < numParticles; i++) {
  positions.push([
    random(-70, 70, true),
    random(-70, 70, true),
    random(-70, 70, true),
  ])
}

const geometry = new BufferGeometry()
geometry.setAttribute(
  'position',
  new Float32BufferAttribute(positions.flat(), 3),
)

const starsMesh = new Points(
  geometry,
  new PointsMaterial({ size: 3, sizeAttenuation: false }),
)
scene.add(starsMesh)

let effect = 0
let color = 0
let click = false
let transitionToMoving = false
let transitionToMovingStartTime = null
let animRot = Math.PI * 0.5
let time = null

const moveAgainNow = initialRot => {
  click = false
  transitionToMoving = true
  animRot = initialRot
  transitionToMovingStartTime = time
}

const startMovingAgain = (() => {
  let id = null

  return () => {
    if (id) {
      clearTimeout(id)
    }

    id = setTimeout(
      moveAgainNow,
      10000,
      Math.PI * ((1.0 - mousePos.x) * 0.8 + 0.1),
    )
  }
})()

window.addEventListener(
  'resize',
  () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    composer.setPixelRatio(window.devicePixelRatio)
    composer.setSize(window.innerWidth, window.innerHeight)

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateMatrixWorld()
    camera.updateProjectionMatrix()
  },
  false,
)

renderer.domElement.addEventListener(
  'pointerdown',
  () => {
    if (!playingAudio) {
      effect = 1
      color += 1
      click = true

      startMovingAgain()
    }
  },
  false,
)

const mousePos = new Vector2(0, 0)
window.addEventListener(
  'pointermove',
  e => {
    if (e.pointerType === 'mouse') {
      mousePos.x = e.clientX / window.innerWidth
      mousePos.y = e.clientY / window.innerHeight
    } else {
      console.log(e.pointerType, e.movementX, e.movementY)
      mousePos.x = clamp(mousePos.x + e.movementX / window.innerWidth, 0, 1)
      mousePos.y = clamp(mousePos.y + e.movementY / window.innerHeight, 0, 1)
    }

    if (click) {
      startMovingAgain()
    }
  },
  false,
)

let playingAudio = null
let audioStartedAt = null
let audioMode = null
document.querySelector('#mode').addEventListener(
  'change',
  e => {
    if (playingAudio) {
      playingAudio.stop()
      playingAudio = null
      audioStartedAt = null
      audioMode = null
    }

    const newMode = e.target.value
    if (newMode === 'default') {
      moveAgainNow(Math.PI * 0.5)
    } else {
      playingAudio = audioObjects.get(newMode)
      playingAudio.play()
      audioMode = newMode
      click = false
    }
  },
  false,
)

const updateRotation = delta => {
  animRot += (Math.PI / 16) * delta

  if (animRot > 2 * Math.PI) {
    animRot -= 2 * Math.PI
  }
}

const colors = [
  new Color('#eeeeee'),
  ...shuffle([
    new Color('#F44336'),
    new Color('#E91E63'),
    new Color('#9C27B0'),
    new Color('#673AB7'),
    new Color('#3F51B5'),
    new Color('#2196F3'),
    new Color('#03A9F4'),
    new Color('#00BCD4'),
    new Color('#009688'),
    new Color('#4CAF50'),
    new Color('#8BC34A'),
    new Color('#CDDC39'),
    new Color('#FFEB3B'),
    new Color('#FFC107'),
    new Color('#FF9800'),
    new Color('#FF5722'),
    new Color('#795548'),
    new Color('#9E9E9E'),
    new Color('#607D8B'),
  ]),
]

let lastTime = null
window.addEventListener('focus', () => (lastTime = null), false)
const animate = t => {
  time = t
  if (!lastTime) {
    lastTime = t - 1 / 60
  }
  const delta = (time - lastTime) / 1000

  if (effect > 0) {
    effect -= delta
  }

  if (click) {
    const rot = Math.PI * ((1.0 - mousePos.x) * 0.8 + 0.1)
    const r0t = Math.PI * (mousePos.y - 0.5) * 0.8
    camera.position.x = Math.cos(rot) * (70 - 35 * easeCubicIn(effect))
    camera.position.y = Math.tan(r0t) * 15 * (1 - easeCubicIn(effect))
    camera.position.z = Math.sin(rot) * (70 - 35 * easeCubicIn(effect))
  } else if (transitionToMoving) {
    const tt = (time - transitionToMovingStartTime) / 1000 / 2
    const fromY = camera.position.y
    const toY = 15
    updateRotation(delta)
    camera.position.x = Math.cos(animRot) * (70 - 35 * easeCubicIn(effect))
    camera.position.y =
      ((toY - fromY) * easeSinInOut(tt) + fromY) * (1 - easeCubicIn(effect))
    camera.position.z = Math.sin(animRot) * (70 - 35 * easeCubicIn(effect))

    if (tt > 1) {
      transitionToMoving = false
    }
  } else if (playingAudio) {
    if (audioStartedAt == null) {
      audioStartedAt = time
    }

    const tt = (time - audioStartedAt) / 1000
    let keyframes = []
    let ttt = tt
    if (audioMode === 'anvil-smash') {
      ttt = tt % 4.363
      keyframes = {
        0.0: { effect: 1, animRot: Math.PI / 2 },
        0.54: { effect: 1 },
        1.09: { effect: 1, animRot: Math.PI * 0.75, color: c => c + 2 },
        2.19: { effect: 1, animRot: Math.PI / 2 },
        2.73: { effect: 1 },
        3.27: { effect: 1, animRot: Math.PI * 0.25, color: c => c + 2 },
        4.09: { effect: 1, animRot: Math.PI / 2 },
      }
    } else if (audioMode === 'brush-train') {
      ttt = tt % 2.181
      keyframes = {
        0.0: { effect: 1, animRot: Math.PI * 0.5, color: 0 },
        0.27: { effect: 1 },
        0.55: { effect: 0.8, animRot: Math.PI * 0.75 },
        0.82: { effect: 0.8, animRot: Math.PI * 1.75 },
        1.31: { effect: 0.7, animRot: Math.PI * 0.25 },
        1.64: { effect: 1, animRot: Math.PI * 0.5 },
        1.91: { effect: 0.9, animRot: Math.PI * 1.25 },
        2.06: { effect: 0.9, animRot: Math.PI * 0.5 },
      }
    } else if (audioMode === 'funky-shuffle') {
      ttt = tt % 2.181
      keyframes = {
        0.0: { effect: 0.8, animRot: Math.PI / 2 },
        0.43: { effect: 0.9 },
        0.53: { effect: 1, animRot: Math.PI * 1.5, color: c => c + 1 },
        0.83: { effect: 1, animRot: Math.PI * 1.75 },
        0.97: { effect: 0.8, animRot: Math.PI / 2 },
        1.25: { effect: 1, animRot: Math.PI * 1.5, color: c => c + 1 },
        1.36: { effect: 1, animRot: Math.PI * 1.75 },
        1.65: { effect: 1, animRot: Math.PI / 2 },
        1.91: { effect: 0.8 },
      }
    } else if (audioMode === 'matchbox-beat') {
      ttt = tt % 4.363
      keyframes = {
        0.0: { effect: 0.8, animRot: Math.PI * 0.75, color: c => c + 1 },
        0.54: { effect: 1, animRot: Math.PI * 0.25, color: c => c + 1 },
        1.09: { effect: 0.8, animRot: Math.PI * 0.75, color: c => c + 1 },
        1.62: { effect: 1, animRot: Math.PI * 0.25, color: c => c + 1 },
        2.16: { effect: 0.8, animRot: Math.PI * 0.75, color: c => c + 1 },
        2.71: { effect: 1, animRot: Math.PI * 0.25, color: c => c + 1 },
        3.26: { effect: 0.8, animRot: Math.PI * 0.75, color: c => c + 1 },
        3.81: { effect: 1, animRot: Math.PI * 0.25, color: c => c + 1 },
      }
    } else if (audioMode === 'minimal-disco') {
      ttt = tt % 4.363
      keyframes = {
        0.0: { effect: 0.8, animRot: Math.PI * 0.25, color: c => c + 1 },
        0.54: { effect: 1, animRot: Math.PI * 0.75, color: c => c + 1 },
        1.09: { effect: 0.8, animRot: Math.PI * 0.25, color: c => c + 1 },
        1.62: { effect: 1, animRot: Math.PI * 0.75, color: c => c + 1 },
        2.16: { effect: 0.8, animRot: Math.PI * 0.25, color: c => c + 1 },
        2.71: { effect: 1, animRot: Math.PI * 0.75, color: c => c + 1 },
        3.26: { effect: 0.8, animRot: Math.PI * 0.25, color: c => c + 1 },
        3.81: { effect: 1, animRot: Math.PI * 0.75, color: c => c + 1 },
        3.96: { effect: 1, animRot: Math.PI * 1.5, color: c => c + 1 },
      }
    } else if (audioMode === 'space') {
      ttt = tt % 9.6
      keyframes = {
        0: { color: 0 },
      }
      updateRotation(delta)
    }

    const value = (val, curr) => {
      if (typeof val === 'function') {
        return val(curr)
      }

      return val
    }

    for (let [key, values] of Object.entries(keyframes)) {
      if (Math.abs(ttt - key) < delta) {
        if (values.effect) {
          effect = value(values.effect, effect)
        }
        if ('animRot' in values) {
          animRot = value(values.animRot, animRot)
        }
        if ('color' in values) {
          color = value(values.color, color)
        }
      }
    }

    camera.position.x = Math.cos(animRot) * (70 - 35 * easeCubicIn(effect))
    camera.position.y = 15 * (1 - easeCubicIn(effect))
    camera.position.z = Math.sin(animRot) * (70 - 35 * easeCubicIn(effect))
  } else {
    updateRotation(delta)
    camera.position.x = Math.cos(animRot) * (70 - 35 * easeCubicIn(effect))
    camera.position.y = 15 * (1 - easeCubicIn(effect))
    camera.position.z = Math.sin(animRot) * (70 - 35 * easeCubicIn(effect))
  }
  camera.lookAt(cameraTarget)

  dirLight.position.x = camera.position.x
  dirLight.position.z = camera.position.z
  dirLight.lookAt(cameraTarget)

  pointLight.color = colors[color % colors.length]
  starsMesh.material.color = pointLight.color

  //renderer.clear()
  //renderer.render(scene, camera)
  composer.render(delta)

  requestAnimationFrame(animate)
  lastTime = time

  if (process.env.NODE_ENV !== 'production') {
    stats.update()
  }
}

loadStuff().then(() => requestAnimationFrame(animate))
