import { meshBounds, useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import { elFrascoUrl, farBeatUrl, objectOkUrl } from '../../constants'
import { usePartyStore } from '../../stores'
import ThePositionalAudio from '../the-positional-audio'

// 0.4445
const timing = [0.0, 0.41, 0.4445],
  values = [1, 0.95, 1]
const beatAnimationClip = new THREE.AnimationClip(null, timing.slice(-1)[0], [
  new THREE.NumberKeyframeTrack('.scale[x]', timing, values, THREE.InterpolateSmooth),
  new THREE.NumberKeyframeTrack('.scale[y]', timing, values, THREE.InterpolateSmooth),
  new THREE.NumberKeyframeTrack('.scale[z]', timing, values, THREE.InterpolateSmooth),
])

const TheFullObject = (props) => {
  const group = useRef()
  const { scene } = useGLTF(objectOkUrl)
  const { mixer } = useAnimations([], group)
  const party = usePartyStore()

  useEffect(() => {
    const [object] = scene.children
    const action = mixer.clipAction(beatAnimationClip, object)
    action.name = 'beat'
    action.clampWhenFinished = true
    action.play()

    // this changes how raycast is done, with a less CPU intensive method
    // and less perfect method, but for my case is better to use the mesh
    // bounds for easier-to-use experience
    object.raycast = meshBounds

    mixer.addEventListener('loop', () => {
      const state = usePartyStore.getState()
      state.beat()
    })
  }, [])

  useLayoutEffect(() => {
    const [object] = scene.children
    object.material.color = party.colour
    object.material.emissive = party.colour
  }, [party.colour, scene.children])

  return (
    <group {...props}>
      <primitive ref={group} object={scene} />
      <ThePositionalAudio
        url={farBeatUrl}
        distance={1}
        autoplay
        loop
        ref={(audio) => audio && audio.setVolume(0.5)}
      />
      {party.shouldExplodeIn >= 0 && (
        <ThePositionalAudio
          url={elFrascoUrl}
          distance={0.5}
          autoplay
          loop={false}
          ref={(audio) => audio && audio.setVolume(0.55)}
        />
      )}
    </group>
  )
}

export default TheFullObject
