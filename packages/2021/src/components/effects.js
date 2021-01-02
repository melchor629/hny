import { EffectComposer, Noise, Bloom, SSAO } from '@react-three/postprocessing'
import React from 'react'
import useGameSettings from '../hooks/use-game-settings/use-game-settings'

const Effects = () => {
  const { useSSAO } = useGameSettings()

  return (
    <EffectComposer>
      {useSSAO && <SSAO />}
      <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
      <Noise opacity={0.03} />
    </EffectComposer>
  )
}

export default Effects
