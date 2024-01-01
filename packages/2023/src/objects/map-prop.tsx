import { memo, useContext, useEffect, useMemo, useRef } from 'react'
import { Matrix3, Mesh, ShaderMaterial, Vector3 } from 'three'
import fragmentShader from '../data/shaders/prop.frag.glsl?raw'
import vertexShader from '../data/shaders/prop.vert.glsl?raw'
import useSpritesheet from '../hooks/use-spritesheet'
import { TileProp } from '../types/map'
import Map from './map'

const shader = new ShaderMaterial({
  transparent: true,
  vertexShader,
  fragmentShader,
  uniforms: {
    color: { value: null },
    uvTransform: { value: new Matrix3() },
  },
})

interface MapPropProps extends TileProp {
  flipVertical?: boolean
  flipHorizontal?: boolean
  onBeforeRender?: () => void
}

function MapProp({
  flipHorizontal,
  flipVertical,
  prop,
  x,
  y,
  onInteraction,
  onBeforeRender,
}: MapPropProps) {
  const [texture] = useSpritesheet(prop.texture?.spritesheet, prop.texture?.name)
  const mapUpdater = useContext(Map.Context)
  const meshRef = useRef<Mesh>(null)
  const renderOrder = useMemo(() => {
    if (prop.renderOrder != null) {
      return prop.renderOrder
    }

    if (prop.renderOrderAddToY != null) {
      return y + prop.renderOrderAddToY
    }

    if (prop.boundingBox) {
      return y + prop.boundingBox.y1 + (prop.boundingBox.y2 - prop.boundingBox.y1) * 0.45
    }

    return y + prop.size.h / 2
  }, [prop, y])

  const scale = useMemo(
    () => new Vector3(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1, 1),
    [flipHorizontal, flipVertical],
  )

  const instShader = useMemo(() => shader.clone(), [])

  useEffect(
    () =>
      mapUpdater({
        x,
        y,
        prop,
        onInteraction,
      }),
    [x, y, prop, onInteraction],
  )

  useEffect(() => {
    meshRef.current?.updateMatrixWorld()
  }, [x, y, prop])

  useEffect(() => {
    instShader.uniforms.color.value = texture
    if (texture?.matrix) {
      instShader.uniforms.uvTransform.value.copy(texture.matrix)
    } else {
      instShader.uniforms.uvTransform.value.identity()
    }
  }, [instShader, texture])

  if (!texture) {
    return null
  }

  return (
    <mesh
      ref={meshRef}
      position={[x + prop.size.w / 2, -y - prop.size.h / 2, 0]}
      renderOrder={renderOrder}
      scale={scale}
      onBeforeRender={onBeforeRender}
    >
      <planeGeometry args={[prop.size.w, prop.size.h]} />
      <primitive object={instShader} />
    </mesh>
  )
}

export default memo(MapProp)
