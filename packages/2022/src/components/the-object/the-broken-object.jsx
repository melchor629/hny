import { meshBounds, useAnimations, useGLTF } from '@react-three/drei'
import { shuffle } from 'lodash-es'
import { useCallback, useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import { objectBrokenUrl, farExplosionUrl } from '../../constants'
import { useParts } from '../../hooks'
import { usePartStore, usePartyStore } from '../../stores'
import ThePositionalAudio from '../the-positional-audio'

const timing = [0, 4.33],
  valuesOpacity = [1, 0],
  valuesScale = [1, 0.75]
const disappearAnimationClip = new THREE.AnimationClip(null, timing[1], [
  new THREE.NumberKeyframeTrack('.scale[x]', timing, valuesScale, THREE.InterpolateSmooth),
  new THREE.NumberKeyframeTrack('.scale[y]', timing, valuesScale, THREE.InterpolateSmooth),
  new THREE.NumberKeyframeTrack('.scale[z]', timing, valuesScale, THREE.InterpolateSmooth),
  new THREE.NumberKeyframeTrack(
    '.material.opacity',
    timing,
    valuesOpacity,
    THREE.InterpolateSmooth,
  ),
])

const visitedAnimationClip = new THREE.AnimationClip(null, 2, [
  new THREE.NumberKeyframeTrack(
    '.material.opacity',
    [0, 1.5, 2],
    [1, 1, 0.25],
    THREE.InterpolateSmooth,
  ),
])

const TheBrokenObject = (props) => {
  const group = useRef()
  const { scene, animations } = useGLTF(objectBrokenUrl)
  const { actions, mixer } = useAnimations(animations, group)
  const parts = useParts()

  useLayoutEffect(() => {
    const { colour } = usePartyStore.getState()
    scene.traverse((o) => {
      if (o.type === 'Mesh') {
        o.material.color = colour
        o.material.emissive = colour
      }
    })
  }, [])
  useLayoutEffect(() => {
    // NOTE: enumerate actions takes a lot of time because each action is created during enumeration
    Object.values(actions).forEach((action) => {
      action.repetitions = 0
      action.clampWhenFinished = true
      action.play()
    })

    // NOTE: there are 310 objects (309 in fact)
    // NOTE: this section without pre-computed AABB is slow
    const objects = group.current.children
      .filter((object) => object.geometry)
      .map((object) => [object, object.geometry.boundingBox.getSize(new THREE.Vector3())])
      .sort(([, a], [, b]) => a.x ** 2 + a.y ** 2 + a.z ** 2 - (b.x ** 2 + b.y ** 2 + b.z ** 2))
    const count = objects.length - Object.keys(parts).length
    const disappearObjects = objects.slice(0, count)
    const keepObjects = objects.slice(count)
    const shuffledPartKeys = shuffle(Object.keys(parts))
    disappearObjects.forEach(([object]) => {
      const { name } = object
      const action = mixer.clipAction(disappearAnimationClip, object)
      action.name = `${name}:to-remove`
      action.repetitions = 0
      action.clampWhenFinished = true
      action.play()
    })
    keepObjects.forEach(([object], i) => {
      // same as in object-full.js
      object.raycast = meshBounds
      object.userData.partId = shuffledPartKeys[i]
      // clone material for kept objects, so they have independent properties
      object.material = object.material.clone()
    })

    mixer.addEventListener('finished', ({ action }) => {
      if (action.name && action.name.endsWith(':to-remove')) {
        action.getRoot().removeFromParent()
      }
    })
  }, [])

  const up = useCallback(
    (ev) => {
      // allow click only when animation is finished
      // I know, this is a bit ugly...
      if (group.current.children.length <= 30) {
        usePartStore.getState().selectPart({
          id: ev.object.userData.partId,
          position: ev.object.getWorldPosition(new THREE.Vector3()),
        })

        // fade out a lot when the object is visited
        if (!ev.object.userData.visited) {
          const action = mixer.clipAction(visitedAnimationClip, ev.object)
          action.repetitions = 0
          action.clampWhenFinished = true
          action.play()
          ev.object.userData.visited = true
        }

        const allSelected = group.current.children
          .filter((obj) => !!obj.geometry)
          .every((obj) => obj.userData.visited)
        if (allSelected) {
          usePartStore.getState().markAllVisited()
        }
      }
    },
    [group, mixer],
  )

  return (
    <group {...props}>
      <primitive ref={group} object={scene} onPointerUp={up} />
      <ThePositionalAudio
        url={farExplosionUrl}
        distance={1}
        autoplay
        loop={false}
        ref={(audio) => audio && audio.setVolume(0.5)}
      />
    </group>
  )
}

export default TheBrokenObject
