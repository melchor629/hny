import spritesheet from '../../data/spritesheets/whodis.json'
import type { Npc } from '../../types/map'

const leuhm: Npc = {
  id: '???',
  size: { w: 32, h: 32 },
  boundingBox: { x1: 32, y1: 32, x2: 32, y2: 32 },
  states: {
    rest: {
      spritesheet,
      frames: [
        { name: 'whodis0.png', duration: 5 },
        { name: 'whodis1.png', duration: 0.25 },
      ],
    },
  },
  renderOrderAddToY: 120,
}

export default leuhm
