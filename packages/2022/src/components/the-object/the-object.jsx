import { useCallback, useEffect, useRef } from 'react'
import { shallow } from 'zustand/shallow'
import TheFullObject from './the-full-object'
import TheBrokenObject from './the-broken-object'
import { usePartyStore } from '../../stores'

const TheObject = (props) => {
  const [partyEnded, markExploding] = usePartyStore(
    ({ endParty, markExploding }) => [endParty, markExploding],
    shallow,
  )
  const pointerDataRef = useRef({
    initialPosition: null,
  })

  useEffect(() => {
    document.body.style.cursor = 'default'
  }, [partyEnded])

  const changeToPointer = useCallback(() => {
    document.body.style.cursor = 'pointer'
  }, [])

  const changeToDefault = useCallback(() => {
    document.body.style.cursor = 'default'
    pointerDataRef.current.initialPosition = null
  }, [])

  const handlePointerDown = useCallback((e) => {
    pointerDataRef.current.initialPosition = [e.offsetX, e.offsetY]
  })

  const handlePointerUp = useCallback(
    (e) => {
      const { initialPosition } = pointerDataRef.current
      if (!initialPosition) {
        return
      }

      const position = [e.offsetX, e.offsetY]
      const distance = Math.sqrt(
        (position[0] - initialPosition[0]) ** 2 + (position[1] - initialPosition[1]) ** 2,
      )
      if (distance < 20) {
        markExploding()
      }

      pointerDataRef.current.initialPosition = null
    },
    [markExploding],
  )

  if (partyEnded) {
    // NOTE: add both models are in the preload object so their geometries
    // are loaded into the GPU when <Preload all /> is running
    return <TheBrokenObject {...props} />
  }

  return (
    <TheFullObject
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOver={changeToPointer}
      onPointerLeave={changeToDefault}
      {...props}
    />
  )
}

export default TheObject
