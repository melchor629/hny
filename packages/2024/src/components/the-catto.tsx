import { PositionalAudio, useAnimations } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { AnimationClip, AudioLoader, Group, InterpolateLinear, NumberKeyframeTrack } from 'three'
import { Catto } from '../objects'

let fileName = 'sound.m4a'
if (document.createElement('audio').canPlayType('audio/webm; codecs="opus"')) {
  fileName = 'sound.webm'
}

useLoader.preload(AudioLoader, fileName)

const timing = [0.0, 9.0]
const values = [2 * Math.PI, 0]
const rotationAnimationClip = new AnimationClip('da_rotate', timing.at(-1)!, [
  new NumberKeyframeTrack('.rotation[y]', timing, values, InterpolateLinear),
])

export default function TheCatto(props: React.ComponentPropsWithoutRef<typeof Catto>) {
  const group = useRef<Group>(null)
  const audioRef = useRef<any>(null)
  const { actions } = useAnimations([rotationAnimationClip], group)

  useEffect(() => {
    const { da_rotate: daRotate } = actions
    if (daRotate) {
      daRotate.clampWhenFinished = true
      daRotate.play()
    }
  }, [actions])

  useFrame(() => {
    if (props.scale) {
      const [scale] = (props.scale as any).get()
      const gain = audioRef.current!.gain as GainNode
      gain.gain.value = scale
    }
  })

  return (
    <group ref={group}>
      <Catto {...props} />
      <PositionalAudio ref={audioRef} url={fileName} loop autoplay />
    </group>
  )
}
