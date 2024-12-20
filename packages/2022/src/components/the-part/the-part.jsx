import { animated, useTransition } from '@react-spring/web'
import { noop } from 'lodash-es'
import { useCallback, useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import { getTrackInfo } from '../../fns'
import { useParts } from '../../hooks'
import { usePartStore } from '../../stores'
import TheCloseButton from './the-close-button'
import TheTrack from './the-track'
import styles from './the-part.module.scss'
import { Vector3 } from 'three'

const reactions = Object.freeze({
  think: 'Reflexión',
  say: 'Frase',
  m_say: 'Frases',
  moment: 'Momento',
  default: 'Momento',
})

const ThePart = () => {
  const parts = useParts()
  const [selectedPart, trackInfo, unselectPart, setTrackInfo, allVisited, selectPart] =
    usePartStore(
      (s) => [
        s.selectedPart,
        s.selectedPartTrackInfo,
        s.unselectPart,
        s.setTrackInfo,
        s.allVisited,
        s.selectPart,
      ],
      shallow,
    )
  // this is to hold the information while the "dialog" is closing
  const [part, setPart] = useState(null)
  const transitions = useTransition(!!selectedPart && !!part, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    // delay animation only when fading in, not when fading out
    delay: useCallback(() => (!!selectedPart && !!part ? 1000 : 0), [selectedPart, part]),
    // clear cached part info after animation (not before)
    onRest: { opacity: useCallback(() => !selectedPart && setPart(null), [selectedPart]) },
  })
  const [showAllVisited, setShowAllVisited] = useState(0)

  useEffect(() => {
    const handler = ({ code, key }) => {
      // muscular memory is incredible
      if ((code || key || '').toLowerCase() === 'escape') {
        unselectPart()
      }
    }

    window.addEventListener('keyup', handler, false)
    return () => window.removeEventListener('keyup', handler, false)
  }, [unselectPart])

  useEffect(() => {
    // prepares to show the congratulations
    if (allVisited && !showAllVisited) {
      setTimeout(() => setShowAllVisited(1), 3500)
    }
  }, [allVisited, showAllVisited])

  useEffect(() => {
    // show the congratulations
    if (allVisited && showAllVisited === 1 && !selectedPart && !part) {
      selectPart({
        id: 'enhorabuena',
        position: new Vector3(0, 0, 0),
      })
      setShowAllVisited(2)
    }
  }, [allVisited, showAllVisited, selectedPart, part])

  const { id: partKey } = selectedPart || {}
  useEffect(() => {
    if (partKey === 'conejo') {
      setPart({
        text: 'Never gonna give you up, never gonna let you down... Sip, te ha pasado...',
        image: {
          description: 'you know him already...',
          assets: [
            { url: './assets/image/rr.webp', type: 'image/webp' },
            { url: './assets/image/rr.jpg', type: 'image/jpeg' },
          ],
        },
        trackId: '4cOdK2wGLETKBW3PvgPWqT',
        author: 'el desarrollador',
      })
    } else if (partKey === 'enhorabuena') {
      setPart({
        text: '¡Enhorabuena! Has visitado todos los momentos. ¡Espero que hayas disfrutado!',
        author: 'el desarrollador',
        trackId: '3XFqW9PbzMBy6wV06egJQ2',
        reaction: 'say',
      })
    } else if (partKey) {
      setPart(parts[partKey])
    }
  }, [partKey, parts])

  const { trackId } = part || {}
  useEffect(() => {
    if (selectedPart && trackId) {
      getTrackInfo(trackId)
        .then((trackInfo) => {
          setTrackInfo(trackInfo)
          setPart((part) => ({ ...part, trackInfo }))
        })
        .catch(noop)
    } else {
      setTrackInfo(null)
    }
  }, [selectedPart, trackId, setTrackInfo])

  return transitions(
    (props, show) =>
      show &&
      part && (
        <animated.div className={styles['backdrop-container']} style={props}>
          <div className={styles.container}>
            <h1>
              {reactions[part.reaction] || reactions.default}
              {part.author ? ` de ${part.author}` : ' de alguien'}
            </h1>
            <div className={styles.text}>{part.text}</div>
            {part.image && (
              <div className={styles.image}>
                {part.image.url && <img src={part.image.url} alt={part.image.description} />}
                {part.image.assets && (
                  <picture>
                    {part.image.assets.map(({ url, type }) => (
                      <source key={type} srcSet={url} type={type} />
                    ))}
                    <img src={part.image.assets.slice(-1)[0].url} alt={part.image.description} />
                  </picture>
                )}
              </div>
            )}
            {part.trackId && <TheTrack trackInfo={trackInfo || part.trackInfo} />}
            <TheCloseButton onClick={unselectPart} />
          </div>

          <TheCloseButton floating onClick={unselectPart} />
        </animated.div>
      ),
  )
}

export default ThePart
