import { Box2, Vector2 } from 'three'
import type {
  NpcCollisionBox,
  PropCollisionBox,
  TileCollisionBox,
  TriggerCollisionBox,
} from '../types/collisions'
import type { Map, Tile, TileNpc, TileProp, Trigger } from '../types/map'
import BVH2 from './bvh'

const tileSize = 32.0

function tileCollisionBoxToString(this: TileCollisionBox) {
  return `[tile] (${this.x}, ${this.y}) ${this.side}`
}

function* generateCollisionBoxesForTile({
  corners,
  wall,
  x,
  y,
}: Tile): Generator<TileCollisionBox> {
  const hasDoor = wall.endsWith('[door]')
  wall = wall.endsWith('[door]') ? (wall.slice(0, -6) as Tile['wall']) : wall
  if (wall.endsWith('aftertop')) {
    return
  }

  const center = new Vector2(-tileSize / 2, tileSize / 2)
  if (wall.startsWith('left') || wall.startsWith('both')) {
    yield {
      type: 'tile',
      x,
      y,
      side: 'left',
      boundingBox: new Box2(
        new Vector2(x * tileSize, -(y + 1) * tileSize),
        new Vector2(x * tileSize + 5.0, -y * tileSize),
      ).translate(center),
      toString: tileCollisionBoxToString,
    }
  }

  if (wall.startsWith('right') || wall.startsWith('both')) {
    yield {
      type: 'tile',
      x,
      y,
      side: 'right',
      boundingBox: new Box2(
        new Vector2((x + 1) * tileSize - 5.0, -(y + 1) * tileSize),
        new Vector2((x + 1) * tileSize, -y * tileSize),
      ).translate(center),
      toString: tileCollisionBoxToString,
    }
  }

  if (wall.endsWith('top') || wall.endsWith('both')) {
    if (hasDoor) {
      yield {
        type: 'tile',
        x,
        y,
        side: 'top',
        boundingBox: new Box2(
          new Vector2(x * tileSize, -y * tileSize - 5.0),
          new Vector2(x * tileSize + 7.0, -y * tileSize),
        ).translate(center),
        toString: tileCollisionBoxToString,
      }
      yield {
        type: 'tile',
        x,
        y,
        side: 'top',
        boundingBox: new Box2(
          new Vector2((x + 1) * tileSize - 7.0, -y * tileSize - 5.0),
          new Vector2((x + 1) * tileSize, -y * tileSize),
        ).translate(center),
        toString: tileCollisionBoxToString,
      }
    } else {
      yield {
        type: 'tile',
        x,
        y,
        side: 'top',
        boundingBox: new Box2(
          new Vector2(x * tileSize, -y * tileSize - 5.0),
          new Vector2((x + 1) * tileSize, -y * tileSize),
        ).translate(center),
        toString: tileCollisionBoxToString,
      }
    }
  }

  if (wall.endsWith('bottom') || wall.endsWith('both')) {
    if (hasDoor) {
      yield {
        type: 'tile',
        x,
        y,
        side: 'bottom',
        boundingBox: new Box2(
          new Vector2(x * tileSize, -(y + 1) * tileSize),
          new Vector2(x * tileSize + 7.0, -(y + 1) * tileSize + 4.0),
        ).translate(center),
        toString: tileCollisionBoxToString,
      }
      yield {
        type: 'tile',
        x,
        y,
        side: 'bottom',
        boundingBox: new Box2(
          new Vector2((x + 1) * tileSize - 7.0, -(y + 1) * tileSize),
          new Vector2((x + 1) * tileSize, -(y + 1) * tileSize + 4.0),
        ).translate(center),
        toString: tileCollisionBoxToString,
      }
    } else {
      yield {
        type: 'tile',
        x,
        y,
        side: 'bottom',
        boundingBox: new Box2(
          new Vector2(x * tileSize, -(y + 1) * tileSize),
          new Vector2((x + 1) * tileSize, -(y + 1) * tileSize + 4.0),
        ).translate(center),
        toString: tileCollisionBoxToString,
      }
    }
  }

  for (const corner of corners ?? []) {
    if (corner === 'left-top') {
      yield {
        type: 'tile',
        x,
        y,
        side: corner,
        boundingBox: new Box2(
          new Vector2(x * tileSize, -y * tileSize - 5.0),
          new Vector2(x * tileSize + 5.0, -y * tileSize),
        ).translate(center),
        toString: tileCollisionBoxToString,
      }
    } else if (corner === 'right-top') {
      yield {
        type: 'tile',
        x,
        y,
        side: corner,
        boundingBox: new Box2(
          new Vector2((x + 1) * tileSize - 5.0, -y * tileSize - 5.0),
          new Vector2((x + 1) * tileSize, -y * tileSize),
        ).translate(center),
        toString: tileCollisionBoxToString,
      }
    } else if (corner === 'left-bottom') {
      yield {
        type: 'tile',
        x,
        y,
        side: corner,
        boundingBox: new Box2(
          new Vector2(x * tileSize, -(y + 1) * tileSize),
          new Vector2(x * tileSize + 5.0, -(y + 1) * tileSize + 4.0),
        ).translate(center),
        toString: tileCollisionBoxToString,
      }
    } else if (corner === 'right-bottom') {
      yield {
        type: 'tile',
        x,
        y,
        side: corner,
        boundingBox: new Box2(
          new Vector2((x + 1) * tileSize - 5.0, -(y + 1) * tileSize),
          new Vector2((x + 1) * tileSize, -(y + 1) * tileSize + 4.0),
        ).translate(center),
        toString: tileCollisionBoxToString,
      }
    }
  }
}

