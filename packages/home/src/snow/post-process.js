import { Vector2 } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'

export default (renderer, scene, camera) => {
  const composer = new EffectComposer(renderer)

  const ssaaRenderPass = new SSAARenderPass(scene, camera, 'rgb(25, 25, 25)', 1)
  ssaaRenderPass.unbiased = false
  ssaaRenderPass.sampleLevel = 2
  composer.addPass(ssaaRenderPass)

  const unrealBloomPass = new UnrealBloomPass(
    new Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.1,
  )
  composer.addPass(unrealBloomPass)

  const copyPass = new ShaderPass(CopyShader)
  composer.addPass(copyPass)

  return {
    setPixelRatio: pixelRatio => {
      composer.setPixelRatio(pixelRatio)
    },
    setSize: (width, height) => {
      composer.setSize(width, height)
      unrealBloomPass.resolution = new Vector2(width, height)
    },
    render: delta => composer.render(delta),
  }
}
