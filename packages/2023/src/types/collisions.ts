import type { Box2 } from 'three'
import type { InteractionSide, Npc, Prop, Trigger } from './map'

export interface TileCollisionBox {
  type: 'tile'
  x: number
  y: number
  side:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'left-top'
    | 'right-top'
    | 'left-bottom'
    | 'right-bottom'
  boundingBox: Box2
  toString(): string
}

export interface PropCollisionBox {
  type: 'prop'
  x: number
  y: number
  prop: Prop
  onInteraction?: (side: InteractionSide) => void
  boundingBox: Box2
  toString(): string
}

export interface NpcCollisionBox {
  type: 'npc'
  x: number
  y: number
  npc: Npc
  onInteraction?: (side: InteractionSide) => void
  boundingBox: Box2
  toString(): string
}

export interface TriggerCollisionBox {
  type: 'trigger'
  trigger: Trigger
  boundingBox: Box2
  toString(): string
}

export type CollisionBox =
  | TileCollisionBox
  | PropCollisionBox
  | NpcCollisionBox
  | TriggerCollisionBox
