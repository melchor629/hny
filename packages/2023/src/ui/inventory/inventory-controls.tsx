import { useEffect, useRef } from 'react'
import useInput from '../../hooks/use-input'
import repeatingAction from '../../utils/repeating-action'
import styles from './inventory-controls.module.scss'

interface Props {
  hasFocus: boolean
  gameScale: number
}

export default function InventoryControls({ hasFocus, gameScale }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const input = useInput()
  const scrollBy = 20 * gameScale

  useEffect(() => {
    if (hasFocus) {
      let repeatingActionUnsubscribe: (() => void) | null = null
      const fns = [
        input.forKey('up').subscribe({
          press() {
            repeatingActionUnsubscribe?.()
            repeatingActionUnsubscribe = repeatingAction(
              () => {
                containerRef.current && (containerRef.current.scrollTop -= scrollBy)
              },
              150,
              500,
              true,
            )
          },
          release() {
            repeatingActionUnsubscribe?.()
          },
        }),
        input.forKey('down').subscribe({
          press() {
            repeatingActionUnsubscribe?.()
            repeatingActionUnsubscribe = repeatingAction(
              () => {
                containerRef.current && (containerRef.current.scrollTop += scrollBy)
              },
              150,
              500,
              true,
            )
          },
          release() {
            repeatingActionUnsubscribe?.()
          },
        }),
      ]

      return () => {
        repeatingActionUnsubscribe?.()
        fns.forEach((fn) => fn())
      }
    }

    return () => {}
  }, [hasFocus, scrollBy])

  return (
    <div ref={containerRef} className={styles.container}>
      <h1>Teclado</h1>
      <table aria-label="Combinaciones de teclas">
        <thead>
          <tr>
            <th>Acción</th>
            <th>Tecla</th>
            <th>Alt</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Arriba</td>
            <td>
              <kbd>W</kbd>
            </td>
            <td>
              <kbd>↑</kbd>
            </td>
          </tr>
          <tr>
            <td>Abajo</td>
            <td>
              <kbd>S</kbd>
            </td>
            <td>
              <kbd>↓</kbd>
            </td>
          </tr>
          <tr>
            <td>Izquierda</td>
            <td>
              <kbd>A</kbd>
            </td>
            <td>
              <kbd>←</kbd>
            </td>
          </tr>
          <tr>
            <td>Derecha</td>
            <td>
              <kbd>D</kbd>
            </td>
            <td>
              <kbd>→</kbd>
            </td>
          </tr>
          <tr>
            <td>Acción/Correr</td>
            <td>
              <kbd>Espacio</kbd>
            </td>
            <td>
              <kbd>⏎</kbd>
            </td>
          </tr>
          <tr>
            <td>Atrás/Menú</td>
            <td>
              <kbd>X</kbd>
            </td>
            <td>
              <kbd>M</kbd>
            </td>
          </tr>
          <tr>
            <td>Pantalla Completa</td>
            <td>
              <kbd>F</kbd>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <p>
        En este mismo menú y en los diálogos, puedes usar el ratón para accionar ciertos elementos
        de la interfaz.
      </p>
      <p>
        Se recomienda usar <kbd className={styles.small}>F</kbd> para entrar en pantalla completa en
        lugar de <kbd className={styles.small}>F11</kbd> porque te quita de la barra de navegación.
      </p>

      <div className={styles.marginator} />

      <h1>Mando</h1>
      <p>
        El dibujo de abajo representa un mando genérico, los controles no se distinguen entre tipo
        de mandos.
      </p>
      <figure>
        <img src={new URL('./standard_gamepad.svg', import.meta.url).toString()} width="100%" />
        <figcaption>
          Imagen obtenida de&nbsp;
          <a href="https://w3c.github.io/gamepad/#remapping" target="_blank">
            https://w3c.github.io/gamepad/#remapping
          </a>
          &nbsp;- modificada para el juego
        </figcaption>
      </figure>
      <p>
        El soporte de mandos está sujeto a lo que el sistema operativo y el navegador soportan.
        Obtendrás una mejor experiencia al usar un mando de Xbox compatible, de PS4/5 o Switch (en
        algún caso extraño). En macOS, iPadOS, Android y Windows no deberia haber ningún problema al
        usar un mando de los anteriores. En Linux, todo depende…
      </p>

      <div className={styles.marginator} />

      <h1>Táctil</h1>
      <p>
        Si usas pantalla táctil, tienes abajo izquierda el joystick virtual y abajo derecha los dos
        botones para interactuar. Tienes arriba un botón de pantalla completa también. Espero que no
        haga falta más explicación :)
      </p>
    </div>
  )
}
