import barsLeft from '../../data/props/stuff/bars-left'
import barsRight from '../../data/props/stuff/bars-right'
import MapProp from '../map-prop'

interface JailBarsProps {
  x: number
  y: number
}

export default function JailBars({ x, y }: JailBarsProps) {
  return (
    <>
      <MapProp prop={barsLeft} x={x * 32 - 16} y={y * 32 - 11} />
      <MapProp prop={barsRight} x={x * 32 + 16} y={y * 32 - 11} />
    </>
  )
}
