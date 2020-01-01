import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass'

export default (renderer, scene, camera) => {
  const composer = new EffectComposer(renderer)
  composer.setPixelRatio(window.devicePixelRatio)
  composer.setSize(window.innerWidth, window.innerHeight)

  const ssaaRenderPass = new SSAARenderPass(scene, camera, 0x111111)
  ssaaRenderPass.unbiased = false
  ssaaRenderPass.sampleLevel = 4
  composer.addPass(ssaaRenderPass)

  const copyPass = new ShaderPass(CopyShader)
  composer.addPass(copyPass)

  return composer
}
