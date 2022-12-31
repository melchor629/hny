import spritesheet from '../spritesheets/tomeu.json'
import type { Npc } from '../../types/map'

const tomeuQuely: Npc = {
  id: 'tomeu-quely',
  size: { w: 32, h: 32 },
  boundingBox: { x1: 2, y1: 22, x2: 18, y2: 32 },
  states: {
    rest: {
      spritesheet,
      frames: [
        { name: 'tomeu0.png', duration: 1 },
        { name: 'tomeu1.png', duration: 1 },
        { name: 'tomeu0.png', duration: 1 },
        { name: 'tomeu3.png', duration: 0.5 },
        { name: 'tomeu0.png', duration: 1 },
        { name: 'tomeu2.png', duration: 1 },
        { name: 'tomeu0.png', duration: 1 },
        { name: 'tomeu3.png', duration: 0.5 },
      ],
    },
    back: {
      spritesheet,
      frames: [{ name: 'tomeu4.png', duration: 10 }],
    },
    front: {
      spritesheet,
      frames: [{ name: 'tomeu0.png', duration: 10 }],
    },
  },
}

export default tomeuQuely
