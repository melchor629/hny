import type { AnimatedProps } from '@react-spring/three'
import type { GroupProps } from '@react-three/fiber'
import { forwardRef, useEffect, useState } from 'react'
import type { Group } from 'three'
import {
  Caja1,
  Catto,
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
  Sticker1,
  Sticker2,
  Sticker3,
  Yubikey,
} from '../objects'

const objects = Object.freeze([
  Caja1,
  Catto,
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
  Sticker1,
  Sticker2,
  Sticker3,
  Yubikey,
])

const AllObjects = forwardRef<Group, AnimatedProps<GroupProps>>(function AllObjects(
  props,
  ref,
) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((v) => (v + 1) % objects.length), 2000)
    return () => clearInterval(id)
  }, [])

  const Component = objects[index]
  return <Component {...props} ref={ref} />
})

export default AllObjects
