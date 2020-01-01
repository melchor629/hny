import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import particles from './particles'
import createPostProcessComposer from './post-process'
import renderLoop from './render-loop'

const getAspectRatio = () => window.innerWidth / window.innerHeight

let throttle = 1
let lastTime = 0
let throttleFps = 0

const scene = new Scene()
const camera = new PerspectiveCamera(75, getAspectRatio(), 0.1, 50)
const renderer = new WebGLRenderer({
  antialias: false,
  powerPreference: 'low-power',
})

renderer.setClearColor('rgb(25, 25, 25)')
scene.add(particles)
camera.position.z = 5

const composer = createPostProcessComposer(renderer, scene, camera)

const changePixelRatio = pixelRatio => {
  renderer.setPixelRatio(pixelRatio)
  composer.setPixelRatio(pixelRatio)
  particles.changeDevicePixelRatio(pixelRatio)
}

const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  changePixelRatio(window.devicePixelRatio)

  camera.aspect = getAspectRatio()
  camera.updateMatrixWorld()
  camera.updateProjectionMatrix()

  composer.setSize(window.innerWidth, window.innerHeight)
}

const blur = () => {
  throttle = 4
  console.log('blur')
}

const focus = () => {
  throttle = 1
  lastTime = 0
  console.log('focus')
}

// 9.71323 7.92 -5
// 7.3475 6 -2.5
// 3.9815 4.084 0

const animate = time => {
  if (lastTime === 0) {
    lastTime = time
  }

  const delta = (time - lastTime) / 1000
  throttleFps += 1

  if (throttleFps % throttle === 0) {
    renderLoop(delta)

    //renderer.render(scene, camera)
    composer.render(delta)

    lastTime = time
    throttleFps = 0
  }

  requestAnimationFrame(animate)
}

export default container => {
  resize();
  (container || document.body).appendChild(renderer.domElement)

  window.addEventListener('resize', resize, { passive: true })
  window.addEventListener('blur', blur, { passive: true })
  window.addEventListener('focus', focus, { passive: true })

  requestAnimationFrame(animate)
}
