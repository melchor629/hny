import { EffectComposer, Bloom, Noise, ToneMapping, Vignette } from '@react-three/postprocessing'
import { memo } from 'react'

const TheEffects = () => (
  <EffectComposer stencilBuffer={false}>
    <ToneMapping />
    <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} />
    <Noise opacity={0.02} />
    <Vignette eskil={false} offset={0.1} darkness={1.1} />
  </EffectComposer>
)

export default memo(TheEffects)
