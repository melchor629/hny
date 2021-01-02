import React, { useMemo } from 'react'
import { useLoader, useThree, useUpdate } from 'react-three-fiber'
import { TextureLoader, Vector3 } from 'three'
import useGameSettings from '../hooks/use-game-settings/use-game-settings'
import { usePhasesStore } from '../stores'

const Background = (props) => {
  const { camera, viewport } = useThree()
  const { width, height } = viewport
  const { backgroundSuffix } = useGameSettings()
  const [bg1, bg2, bg3, bg4] = [
    useLoader(TextureLoader, `assets/textures/background/1${backgroundSuffix}`),
    useLoader(TextureLoader, `assets/textures/background/2${backgroundSuffix}`),
    useLoader(TextureLoader, `assets/textures/background/3${backgroundSuffix}`),
    useLoader(TextureLoader, `assets/textures/background/4${backgroundSuffix}`),
  ]
  const { phase } = usePhasesStore()
  const bgRef = useUpdate(
    (bg) => {
      const vec = new Vector3(-1.81241, 2.21982, -5)
      vec.applyQuaternion(camera.quaternion)
      bg.position.copy(vec)

      const size = 1.68
      const aspect = width / height
      bg.scale.set(size, size / aspect, 0)
    },
    [camera, width, height],
  )
  const bg = useMemo(() => {
    if (phase <= 1) {
      return bg1
    } else if (phase === 2) {
      return bg2
    } else if (phase === 3) {
      return bg3
    } else {
      return bg4
    }
  }, [phase, bg1, bg2, bg3, bg4])

  return (
    <sprite {...props} ref={bgRef}>
      <spriteMaterial map={bg} sizeAttenuation={false} />
    </sprite>
  )
}

export default Background
