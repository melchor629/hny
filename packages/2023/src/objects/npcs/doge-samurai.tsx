import dogeSamurai from '../../data/npcs/doge-samurai'
import MapNpc from '../map-npc'

export default function DogeSamurai({ f, x, y }: { f: boolean; x: number; y: number }) {
  return (
    <MapNpc npc={dogeSamurai} state="rest" x={x * 32 - 16} y={y * 32 - 16} flipHorizontal={f} />
  )
}
