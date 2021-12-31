import { useLoader } from '@react-three/fiber'
import mergeRefs from 'react-merge-refs'
import { forwardRef, useEffect, useRef } from 'react'
import { AudioLoader } from 'three'
import { useAudioListener } from '../hooks'

// NOTE: the drei implementation creates a new audio listener, this one reuses it from the context
const ThePositionalAudio = forwardRef(
  ({ url, distance = 1, loop = true, autoplay, ...props }, ref) => {
    const audioRef = useRef()
    const listener = useAudioListener()
    const buffer = useLoader(AudioLoader, url)

    useEffect(() => {
      const audio = audioRef.current
      if (audio) {
        audio.setBuffer(buffer)
        audio.setRefDistance(distance)
        audio.setLoop(loop)

        if (autoplay && !audio.isPlaying) {
          audio.play()
        }
      }
    }, [buffer, distance, loop, autoplay])

    useEffect(() => {
      const audio = audioRef.current
      return () => {
        if (audio) {
          if (audio.isPlaying) audio.stop()
          if (audio.source && audio.source._connected) audio.disconnect()
        }
      }
    }, [])

    return <positionalAudio ref={mergeRefs([ref, audioRef])} args={[listener]} {...props} />
  },
)

export default ThePositionalAudio
