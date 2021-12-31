import { useThree } from '@react-three/fiber'
import { createContext, useContext, useEffect, useMemo } from 'react'
import { AudioListener } from 'three'

const AudioListenerContext = createContext(null)
AudioListenerContext.displayName = 'AudioListenerContext'

export const AudioListenerProvider = ({ children }) => {
  const camera = useThree(({ camera }) => camera)
  const audioListener = useMemo(() => {
    const al = new AudioListener()
    camera.add(al)
    return al
  }, [camera])

  useEffect(() => () => camera.remove(audioListener), [audioListener, camera])

  return (
    <AudioListenerContext.Provider value={audioListener}>{children}</AudioListenerContext.Provider>
  )
}

/**
 * @returns {AudioListener}
 */
const useAudioListener = () => useContext(AudioListenerContext)

export default useAudioListener
