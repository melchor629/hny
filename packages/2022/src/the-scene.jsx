import {
  TheMusicPlayer,
  TheObject,
  TheOrbitControls,
  ThePreload,
  TheStar,
  TheWelcome,
} from './components'
import { usePartyStore } from './stores'
import { AudioListenerProvider } from './hooks/use-audio-listener'

const TheScene = () => {
  const hasThePartyStarted = usePartyStore(({ partyStarted }) => partyStarted)

  return (
    <AudioListenerProvider>
      {hasThePartyStarted ? (
        <>
          <TheOrbitControls />
          <TheStar />
          <TheObject position={[0.0, -0.75, 0.0]} rotation={[Math.PI / 2, 0, 0]} />
          <TheMusicPlayer />
        </>
      ) : (
        <>
          <TheWelcome />
          <ThePreload />
        </>
      )}
    </AudioListenerProvider>
  )
}

export default TheScene
