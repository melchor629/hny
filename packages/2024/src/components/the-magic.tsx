import { config, useSpringValue } from '@react-spring/three'
import { ThreeEvent } from '@react-three/fiber'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  changingOpening,
  closed,
  finishAppearing,
  opened,
  opening,
  useGiftStatus,
} from '../hooks/use-gift-status'
import {
  Caja1,
  Disco1,
  Disco2,
  Disco3,
  Esp32,
  Gorro,
  Lapiz,
  Libro1,
  Libro2,
  Libro3,
  MasterChief,
  Meme,
  Monedo,
  Pendrive,
  Pin1,
  Pin2,
  Protoboard,
  RaspberryPi3b,
  Regalo,
  Sticker1,
  Sticker2,
  Sticker3,
  Yubikey,
  getObject,
} from '../objects'
import AllObjects from './all-objects'
import TheCatto from './the-catto'

const objectIdToComponent = Object.freeze({
  ['caja-1']: Caja1,
  ['catto']: TheCatto,
  ['disco-1']: Disco1,
  ['disco-2']: Disco2,
  ['disco-3']: Disco3,
  ['esp-32']: Esp32,
  ['gorro']: Gorro,
  ['lapiz']: Lapiz,
  ['libro-1']: Libro1,
  ['libro-2']: Libro2,
  ['libro-3']: Libro3,
  ['master-chief']: MasterChief,
  ['meme']: Meme,
  ['monedo']: Monedo,
  ['pendrive']: Pendrive,
  ['pin-1']: Pin1,
  ['pin-2']: Pin2,
  ['protoboard']: Protoboard,
  ['raspbery-pi']: RaspberryPi3b,
  ['sticker-1']: Sticker1,
  ['sticker-2']: Sticker2,
  ['sticker-3']: Sticker3,
  ['yubikey']: Yubikey,

  ['all']: AllObjects,
})

export default function TheMagic() {
  const pointerDataRef = useRef({ pos: null as null | readonly [x: number, y: number] })
  const [state, gift] = useGiftStatus(useCallback((s) => [s.state, s.gift] as const, []))
  const isAppearing = state === 'appearing' || state === 'welcome'
  const isOpen = state !== 'closed' && !isAppearing
  const giftScaleSpringValue = useSpringValue(isOpen || isAppearing ? 0 : 1, {
    config: { precision: 0.0001, ...(isAppearing ? config.wobbly : config.default) },
  })
  const objectScaleSpringValue = useSpringValue(isOpen ? 1 : 0, {
    config: { precision: 0.0001 },
  })
  const giftTopRotationSpringValue = useSpringValue(isOpen ? 1 : 0, {
    config: { precision: 0.0001, bounce: 1, mass: 2, tension: 280, friction: 12 },
  })

  const objectScaleValue = useMemo(
    () => objectScaleSpringValue.to((t) => [t, t, t] as const),
    [objectScaleSpringValue],
  )
  const object = useMemo(() => (gift ? getObject(gift) : null), [gift])

  const ObjectComponent = useMemo(() => (object ? objectIdToComponent[object.id] : null), [object])

  const onGiftPointerUp = useCallback((e: ThreeEvent<PointerEvent>) => {
    const { pos } = pointerDataRef.current
    if (pos) {
      const distance = Math.sqrt((e.offsetX - pos[0]) ** 2 + (e.offsetY - pos[1]) ** 2)
      if (distance < 20) {
        opening()
      }
    }
  }, [])

  const onGiftPointerEnter = useCallback(() => {
    if (state === 'closed') {
      document.body.style.cursor = 'pointer'
    }
  }, [state])

  const onGiftPointerLeave = useCallback(() => {
    document.body.style.cursor = 'default'
    pointerDataRef.current.pos = null
  }, [])

  const onGiftPointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (state === 'closed') {
        pointerDataRef.current.pos = [e.offsetX, e.offsetY]
      }
    },
    [state],
  )

  useEffect(
    () =>
      void (async () => {
        if (state === 'appearing') {
          await giftScaleSpringValue.start(1)
          finishAppearing()
        } else if (state === 'opening') {
          document.body.style.cursor = 'default'
          pointerDataRef.current.pos = null
          await Promise.all([
            giftTopRotationSpringValue.start(1),
            giftScaleSpringValue.start(0, { delay: 750, config: config.default }),
          ])
          await objectScaleSpringValue.start(1)
          opened()
        } else if (state === 'closing') {
          giftTopRotationSpringValue.start(0)
          await objectScaleSpringValue.start(0)
          await giftScaleSpringValue.start(1, { delay: 0, config: config.wobbly })
          closed()
        } else if (state === 'changing-closing') {
          await objectScaleSpringValue.start(0)
          changingOpening()
        } else if (state === 'changing-opening') {
          await objectScaleSpringValue.start(1)
          opened()
        }
      })(),
    [state],
  )

  useEffect(() => {
    if (state === 'opened') {
      objectScaleSpringValue.start(1, { from: 0 })
    }
  }, [])

  return (
    <>
      <Regalo
        scale={useMemo(
          () => giftScaleSpringValue.to((t) => [t, t, t] as const),
          [giftScaleSpringValue],
        )}
        tapaProps={{
          // @ts-expect-error
          rotation: useMemo(
            () =>
              giftTopRotationSpringValue.to(
                (t) => [0, 0, (t * 20 * Math.PI) / 180, 'XYZ'] as const,
              ),
            [giftTopRotationSpringValue],
          ),
          position: useMemo(
            () => giftTopRotationSpringValue.to((t) => [-t * 0.15, 1 + t * 0.5, 0] as const),
            [giftTopRotationSpringValue],
          ),
          castShadow: true,
          receiveShadow: true,
        }}
        cajaProps={{
          castShadow: true,
          receiveShadow: true,
        }}
        onPointerEnter={onGiftPointerEnter}
        onPointerMove={onGiftPointerEnter}
        onPointerLeave={onGiftPointerLeave}
        onPointerDown={onGiftPointerDown}
        onPointerUp={onGiftPointerUp}
      />

      {ObjectComponent && <ObjectComponent scale={objectScaleValue} />}
    </>
  )
}
