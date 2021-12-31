import { useLoader } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { Audio, AudioLoader } from 'three'
import { usePartStore } from '../stores'
import { useAudioListener } from '../hooks'

const fadeDuration = 3
const initialFadeValue = 0.001
const finalFadeValue = 0.15

/**
 * @param {{ url: string }} props props
 */
const TheRealMusicPlayer = ({ url }) => {
  const audioListener = useAudioListener()
  const audioBuffer = useLoader(AudioLoader, url)

  useEffect(() => {
    if (!audioListener) {
      return () => {}
    }

    const audio = new Audio(audioListener)
    audio.setBuffer(audioBuffer)
    audio.setLoop(false)
    audio.setVolume(0)
    audio.play()

    const start = audioListener.context.currentTime
    const end = start + audioBuffer.duration
    const { gain } = audio.getOutput()
    gain.linearRampToValueAtTime(initialFadeValue, start)
    gain.linearRampToValueAtTime(finalFadeValue, start + fadeDuration)
    // fade effect -- ^ start -- \/ end
    gain.linearRampToValueAtTime(finalFadeValue, end - fadeDuration)
    gain.linearRampToValueAtTime(initialFadeValue, end)

    return () => {
      const current = audioListener.context.currentTime
      // don't do anything if it is already fading out
      if (end - fadeDuration < current) {
        return
      }

      gain.cancelAndHoldAtTime(current)
      if (current < start + fadeDuration) {
        // fade out proportial time of fade in
        gain.linearRampToValueAtTime(initialFadeValue, 2 * current - start)
      } else {
        // normal fade out
        gain.linearRampToValueAtTime(initialFadeValue, current + fadeDuration)
      }
      setTimeout(() => audio.stop(), fadeDuration * 1000)
    }
  }, [audioBuffer, audioListener])

  return null
}

const TheMusicPlayer = () => {
  const trackInfo = usePartStore((s) => s.selectedPartTrackInfo)

  if (!trackInfo || !trackInfo.preview_url) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <TheRealMusicPlayer url={trackInfo.preview_url} />
    </Suspense>
  )
}

export default TheMusicPlayer
