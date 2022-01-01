import { Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useCallback } from 'react'
import { useAudioListener } from '../../hooks'
import { usePartyStore } from '../../stores'
import styles from './the-welcome.module.scss'

const appleRegex = /iPhone|iPad/g
const isApple =
  ['iPhone', 'iPad'].includes(window.navigator.platform) ||
  appleRegex.exec(window.navigator.userAgent)

const TheWelcome = () => {
  const letsParty = usePartyStore((state) => state.letsParty)
  const size = useThree((e) => e.size)
  const audioListener = useAudioListener()

  const letsPartyThePre = useCallback(() => {
    // Browsers do not allow to start the context if no user interaction is done
    // Safari goes further and it only allows to activate it inside a handler
    const context = audioListener.context
    let pimkyPromise = Promise.resolve()
    if (context.state !== 'running') {
      pimkyPromise = context.resume()
    }

    pimkyPromise.then(letsParty)
  }, [letsParty, audioListener])

  return (
    <Html fullscreen className={styles.container}>
      <h1 className={styles.title}>¡Bienvenido!</h1>
      <div className={styles['text-container']}>
        Estas a punto de empezar con la fiesta, pero antes debes saber que hay sonidos y música
        dentro de ella. ¡Ten cuidado con el volumen de tu dispositivo!
      </div>
      <div className={styles['text-container']}>
        Todo lo que veas en pantalla es interactivo. Puedes hacer zoom o rotar la vista, tambien
        apretar cosas.
      </div>
      {size.width < size.height && (
        <div className={styles['text-container']}>
          Detecto que tienes el dispositivo en vertical, lo mismo es mejor en horizontal...
        </div>
      )}
      {isApple && (
        <div className={styles['text-container']}>
          Detecto que tienes un dispositivo móvil de Apple. Si tienes el "Modo Silencio" activado no
          sonará la música.
        </div>
      )}
      <div className={styles['text-container']}>
        <small>
          El contenido de la fiesta proviene de aquellos que han participado a crear esta página
          (¡gracias a todos!). - Las <em>previews</em> de música provienen de Spotify, la calidad de
          las mismas, tambien cosa suya...
        </small>
      </div>
      <div className={styles['text-ready-container']}>¿Empezamos?</div>
      <button type="button" className={styles.button} onClick={letsPartyThePre}>
        Empezar la fiesta
      </button>
    </Html>
  )
}

export default TheWelcome
