import type { Prop } from '../types/map'
import key1 from './props/stuff/key-1'
import key2 from './props/stuff/key-2'
import powGun from './props/stuff/pow-gun'
import shovel from './props/stuff/shovel'
import specialObject from './props/stuff/special-object'
import writenPaper from './props/stuff/writen-paper'

interface InventoryItem {
  prop: Prop
  name: string
  scale?: number
  position?: string
}

const inventory: Record<string, InventoryItem> = Object.freeze({
  'rubbish-code-I': {
    prop: writenPaper,
    name: 'Código I',
    position: 'top left',
  },
  'rubbish-code-II': {
    prop: writenPaper,
    name: 'Código II',
    position: 'top left',
  },
  'paper-code-1': {
    prop: writenPaper,
    name: 'Código 1',
    position: 'top left',
  },
  'paper-code-2': {
    prop: writenPaper,
    name: 'Código 2',
    position: 'top left',
  },
  'key-a-door-1': {
    prop: key1,
    scale: 3,
    name: 'Llave A',
    position: 'top left',
  },
  'key-b-door-1': {
    prop: key2,
    scale: 3,
    name: 'Llave B',
    position: 'top left',
  },
  'pow-gun': {
    prop: powGun,
    name: 'Pow Gun',
    position: '0% 25%',
  },
  'key-door-5': {
    prop: key2,
    scale: 3,
    name: 'Llave 5',
    position: 'top left',
  },
  shovel: {
    prop: shovel,
    name: 'Pala',
    position: 'top left',
  },
  'special-object': {
    prop: specialObject,
    name: '???',
    position: 'top left',
  },
  'magic-wizard-license': {
    prop: writenPaper,
    name: 'Licencia Magic Wizard',
    position: 'left top',
  },
})

export default inventory
