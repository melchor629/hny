import { useMemo } from 'react'
import { useAssetManifest } from '../hooks/use-asset'
import { PixiMovie } from '../types/pixi-movie'

export default function SpritesheetImage({
  spritesheet,
  frame,
  scale,
  position,
}: {
  spritesheet: PixiMovie
  frame: string
  scale?: number
  position?: string
}) {
  const f = useMemo(() => spritesheet.frames[frame], [spritesheet, frame])
  const assetManifest = useAssetManifest('texture', spritesheet.meta.image)

  if (!f || !assetManifest) {
    return null
  }

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <div
        style={{
          width: `${f.sourceSize.w}px`,
          height: `${f.sourceSize.h}px`,
          backgroundImage: `url('${assetManifest.src}')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: `${-f.frame.x}px ${-f.frame.y}px`,
          backgroundSize: `${spritesheet.meta.size.w}px ${spritesheet.meta.size.h}px`,
          imageRendering: 'pixelated',
          transform: `scale(${(scale ?? 1) / 1.0666666666666666})`,
          transformOrigin: position || 'center center',
        }}
      />
    </div>
  )
}
