import {
  AudioListener,
  Cache,
  Color,
  DirectionalLight,
  PerspectiveCamera,
  PointLight,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'
import { clamp } from 'lodash-es'
import { easeCubicIn } from 'd3-ease'
import Stats from 'three/examples/jsm/libs/stats.module'
import colors from './colors'
import loadData from './loaders'
import * as modes from './modes'
import createComposer from './post-processing'
import stars from './stars'
import './styles.css'

Cache.enabled = true

//Audio
const listener = new AudioListener()
const audioObjects = new Map()

//Scene
const scene = new Scene()
scene.background = new Color(0x111111)

//Camera
const camera = new PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500)
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
const renderer = new WebGLRenderer({ powerPreference: 'low-power' })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//Effect Composer
const composer = createComposer(renderer, scene, camera)

//Stats
const stats = new Stats()
if (process.env.NODE_ENV !== 'production') {
  document.body.append(stats.dom)
}

//Stars
scene.add(stars)

//State
const animateQueue = []
const state = {
  effect: 0,
  color: 0,
  animRot: Math.PI * 0.5,
  animR0t: Math.PI * 0.25,
  _mode: 'default',
  get mode() {
    return this._mode
  },
  set mode(newMode) {
    if (this._mode === newMode) {
      return
    }

    startMovingAgain.cancel()
    animateQueue.push(({ time }) => {
      mode = modes[newMode]
      this._mode = newMode
      if (typeof mode === 'function') {
        mode = mode(time)
      } else if (!mode) {
        throw new Error(`Mode ${newMode} is not declared in modes.js`)
      }
    })
  },
}
let mode = modes[state.mode]

const moveAgainNow = () => {
  state.mode = 'transitionToNormal'
}

const startMovingAgain = (() => {
  let id = null

  const func = () => {
    if (id) {
      clearTimeout(id)
    }

    id = setTimeout(moveAgainNow, 10000)
  }
  func.cancel = () => {
    clearTimeout(id)
    id = null
  }
  return func
})()

//Event listeners
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
      state.effect = 1
      state.color += 1
      state.mode = 'user'

      startMovingAgain()
    }
  },
  false,
)

const mousePos = new Vector2(0, 0)
window.addEventListener(
  'pointermove',
  (e) => {
    if (e.pointerType === 'mouse') {
      mousePos.x = e.clientX / window.innerWidth
      mousePos.y = e.clientY / window.innerHeight
    } else {
      mousePos.x = clamp(mousePos.x + e.movementX / window.innerWidth, 0, 1)
      mousePos.y = clamp(mousePos.y + e.movementY / window.innerHeight, 0, 1)
    }

    if (state.mode === 'user') {
      startMovingAgain()
    }
  },
  false,
)

let playingAudio = null
document.querySelector('#mode').addEventListener(
  'change',
  (e) => {
    if (playingAudio) {
      playingAudio.stop()
      playingAudio = null
    }

    const newMode = e.target.value
    if (newMode === 'default') {
      moveAgainNow()
    } else {
      state.mode = newMode
      playingAudio = audioObjects.get(newMode)
      playingAudio.play()
    }
  },
  false,
)

//Utils
const updateCameraPosition = () => {
  const { animRot, animR0t, effect } = state
  camera.position.x = Math.cos(animRot) * (70 - 35 * easeCubicIn(effect))
  camera.position.y = Math.tan(animR0t) * 15 * (1 - easeCubicIn(effect))
  camera.position.z = Math.sin(animRot) * (70 - 35 * easeCubicIn(effect))
}

const getKeyframeNewValue = (val, curr, opts) => {
  if (typeof val === 'function') {
    return val(curr, opts)
  }

  return val
}

//Render loop
let lastTime = null
const animate = (time) => {
  if (!lastTime) {
    lastTime = time - 1 / 60
  }

  const delta = (time - lastTime) / 1000

  {
    let func = null
    while ((func = animateQueue.shift())) {
      func({ time, delta })
    }
  }

  let keyframes = mode.keyframes
  let tt = typeof mode.time === 'function' ? mode.time(time) : time
  const newCameraPos = {}
  for (let [key, values] of Object.entries(keyframes)) {
    const isEachFrame = key === '_'
    const numKey = parseFloat(key)
    const isKeyframe = !isNaN(numKey) && Math.abs(tt - key) < delta
    if (isEachFrame || isKeyframe) {
      const opts = {
        delta,
        time: tt,
        mousePos,
      }

      for (let valueKey of Object.keys(values).filter((k) => k in state)) {
        state[valueKey] = getKeyframeNewValue(values[valueKey], state[valueKey], opts)
      }

      if ('camera' in values) {
        if ('position' in values.camera) {
          if ('x' in values.camera.position) {
            newCameraPos.x = getKeyframeNewValue(values.camera.position.x, camera.position.x, opts)
          }
          if ('y' in values.camera.position) {
            newCameraPos.y = getKeyframeNewValue(values.camera.position.y, camera.position.y, opts)
          }
          if ('z' in values.camera.position) {
            newCameraPos.y = getKeyframeNewValue(values.camera.position.z, camera.position.z, opts)
          }
        }
      }
    }
  }

  updateCameraPosition()
  for (let key of Object.keys(newCameraPos)) {
    camera.position[key] = newCameraPos[key]
  }

  camera.lookAt(cameraTarget)

  dirLight.position.x = camera.position.x
  dirLight.position.z = camera.position.z
  dirLight.lookAt(cameraTarget)

  pointLight.color = colors[state.color % colors.length]
  stars.material.color = pointLight.color

  if (state.effect > 0) {
    state.effect -= delta
  }

  composer.render(delta)

  requestAnimationFrame(animate)
  lastTime = time

  if (process.env.NODE_ENV !== 'production') {
    stats.update()
  }
}

loadData({ audioObjects, listener, scene }).then(() => requestAnimationFrame(animate))
