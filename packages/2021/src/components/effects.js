import { EffectComposer, Noise, Bloom, SSAO } from '@react-three/postprocessing'
import { useDetectGPU } from '@react-three/drei'
import React from 'react'

const Effects = () => {
  const gpu = useDetectGPU()

  return (
    <EffectComposer>
      {!((gpu?.isMobile ?? true) || (gpu?.tier ?? 1) === 1) && <SSAO />}
      <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
      <Noise opacity={0.03} />
    </EffectComposer>
  )
}

export default Effects
