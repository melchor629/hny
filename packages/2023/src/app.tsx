import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GameCanvas from './canvas'
import Hud from './ui/hud'
import InputHandler from './ui/input/input-handler'

const rect = { w: 320, h: 180, s: 2 }

function main() {
  const element = document.getElementById('app')!
  const root = createRoot(element)

  root.render(
    <StrictMode>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
        onPointerDown={onPointerDown}
      >
        <InputHandler>
          <GameCanvas width={rect.w} height={rect.h} scale={rect.s} />
          <Hud width={rect.w} height={rect.h} scale={rect.s} />
        </InputHandler>
      </div>
    </StrictMode>,
  )
}

function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
  if (e.pointerType !== 'mouse') {
    return
  }

  e.currentTarget.requestPointerLock()
}

export default main
