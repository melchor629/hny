import { animated, useSpring } from '@react-spring/web'
import { useCallback, useState } from 'react'

interface VideoProps {
  onStartPlaying?: () => void
  fadeIn?: boolean
  src: string
}

export default function Video({ fadeIn, onStartPlaying, src }: VideoProps) {
  const [hasLoaded, setHasLoaded] = useState(false)
  const { opacity } = useSpring({
    from: { opacity: fadeIn ? 0 : 1 },
    opacity: +hasLoaded,
  })

  const onLoad = useCallback(() => {
    setHasLoaded(true)
    onStartPlaying?.()
  }, [onStartPlaying])

  return (
    <animated.video
      style={{
        opacity,
        width: '100%',
        height: '100%',
      }}
      autoPlay
      muted
      loop
      onLoad={onLoad}
      onPlay={onLoad}
    >
      <source src={`./assets/videos/${src}.webm`} type="video/webm; codecs=vp9" />
      <source src={`./assets/videos/${src}.mp4`} type="video/mp4; codecs=hvc1t" />
    </animated.video>
  )
}
