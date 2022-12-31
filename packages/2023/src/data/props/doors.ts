import type { Prop } from '../../types/map'
import spritesheet from '../spritesheets/doors.json'

// BASE PROPS \\
const door = {
  size: { w: 34, h: 34 },
}

const door0 = {
  ...door,
  boundingBox: { x1: 1, y1: 16, x2: 4, y2: 34 },
  texture: {
    name: 'doors0.png',
    spritesheet,
  },
}

const door1 = {
  ...door,
  boundingBox: { x1: 2, y1: 16, x2: 5, y2: 34 },
  texture: {
    name: 'doors1.png',
    spritesheet,
  },
}

const door2 = {
  ...door,
  boundingBox: { x1: 0, y1: 30, x2: 13, y2: 34 },
  renderOrderAddToY: 25,
  texture: {
    name: 'doors2.png',
    spritesheet,
  },
}

const door3 = {
  ...door,
  boundingBox: { x1: 0, y1: 30, x2: 13, y2: 34 },
  renderOrderAddToY: 25,
  texture: {
    name: 'doors3.png',
    spritesheet,
  },
}

const door4 = {
  ...door,
  boundingBox: { x1: 1, y1: 16, x2: 4, y2: 34 },
  texture: {
    name: 'doors4.png',
    spritesheet,
  },
}

const door5 = {
  ...door,
  boundingBox: { x1: 1, y1: 16, x2: 4, y2: 34 },
  texture: {
    name: 'doors5.png',
    spritesheet,
  },
}

const door6 = {
  ...door,
  boundingBox: { x1: 0, y1: 30, x2: 13, y2: 34 },
  renderOrderAddToY: 25,
  texture: {
    name: 'doors6.png',
    spritesheet,
  },
}

const door7 = {
  ...door,
  boundingBox: { x1: 0, y1: 30, x2: 13, y2: 34 },
  renderOrderAddToY: 25,
  texture: {
    name: 'doors7.png',
    spritesheet,
  },
}

// RIGHT \\
export const doorClosedRightUpProp: Prop = {
  type: 'door:closed:right-up',
  ...door1,
}

export const doorClosedRightDownProp: Prop = {
  type: 'door:closed:right-down',
  ...door0,
}

export const doorOpenedRightUpProp: Prop = {
  type: 'door:opened:right-up',
  ...door2,
}

export const doorOpenedRightDownProp: Prop = {
  type: 'door:opened:right-down',
  ...door3,
}

// LEFT \\
export const doorClosedLeftUpProp: Prop = {
  type: 'door:closed:left-up',
  ...door5,
}

export const doorClosedLeftDownProp: Prop = {
  type: 'door:closed:left-down',
  ...door4,
}

export const doorOpenedLeftUpProp: Prop = {
  type: 'door:opened:left-up',
  ...door3,
}

export const doorOpenedLeftDownProp: Prop = {
  type: 'door:opened:left-down',
  ...door2,
}

// TOP \\
export const doorClosedTopLeftProp: Prop = {
  type: 'door:closed:top-left',
  ...door2,
  size: { w: 27, h: 34 },
}

export const doorClosedTopRightProp: Prop = {
  type: 'door:closed:top-right',
  ...door7,
  size: { w: 27, h: 34 },
}

export const doorOpenedTopLeftProp: Prop = {
  type: 'door:opened:top-left',
  ...door4,
}

export const doorOpenedTopRightProp: Prop = {
  type: 'door:opened:top-right',
  ...door0,
}

// BOTTOM \\
export const doorClosedBottomLeftProp: Prop = {
  type: 'door:closed:bottom-left',
  ...door3,
  size: { w: 27, h: 34 },
}

export const doorClosedBottomRightProp: Prop = {
  type: 'door:closed:bottom-right',
  ...door6,
  size: { w: 27, h: 34 },
}

export const doorOpenedBottomLeftProp: Prop = {
  type: 'door:opened:bottom-left',
  ...door5,
}

export const doorOpenedBottomRightProp: Prop = {
  type: 'door:opened:bottom-right',
  ...door1,
}
