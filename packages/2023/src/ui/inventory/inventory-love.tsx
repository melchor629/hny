import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import useInput from '../../hooks/use-input'
import useInventory from '../../hooks/use-inventory'
import clsx from '../../utils/clsx'
import repeatingAction from '../../utils/repeating-action'
import styles from './inventory-love.module.scss'

const stop = (e: any) => e.stopPropagation()

function Link({ children, href }: PropsWithChildren<{ href: string }>) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onPointerDown={stop}>
      {children}
    </a>
  )
}

export default function InventoryLove({
  hasFocus,
  gameScale,
}: {
  hasFocus: boolean
  gameScale: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [n, setN] = useState<0 | 1 | 2 | 3>(0)
  const input = useInput()
  const hasLastPhoto = useInventory((s) => s.book.find((b) => b.id === 'photo-21')?.discovered)
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
                if (containerRef.current) {
                  const h = containerRef.current!.clientHeight
                  if (containerRef.current.scrollTop < h * 1.06) {
                    containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
                  } else {
                    containerRef.current.scrollTop -= scrollBy
                  }
                }
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
                if (containerRef.current) {
                  const h = containerRef.current!.clientHeight
                  if (containerRef.current.scrollTop < h) {
                    containerRef.current.scrollTo({ top: h, behavior: 'smooth' })
                  } else {
                    containerRef.current.scrollTop += scrollBy
                  }
                }
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
  }, [hasFocus])

  useEffect(() => {
    const handle = setInterval(() => {
      setN((value) => ((value + 1) % 4) as any)
    }, 2000)

    return () => clearInterval(handle)
  }, [])

  if (!hasLastPhoto) {
    return (
      <div ref={containerRef} className={styles.container}>
        <div className={styles.fan2023}>
          <h1 className={styles[`c${n + 1}`]}>¡Feliz Año Nuevo 2023!</h1>
        </div>

        <div className={styles.people}>
          <h1>@melchor9000 / @melchor629</h1>
          <h2>El hacedor del juego</h2>
        </div>

        <div className={styles.people}>
          <h1>Termina el juego</h1>
          <h2>para ver todos los créditos</h2>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.fan2023}>
        <h1 className={styles[`c${n + 1}`]}>¡Feliz Año Nuevo 2023!</h1>
      </div>

      <div className={styles.people}>
        <h1>@melchor9000 / @melchor629</h1>
        <h2>El hacedor del juego</h2>
      </div>

      {!hasLastPhoto && (
        <div className={styles.people}>
          <h1>Termina el juego</h1>
          <h2>para ver todos los créditos</h2>
        </div>
      )}

      {hasLastPhoto && (
        <>
          <div className={styles.people}>
            <h1>Participantes de la encuesta</h1>
            <h2>¡Por ayudar a darle vida al juego!</h2>
          </div>

          <div className={styles.people}>
            <h1>@Exoddus21</h1>
            <h2>Traducción (japonés)</h2>
          </div>

          <div className={styles.people}>
            <h1>golfillo</h1>
            <h2>Por proveer material audiovisual diverso</h2>
          </div>

          <div className={styles.people}>
            <h1>A tí</h1>
            <h2>Por jugar al juego</h2>
          </div>

          <div className={clsx(styles['other-credits'], styles.center)}>
            <div>
              Juego realizado con <Link href="https://reactjs.org">react</Link> y{' '}
              <Link href="https://threejs.org">three.js</Link>. Con la ayuda de{' '}
              <Link href="https://react-spring.dev">react-spring</Link> y{' '}
              <Link href="https://docs.pmnd.rs/zustand">Zustand</Link>.
            </div>

            <div>
              Sprites hechos con <Link href="https://piskelapp.com">Piskel</Link>.
            </div>

            <div>
              Este juego contiene referencias a <em>Sa Comunitat d'en Penereta</em>. Derechos
              reservados a los creadores de semejante material.
            </div>

            <div>
              Este juego contiene recursos obtenidos de{' '}
              <Link href="https://omori.fandom.com/wiki">esta wiki</Link>. Los derechos son
              propiedad de los creadores de ese videojuego.
            </div>

            <div>
              Puedes encontrar el código fuente del juego{' '}
              <Link href="https://github.com/melchor629/hny/tree/master/packages/2023">
                en GitHub
              </Link>
              .
            </div>

            <div>~ 2022 ~</div>
          </div>
        </>
      )}
    </div>
  )
}
