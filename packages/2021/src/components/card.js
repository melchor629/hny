import { a, useSpring } from '@react-spring/three'
import { useGLTF } from '@react-three/drei'
import { debounce } from 'lodash-es'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useLoader, useThree } from 'react-three-fiber'
import { TextureLoader } from 'three'
import { useCardsStore, usePhasesStore } from '../stores'

const maxWindowSideSize = Math.max(window.screen.width, window.screen.height)
const textureSuffix = (() => {
  if (maxWindowSideSize <= 2000) {
    return '@1024'
  } else if (maxWindowSideSize <= 4000) {
    return '@2048'
  }

  return ''
})()

const canOpen = () => usePhasesStore.getState().phase === 4
const isOpen = (cardName) => useCardsStore.getState().openCard === cardName

function Card({ position, rotation, scale, cardName }) {
  const { gl, camera } = useThree()
  const cosa = useGLTF('assets/models/card.glb')
  const backTexture = useLoader(
    TextureLoader,
    `assets/textures/cards/${cardName}/back${textureSuffix}.png`,
  )
  const frontTexture = useLoader(
    TextureLoader,
    `assets/textures/cards/${cardName}/front${textureSuffix}.png`,
  )

  const [cardBack, cardFront] = useMemo(() => {
    const [, cardBackOriginal, cardFrontOriginal] = cosa.scenes[0].children
    const cardBack = cardBackOriginal.clone(true)
    const cardFront = cardFrontOriginal.clone(true)
    cardBack.material = cardBack.material.clone()
    cardFront.material = cardFront.material.clone()
    cardBack.material.map = frontTexture
    cardFront.material.map = backTexture
    cardFront.castShadow = true
    cardBack.castShadow = true
    return [cardBack, cardFront]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [frontProps, setFrontProps] = useSpring(() => ({
    position: [0, 0, 0.004079808946698904],
    rotation: [0, -Math.PI * 0.1, 0],
    config: { mass: 1, tension: 280, friction: 120 },
  }))
  const [backProps, setBackProps] = useSpring(() => ({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    config: { mass: 1, tension: 280, friction: 120 },
  }))
  const [groupProps, setGroupProps] = useSpring(() => ({
    position,
    rotation,
    scale,
    config: { mass: 1, tension: 280, friction: 120 },
  }))

  const open = useCallback(() => {
    cardFront.userData.open = true
    setFrontProps({
      position: [0, 0, 0.0],
      rotation: [0, -Math.PI * 0.95, 0],
    })
    setGroupProps({
      position: [camera.position.x, camera.position.y - 0.3, camera.position.z - 1.4],
      rotation: [(Math.PI / 180) * 10, 0, 0],
      scale: [5, 5, 5],
    })
    setBackProps({
      rotation: [0, -Math.PI * 0.05, 0],
    })
  }, [setFrontProps, setGroupProps, setBackProps, cardFront, camera])

  const close = useCallback(() => {
    cardFront.userData.open = false
    setFrontProps({
      position: [0, 0, 0.004079808946698904],
      rotation: [0, -Math.PI * 0.1, 0],
    })
    setGroupProps({
      position,
      rotation,
      scale,
    })
    setBackProps({
      rotation: [0, 0, 0],
    })
  }, [setFrontProps, setGroupProps, setBackProps, cardFront, position, rotation, scale])

  const toggleOpen = useMemo(
    () =>
      debounce(
        (e) => {
          if (!canOpen() || isOpen(cardName)) return
          if (e.pointerType !== 'mouse' || e.button === 0) {
            useCardsStore.getState().open(cardName)
          }
        },
        100,
        { leading: true, trailing: false },
      ),
    [cardName],
  )

  useEffect(() => {
    const unsub = useCardsStore.subscribe(
      (openCard) => {
        if (openCard === cardName) {
          open()
        } else {
          close()
        }
      },
      (state) => state.openCard,
      (a, b) => a === b,
    )

    return () => unsub()
  }, [cardName, open, close])

  useEffect(() => {
    let isDown = false
    let wasMoved = false
    let grabRotation = [(Math.PI / 180) * 10, 0, 0]
    let lastTouch = null
    const onPointerDown = () => {
      if (!canOpen() || !isOpen(cardName)) return
      isDown = true
      wasMoved = false
      setGroupProps((_, ctrl) => {
        ctrl.stop('rotation')
        ctrl.update({ rotation: grabRotation })
      })
    }
    const onPointerUp = (e) => {
      if (!canOpen()) return
      isDown = false
      lastTouch = null

      if (isOpen(cardName) && !wasMoved && (e.pointerType !== 'mouse' || e.button === 0)) {
        grabRotation = [(Math.PI / 180) * 10, 0, 0]
        useCardsStore.getState().close(cardName)
      }
    }
    const applyMove = (movementX, e) => {
      const c = (2 * Math.PI) / (e.target.clientHeight * 0.75)
      grabRotation[1] += movementX * c
      setGroupProps((_, ctrl) => {
        ctrl.stop('rotation')
        ctrl.update({ rotation: grabRotation })
      })
    }
    const onPointerMove = (e) => {
      if (!isDown || !isOpen(cardName) || !canOpen()) {
        isDown = false
        return
      }

      wasMoved = true
      const { movementX } = e
      applyMove(movementX, e)
    }
    const onTouchMove = (e) => {
      if (!isDown || !isOpen(cardName) || !canOpen()) {
        isDown = false
        lastTouch = null
        return
      }

      wasMoved = true
      if (lastTouch) {
        const movementX = e.touches[0].clientX - lastTouch.clientX
        applyMove(movementX, e)
      }

      ;[lastTouch] = e.touches
    }

    const { domElement } = gl
    domElement.addEventListener('pointerdown', onPointerDown, false)
    domElement.addEventListener('pointerup', onPointerUp, false)
    domElement.addEventListener('mousemove', onPointerMove, { passive: true })
    domElement.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      domElement.removeEventListener('pointerdown', onPointerDown, false)
      domElement.removeEventListener('pointerup', onPointerUp, false)
      domElement.removeEventListener('mousemove', onPointerMove, { passive: true })
      domElement.removeEventListener('touchmove', onTouchMove, { passive: true })
    }
  }, [cardName, gl, setGroupProps])

  return (
    <a.group rotation={rotation} scale={scale} {...groupProps} onPointerUp={toggleOpen}>
      <a.primitive object={cardBack} {...frontProps} />
      <a.primitive object={cardFront} {...backProps} />
    </a.group>
  )
}

Card.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number.isRequired),
  rotation: PropTypes.arrayOf(PropTypes.number.isRequired),
  scale: PropTypes.arrayOf(PropTypes.number.isRequired),
  cardName: PropTypes.string.isRequired,
}

Card.defaultProps = {
  position: [0, 0, 0],
  rotation: [(Math.PI / 180) * -1, (Math.PI / 180) * -35, 0],
  scale: [3, 3, 3],
}

export default Card