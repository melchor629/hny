import { useCallback, useEffect, useMemo, useState } from 'react'
import MapTile from '../../../../objects/map-tile'
import MapTrigger from '../../../../objects/map-trigger'
import Key from '../../../../objects/props/key'
import Photo from '../../../../objects/props/photo'
import Rubbish from '../../../../objects/props/rubbish'

// prettier-ignore
const stages = [
  ['left',   'left-bottom',  'both-bottom', 'both-center', 'left',      'left-bottom', 'left-top'],
  ['center', 'bottom',       'top',         'right',       'bottom',    'right',       'right-top'],
  ['center', 'left-both',    'right-top',   'left',        'right-top', 'left-bottom', 'right-top'],
  ['center', 'right-both',   'left-bottom', 'both-bottom', 'bottom',    'both-bottom', 'left-top'],
  ['center', 'both-top',     'center-both', 'left-top',    'left-top',  'right',       'both-bottom'],
  ['right',  'right-bottom', 'both-bottom', 'right-bottom','right',     'both-bottom', 'right'],

  ['left',   'both-center', 'left',        'both-top',     'left-both', 'both-top',    'both-top'],
  ['center', 'bottom',      'both-bottom', 'bottom',       'right-both','left-both',   'center'],
  ['center', 'left-top',    'left-bottom', 'right-bottom', 'left-both', 'right-both',  'right-top'],
  ['center', 'center',      'right-both',  'left-top',     'right-top', 'both-bottom', 'left-both'],
  ['center', 'left-bottom', 'left',        'left-top',     'center',    'left-top',    'bottom'],
  ['right',  'right',       'both-center', 'right-bottom', 'right-top', 'right',       'both-center'],

  ['top', 'left-top',    'left-top',    'left-top',    'left-top',    'left-top',    'top'],
  ['top', 'center-both', 'center-both', 'center-both', 'center-both', 'right-top',   'left-top'],
  ['top', 'center-both', 'both-bottom', 'center-both', 'both-bottom', 'top',         'left-top'],
  ['top', 'both-bottom', 'center-both', 'both-bottom', 'center-both', 'both-bottom', 'both-top'],
] as const

export default function LeftLeft() {
  const [isInside, setInside] = useState(false)
  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(0)

  useEffect(() => {
    if (!isInside) {
      return () => {}
    }

    const id = setInterval(() => {
      setStage((v) => ((v % 6) + 1) as any)
    }, 5500)

    return () => clearInterval(id)
  }, [isInside])

  return (
    <>
      {/* main hall > branch left > branch left */}
      <MapTile wall="center-both" x={30} y={44} />
      <MapTile wall="center-both" x={29} y={44} />
      <MapTile wall="center-both" x={28} y={44} />
      <MapTile wall="center-both" x={27} y={44} />
      <MapTile wall="left-bottom" corners={['right-top']} x={26} y={44} />
      <MapTile wall="both-center" corners={['right-aftertop']} x={26} y={43} />
      <MapTrigger
        boundingBox={useMemo(
          () => ({ x1: 20.5 * 32, y1: 35 * 32, x2: 26.5 * 32, y2: 42.5 * 32 + 2 }),
          [],
        )}
        onPlayerInside={useCallback(() => {
          setInside(true)
          setStage(1)
        }, [])}
        onPlayerOutside={useCallback(() => {
          setInside(false)
          setStage(0)
        }, [])}
      />

      <MapTile wall="left-bottom" x={21} y={42} />
      <Rubbish x={21} y={41.75} />
      <MapTile wall="bottom" x={22} y={42} />
      <MapTile wall="bottom" x={23} y={42} />
      <MapTile wall="bottom" x={24} y={42} />
      <MapTile wall="bottom" x={25} y={42} />
      <MapTile wall="right" corners={['left-bottom']} x={26} y={42} />

      <MapTile wall={stages[0][stage]} x={21} y={41} />
      <MapTile wall={stages[1][stage]} x={22} y={41} />
      <MapTile wall={stages[2][stage]} x={23} y={41} />
      <MapTile wall={stages[3][stage]} x={24} y={41} />
      <MapTile wall={stages[4][stage]} x={25} y={41} />
      <MapTile wall={stages[5][stage]} x={26} y={41} />

      <MapTile wall={stages[6][stage]} x={21} y={40} />
      <MapTile wall={stages[7][stage]} x={22} y={40} />
      <MapTile wall={stages[8][stage]} x={23} y={40} />
      <MapTile wall={stages[9][stage]} x={24} y={40} />
      <MapTile wall={stages[10][stage]} x={25} y={40} />
      <MapTile wall={stages[11][stage]} x={26} y={40} />

      <MapTile wall="left-top" x={21} y={39} />
      <Key dir="right" keyId="key-door-5" x={21} y={38.75} />
      <MapTile wall={stages[12][stage]} x={22} y={39} />
      <MapTile wall={stages[13][stage]} x={23} y={39} />
      <MapTile wall={stages[14][stage]} x={24} y={39} />
      <MapTile wall={stages[15][stage]} x={25} y={39} />
      <MapTile wall="right-top" x={26} y={39} />

      <MapTile wall="empty" collisionWall="left" x={24} y={38} />
      <MapTile wall="empty" collisionWall="right" x={25} y={38} />
      <MapTile wall="empty" collisionWall="left" x={24} y={37} />
      <MapTile wall="empty" collisionWall="right" x={25} y={37} />
      <MapTile wall="empty" collisionWall="left" x={24} y={36} />
      <MapTile wall="empty" collisionWall="right" x={25} y={36} />
      <MapTile wall="empty" collisionWall="left" x={24} y={35} />
      <MapTile wall="empty" collisionWall="right" x={25} y={35} />
      <MapTile wall="empty" collisionWall="left-top" x={24} y={34} />
      <MapTile wall="empty" collisionWall="right-top" x={25} y={34} />
      <Photo alt={3} photoId="special-2" x={24.5} y={34} />
    </>
  )
}
