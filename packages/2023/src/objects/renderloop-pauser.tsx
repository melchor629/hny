import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import useInput from '../hooks/use-input'

export default function RenderloopPauser() {
  const input = useInput()
  const setFrameloop = useThree((s) => s.setFrameloop)

  useEffect(
    () =>
      input.onFocusChange((focus) => {
        // inventory consumes a lot of resources, so pause the frameloop/renderloop when inventory is open
        // menu does not make sense to render anything
        if (focus === 'inventory' || focus === 'menu') {
          setFrameloop('never')
        } else {
          setFrameloop('always')
        }
      }),
    [],
  )

  return null
}
