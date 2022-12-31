import { animated, useTransition } from '@react-spring/web'
import { useEffect, useMemo, useRef, useState } from 'react'
import photos from '../../data/photos'
import useInput from '../../hooks/use-input'
import useInventory, { State as InventoryState } from '../../hooks/use-inventory'
import clsx from '../../utils/clsx'
import repeatingAction from '../../utils/repeating-action'
import { Github, Instagram, PersonHeart, Twitter } from '../icons'
import Video from '../video'
import styles from './inventory-book.module.scss'

const selector = (state: InventoryState) => state.book
const selector2 = (state: InventoryState) => state.markPhotoAsOpened
const whoTypeElements = Object.freeze({
  github: <Github />,
  instagram: <Instagram />,
  nick: <PersonHeart />,
  twitter: <Twitter />,
})

export default function InventoryBook({ hasFocus }: { hasFocus: boolean }) {
  const originalBook = useInventory(selector)
  const [selectedPhoto, setSelectedPhoto] = useState<string>(originalBook[0]?.id)
  const [openedPhoto, setOpenedPhoto] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const input = useInput('inventory')
  const book = useMemo(
    () =>
      originalBook.map((p) => [p, photos[p.id]] as const).filter(([p, i]) => i.tip || p.discovered),
    [originalBook],
  )

  useEffect(() => {
    if (hasFocus && !openedPhoto) {
      let repeatingActionUnsubscribe: (() => void) | null = null
      const nextPhoto = () =>
        setSelectedPhoto((s) => {
          const idx = book.findIndex(([p]) => p.id === s)
          if (idx !== -1) {
            return book[idx === book.length - 1 ? 0 : idx + 1][0].id
          }

          return s
        })
      const prevPhoto = () =>
        setSelectedPhoto((s) => {
          const idx = book.findIndex(([p]) => p.id === s)
          if (idx !== -1) {
            return book[idx === 0 ? book.length - 1 : idx - 1][0].id
          }

          return s
        })
      const fns = [
        input.forKey('up').subscribe({
          press() {
            repeatingActionUnsubscribe?.()
            repeatingActionUnsubscribe = repeatingAction(prevPhoto, 250, 500, true)
          },
          release() {
            repeatingActionUnsubscribe?.()
          },
        }),
        input.forKey('down').subscribe({
          press() {
            repeatingActionUnsubscribe?.()
            repeatingActionUnsubscribe = repeatingAction(nextPhoto, 250, 500, true)
          },
          release() {
            repeatingActionUnsubscribe?.()
          },
        }),
      ]

      return () => {
        repeatingActionUnsubscribe?.()
        fns.map((fn) => fn())
      }
    }

    return () => {}
  }, [book, openedPhoto, hasFocus])

  useEffect(() => {
    if (hasFocus) {
      return input.forKey('interact').subscribe({
        release() {
          if (book.find(([p]) => p.id === selectedPhoto)?.[0].discovered) {
            setOpenedPhoto((v) => (v ? null : selectedPhoto))
          }
        },
      })
    }

    return () => {}
  }, [book, selectedPhoto, hasFocus])

  useEffect(() => {
    containerRef?.current
      ?.querySelector(`[id="inventory-photo-${selectedPhoto}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [selectedPhoto])

  useEffect(() => {
    if (!hasFocus) {
      setOpenedPhoto(null)
    }
  }, [hasFocus])

  useEffect(() => {
    if (openedPhoto) {
      return input.showTouchBack()
    }

    return () => {}
  }, [openedPhoto])

  if (book.length === 0) {
    // this should never happen, but while developing... shit happens
    return (
      <div ref={containerRef} className={styles.container}>
        <div className={styles.empty}>
          <span>Empty, but there should be something here...</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <div ref={containerRef} className={styles.container}>
        {book.map(([photo, info]) => (
          <div
            key={photo.id}
            id={`inventory-photo-${photo.id}`}
            className={clsx(
              styles.element,
              hasFocus && photo.id === selectedPhoto && styles['element-selected'],
            )}
            onMouseMove={
              photo.discovered
                ? () => hasFocus && photo.id !== selectedPhoto && setSelectedPhoto(photo.id)
                : undefined
            }
            onClick={
              photo.discovered
                ? () => hasFocus && [setOpenedPhoto(photo.id), setSelectedPhoto(photo.id)]
                : undefined
            }
          >
            <div
              className={styles['element-photo']}
              style={{
                imageRendering: 'pixelated',
                backgroundImage: `url('${
                  photo.discovered ? info.thumbnailPath : 'assets/photos/unknown.png'
                }')`,
              }}
              onClick={photo.discovered ? () => setOpenedPhoto(photo.id) : undefined}
            />
            {photo.discovered && <div className={styles['element-content']}>{info.text}</div>}
            {!photo.discovered && <div className={styles['element-content']}>{info.tip}</div>}
            {photo.discovered && !photo.opened && <div className={styles['element-new']}>NEW!</div>}
          </div>
        ))}
      </div>
      <NicePhoto photoId={openedPhoto} />
    </>
  )
}

function NicePhoto({ photoId }: { photoId: string | null }) {
  const markAsOpened = useInventory(selector2)
  const transition = useTransition(photoId ? [photoId] : [], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  useEffect(() => {
    if (photoId) {
      markAsOpened(photoId)
    }
  }, [photoId])

  return (
    <>
      {transition((values, item) => {
        if (item === 'photo-21') {
          return (
            <animated.div className={styles['big-photo']} style={values}>
              <figure>
                <Video src="photo-21" />
                <figcaption>
                  {photos[item].text}
                  {photos[item].who && (
                    <span>
                      {' – '}
                      {photos[item].whoType && whoTypeElements[photos[item].whoType!]}
                      <em>{photos[item].who}</em>
                    </span>
                  )}
                </figcaption>
              </figure>
            </animated.div>
          )
        }

        if (item) {
          return (
            <animated.div className={styles['big-photo']} style={values}>
              <figure>
                <img src={photos[item].path} alt={`Fotografía ${photoId}`} />
                <figcaption>
                  {photos[item].text}
                  {photos[item].who && (
                    <span>
                      {' – '}
                      {photos[item].whoType && whoTypeElements[photos[item].whoType!]}
                      <em>{photos[item].who}</em>
                    </span>
                  )}
                </figcaption>
              </figure>
            </animated.div>
          )
        }

        return false
      })}
    </>
  )
}