function propCollisionBoxToString(this: PropCollisionBox) {
  return `[prop] (${this.x}, ${this.y}) ${this.prop.type} ${
    this.onInteraction ? 'interactive' : ''
  }`.trim()
}

function* generateCollisionBoxesForProp({
  onInteraction,
  prop,
  x,
  y,
}: TileProp): Generator<PropCollisionBox> {
  if (prop.boundingBox) {
    const boundingBox = new Box2(
      new Vector2(prop.boundingBox.x1, -prop.boundingBox.y2),
      new Vector2(prop.boundingBox.x2, -prop.boundingBox.y1),
    ).translate(new Vector2(x, -y))
    yield {
      type: 'prop',
      x,
      y: -y,
      prop,
      onInteraction,
      boundingBox,
      toString: propCollisionBoxToString,
    }
  }
}

function npcCollisionBoxToString(this: NpcCollisionBox) {
  return `[npc] (${this.x}, ${this.y}) ${this.npc.id} ${
    this.onInteraction ? 'interactive' : ''
  }`.trim()
}

function generateCollisionBoxesForNpc({ onInteraction, npc, x, y }: TileNpc): NpcCollisionBox {
  const boundingBox = new Box2(
    new Vector2(npc.boundingBox.x1, -npc.boundingBox.y2),
    new Vector2(npc.boundingBox.x2, -npc.boundingBox.y1),
  ).translate(new Vector2(x, -y))
  return {
    type: 'npc',
    x,
    y: -y,
    npc,
    onInteraction,
    boundingBox,
    toString: npcCollisionBoxToString,
  }
}

function triggerCollisionBoxToString(this: TriggerCollisionBox) {
  return `[trigger] (${this.boundingBox.min.x}, ${this.boundingBox.min.y}) x (${this.boundingBox.max.x}, ${this.boundingBox.max.y})`
}

function generateCollisionBoxesForTrigger(trigger: Trigger): TriggerCollisionBox {
  const boundingBox = new Box2(
    new Vector2(trigger.boundingBox.x1, -trigger.boundingBox.y2),
    new Vector2(trigger.boundingBox.x2, -trigger.boundingBox.y1),
  )
  return {
    type: 'trigger',
    trigger,
    boundingBox,
    toString: triggerCollisionBoxToString,
  }
}

const generateCollisionBoxes = (map: Map) => {
  const objects = [
    ...map.tiles.flatMap((tile) => [...generateCollisionBoxesForTile(tile)]),
    ...map.props.flatMap((prop) => [...generateCollisionBoxesForProp(prop)]),
    ...map.npcs.map((prop) => generateCollisionBoxesForNpc(prop)),
    ...map.triggers.map((trigger) => generateCollisionBoxesForTrigger(trigger)),
  ]

  const bvh = new BVH2(objects)
  return [bvh, objects] as const
}

export const generateCollisionBoxesAsync = async (map: Map) => {
  const objects = [
    ...map.tiles.flatMap((tile) => [...generateCollisionBoxesForTile(tile)]),
    ...map.props.flatMap((prop) => [...generateCollisionBoxesForProp(prop)]),
    ...map.npcs.map((prop) => generateCollisionBoxesForNpc(prop)),
    ...map.triggers.map((trigger) => generateCollisionBoxesForTrigger(trigger)),
  ]

  const bvh = await BVH2.buildAsync(objects)
  return [bvh, objects] as const
}

export default generateCollisionBoxes
