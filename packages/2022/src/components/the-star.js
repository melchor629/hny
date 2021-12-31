import { meshBounds } from '@react-three/drei'
import { useCallback } from 'react'
import { Color, Vector3 } from 'three'
import { temperatureToColour } from '../fns'
import { usePartyStore, usePartStore } from '../stores'

const starColour = new Color(...Object.values(temperatureToColour(4500.0)).map((c) => c / 255.0))

const TheStar = () => {
  const partyEnded = usePartyStore((s) => s.endParty)
  const selectPart = usePartStore((s) => s.selectPart)

  const onStarClicked = useCallback(
    (ev) => {
      if (partyEnded) {
        selectPart({
          id: 'conejo',
          position: ev.object.getWorldPosition(new Vector3()),
        })
      }
    },
    [selectPart, partyEnded],
  )

  return (
    <>
      <ambientLight args={[starColour, 0.05]} />
      <directionalLight args={[starColour, 0.5]} position={[0.5, 1, 1.5]} />
      <mesh
        name="the-star"
        position={[0.5 * 100, 1 * 100, 1.5 * 100]}
        onPointerUp={onStarClicked}
        raycast={meshBounds}
      >
        <sphereGeometry args={[2, 16, 8]} />
        <meshStandardMaterial color={starColour} emissive={starColour} />
      </mesh>
    </>
  )
}

export default TheStar
