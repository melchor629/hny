import { memo, useMemo } from 'react'
import tableAlchemist from '../../data/props/stuff/table-alchemist'
import tableButcher from '../../data/props/stuff/table-butcher'
import tableEmpty from '../../data/props/stuff/table-empty'
import tableEmpty2 from '../../data/props/stuff/table-empty2'
import tableMagic from '../../data/props/stuff/table-magic'
import tablePlayer from '../../data/props/stuff/table-player'
import tableSchoolMate from '../../data/props/stuff/table-school-mate'
import tableSchoolMateFixed from '../../data/props/stuff/table-school-mate-fixed'
import MapProp from '../map-prop'

const props = {
  magic: tableMagic,
  butcher: tableButcher,
  alchemist: tableAlchemist,
  empty: tableEmpty,
  player: tablePlayer,
  schoolMate: tableSchoolMate,
  schoolMateFixed: tableSchoolMateFixed,
  empty2: tableEmpty2,
}

interface TableProps {
  kind:
    | 'magic'
    | 'butcher'
    | 'alchemist'
    | 'empty'
    | 'player'
    | 'schoolMate'
    | 'schoolMateFixed'
    | 'empty2'
  x: number
  y: number
  onInteraction?: () => void
}

function Table({ kind, onInteraction, x, y }: TableProps) {
  const prop = useMemo(() => props[kind], [kind])
  return <MapProp prop={prop} x={x * 32 - 16} y={y * 32 - 16} onInteraction={onInteraction} />
}

export default memo(Table)
