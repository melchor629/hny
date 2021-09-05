import React, { useCallback, useLayoutEffect, useRef } from 'react'
import { usePhasesStore } from '../stores'

const CardsLight = () => {
  const { phase } = usePhasesStore()
  const onLightUpdated = useCallback((light) => {
    light.shadow.camera.far = 10
    light.target.position.set(-0.630352 - 0.5, 0, 0.623453)
  }, [])
  const lightRef = useRef()
  const light2Ref = useRef()

  useLayoutEffect(() => {
    lightRef.current.intensity = phase >= 4 ? 1 : 0
    light2Ref.current.intensity = phase >= 3 ? 0.05 : 0
  }, [phase, lightRef, light2Ref])

  return (
    <>
      <directionalLight
        ref={lightRef}
        onUpdate={onLightUpdated}
        color="#F6FFEE"
        intensity={0}
        decay={2}
        position={[-0.630352, 3.0087 + 2, 0.623453]}
        castShadow
      />
      {lightRef.current && <primitive object={lightRef.current} />}

      <pointLight ref={light2Ref} color="#6EC963" intensity={0.1} decay={2} position={[-5, 2, 0]} />
    </>
  )
}

export default CardsLight
