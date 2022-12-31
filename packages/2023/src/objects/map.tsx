import { useFrame } from '@react-three/fiber'
import { createContext, ReactNode, useCallback, useRef } from 'react'
import type { Map as IMap, Tile, TileProp, TileNpc, Trigger } from '../types/map'
import generateCollisionBoxes, {
  generateCollisionBoxesAsync,
} from '../utils/generate-collision-boxes'

export type OnMapUpdateCallback = (
  map: IMap,
  bvh: ReturnType<typeof generateCollisionBoxes>[0],
  collisions: ReturnType<typeof generateCollisionBoxes>[1],
) => void

interface MapProps {
  children: ReactNode
  onMapUpdate: OnMapUpdateCallback
}

const isTile = (element: Tile | TileProp | TileNpc | Trigger): element is Tile =>
  element && typeof element === 'object' && 'wall' in element
const isTileProp = (element: Tile | TileProp | TileNpc | Trigger): element is TileProp =>
  element && typeof element === 'object' && 'prop' in element
const isNpcProp = (element: Tile | TileProp | TileNpc | Trigger): element is TileNpc =>
  element && typeof element === 'object' && 'npc' in element
const isTrigger = (element: Tile | TileProp | TileNpc | Trigger): element is Tile =>
  !isTile(element) && !isTileProp(element)

const MapContext = createContext<(element: Tile | TileProp | TileNpc | Trigger) => () => void>(
  () => {
    throw new Error('Cannot use outside of a <Map />')
  },
)
MapContext.displayName = 'MapContext'

function Map({ children, onMapUpdate }: MapProps) {
  const map = useRef<IMap>()
  const triggerMapUpdate = useRef<boolean>(false)

  const registerMapElement = useCallback(
    (element: Tile | TileProp | TileNpc | Trigger) => {
      map.current ??= {
        props: [],
        tiles: [],
        npcs: [],
        triggers: [],
      } satisfies IMap

      triggerMapUpdate.current = true
      if (isTile(element)) {
        map.current.tiles.push(element)
        return () => {
          triggerMapUpdate.current = true
          map.current?.tiles.splice(map.current.tiles.indexOf(element), 1)
        }
      }
      if (isTileProp(element)) {
        map.current.props.push(element)
        return () => {
          triggerMapUpdate.current = true
          map.current?.props.splice(map.current.props.indexOf(element), 1)
        }
      }
      if (isNpcProp(element)) {
        map.current.npcs.push(element)
        return () => {
          triggerMapUpdate.current = true
          map.current?.npcs.splice(map.current.npcs.indexOf(element), 1)
        }
      }
      if (isTrigger(element)) {
        map.current.triggers.push(element)
        return () => {
          triggerMapUpdate.current = true
          map.current?.triggers.splice(map.current.triggers.indexOf(element), 1)
        }
      }

      return () => {}
    },
    [triggerMapUpdate],
  )

  useFrame(() => {
    if (!map.current) {
      return
    }

    if (triggerMapUpdate.current) {
      triggerMapUpdate.current = false
      //const [bvh, collisions] = generateCollisionBoxes(map.current)
      //onMapUpdate(map.current, bvh, collisions)
      const lemap = map.current
      setTimeout(() =>
        generateCollisionBoxesAsync(lemap)
          .then(([bvh, collisions]) => onMapUpdate(lemap, bvh, collisions))
          .catch(console.error),
      )
    }
  })

  return (
    <MapContext.Provider value={registerMapElement}>
      <group>{children}</group>
    </MapContext.Provider>
  )
}

Map.Context = MapContext

export default Map
