import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import particles from './particles'
import createPostProcessComposer from './post-process'
import renderLoop from './render-loop'

let blurred = false
let lastTime = 0
let renderLoopHandle = null

const scene = new Scene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50)
const renderer = new WebGLRenderer({
  antialias: false,
  powerPreference: 'low-power',
  stencil: false,
  precision: 'mediump',
})

renderer.setClearColor('rgb(25, 25, 25)')
scene.add(particles)
camera.position.z = 5

const composer = createPostProcessComposer(renderer, scene, camera)

const changePixelRatio = (pixelRatio) => {
  renderer.setPixelRatio(pixelRatio)
  composer.setPixelRatio(pixelRatio)
  particles.changeDevicePixelRatio(pixelRatio)
}

const resize = ({ width, height }) => {
  renderer.setSize(width, height)
  changePixelRatio(window.devicePixelRatio)

  camera.aspect = width / height
  camera.updateMatrixWorld()
  camera.updateProjectionMatrix()

  composer.setSize(width, height)
}

const blur = () => {
  blurred = true
  cancelAnimationFrame(renderLoopHandle)
}

const focus = () => {
  blurred = false
  lastTime = 0
  renderLoopHandle = requestAnimationFrame(animate)
}

const animate = (time) => {
  if (lastTime === 0) {
    lastTime = time - 1 / 60
  }

  let delta = (time - lastTime) / 1000
  if (delta > 2) {
    // for some reason, I get big delta times, so to avoid big issues, I will reset this value
    // to a more acceptable one...
    console.warn('Big delta time!!', lastTime)
    delta = 1 / 60
  }

  renderLoop(delta, camera)

  composer.render(delta)

  lastTime = time

  if (!blurred) {
    renderLoopHandle = requestAnimationFrame(animate)
  }
}

/**
 * Initializes the snow background
 * @param container {HTMLDivElement} container
 */
export default (container) => {
  container.appendChild(renderer.domElement)

  resize(container.getBoundingClientRect())
  const resizeObserver = new ResizeObserver(([entry]) => resize(entry.contentRect))
  resizeObserver.observe(container)

  window.addEventListener('blur', blur, { passive: true })
  window.addEventListener('focus', focus, { passive: true })

  if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
    document.addEventListener(
      'keypress',
      (e) => {
        const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
        if (e.key.toLowerCase() === 'f' && !fullscreenElement) {
          container.requestFullscreen({ navigationUI: 'hide' })
            .then(() => container.requestPointerLock())
        }
      },
      false,
    )
  }

  renderLoopHandle = requestAnimationFrame(animate)
}
