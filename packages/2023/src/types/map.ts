import type { PixiMovie } from './pixi-movie'

export type WallPosition =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'left-top'
  | 'left-bottom'
  | 'left-both'
  | 'right-top'
  | 'right-bottom'
  | 'right-both'
  | 'both-top'
  | 'both-bottom'
  | 'center'
  | 'center-both'
  | 'both-center'
  | 'empty'
  | 'left-aftertop'
  | 'aftertop'
  | 'right-aftertop'
  | 'both-aftertop'
  | 'aftertop[door]'
  | 'top[door]'
  | 'both-aftertop[door]'
  | 'both-top[door]'
  | 'bottom[door]'
  | 'both-bottom[door]'

export type CornerPosition =
  | 'left-top'
  | 'right-top'
  | 'left-bottom'
  | 'right-bottom'
  | 'left-aftertop'
  | 'right-aftertop'

export type InteractionSide = 'left' | 'right' | 'top' | 'bottom'

export interface TileProp {
  x: number
  y: number
  prop: Prop
  onInteraction?: (side: InteractionSide) => void
}

export interface TileNpc {
  x: number
  y: number
  npc: Npc
  onInteraction?: (side: InteractionSide) => void
}

export interface Tile {
  wall: WallPosition
  corners?: CornerPosition[]
  x: number
  y: number
}

export interface Prop {
  type: string
  texture?: {
    spritesheet: PixiMovie
    name: string
  }
  size: { w: number; h: number }
  boundingBox?: { x1: number; x2: number; y1: number; y2: number }
  renderOrderAddToY?: number
  renderOrder?: number
}

export interface Npc {
  id: string
  size: { w: number; h: number }
  boundingBox: { x1: number; x2: number; y1: number; y2: number }
  states: Record<
    string,
    {
      spritesheet: PixiMovie
      frames: Array<{ name: string; duration: number }>
    }
  >
  renderOrderAddToY?: number
}

export interface Trigger {
  onPlayerInside?: (side: InteractionSide) => void
  onPlayerOutside?: (side: InteractionSide) => void
  boundingBox: { x1: number; x2: number; y1: number; y2: number }
}

export interface Map {
  tiles: Tile[]
  props: TileProp[]
  npcs: TileNpc[]
  triggers: Trigger[]
}
