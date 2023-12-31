// missing type in ts ...
declare global {
  interface ReadonlyArray<T> {
    toSorted(fn: (a: T, b: T) => number): Array<T>
  }
  interface Array<T> {
    toSorted(fn: (a: T, b: T) => number): Array<T>
  }
}

type GiftObject = Readonly<{
  id: string
  name: string
  description: string
  p: 1 | 0.75 | 0.5 | 0.25 | 0.1
}>

const commonProbability = 1
const rareProbability = 0.75
const epicProbability = 0.5
const legendaryProbability = 0.25
const mithicProbability = 0.1

const objects = Object.freeze([
  Object.freeze({
    id: 'caja-1',
    name: 'La caja de un switch',
    description: 'Un caja de un switch TP-Link, pero solo la caja, nada dentro de utilidad',
    p: rareProbability,
  }),
  Object.freeze({
    id: 'catto',
    name: '猫',
    description: 'ニャー!',
    p: mithicProbability,
  }),
  Object.freeze({
    id: 'disco-1',
    name: 'Exul de Ne Obliviscaris',
    description: 'Un disco de música un tanto peculiar...',
    p: epicProbability,
  }),
  Object.freeze({
    id: 'disco-2',
    name: 'Settle de Disclosure',
    description: 'El álbum, solo temazos, de lo mejorcito que ha salido de UK',
    p: rareProbability,
  }),
  Object.freeze({
    id: 'disco-3',
    name: 'Viva La Vida de Colplay',
    description:
      'Tremendo álbum de Coldplay, que pena que no sea el pack completo, pero disfrutable igualmente',
    p: commonProbability,
  }),
  Object.freeze({
    id: 'esp-32',
    name: 'ESP 32',
    description:
      'Pequeño chip à la Arduino, puedes programarle de todo, con WiFi e interfaz para cámara',
    p: commonProbability,
  }),
  Object.freeze({
    id: 'gorro',
    name: 'Gorrito de rana del shein',
    description: 'Será barato, pero está muy chulo. ¡Vístelo con orgullo!',
    p: commonProbability,
  }),
  Object.freeze({
    id: 'lapiz',
    name: 'Lápiz del Ikea',
    description: 'Un lápiz del Ikea sin punta',
    p: commonProbability,
  }),
  Object.freeze({
    id: 'libro-1',
    name: '¡Guardias! ¿Guardias? de Terry Pratchet',
    description:
      'Libro del mundodisco, el primero de la saga de las guardias, y divertido cuanto menos',
    p: commonProbability,
  }),
  Object.freeze({
    id: 'libro-2',
    name: 'El Último Deseo de Andrzej Sapkowski',
    description:
      ' El primer libro de la saga del brujero, del amigo Gerardo de Revilla y su caballo Maravilla',
    p: rareProbability,
  }),
  Object.freeze({
    id: 'libro-3',
    name: "GRIS Collector's Edition",
    description:
      'GRIS para la Noentiendo Switch, edición coleccionista que incluye el libro de arte de Conrad Roset, que es un máquina',
    p: legendaryProbability,
  }),
  Object.freeze({
    id: 'master-chief',
    name: 'Master Chief',
    description: 'El Jefe Maestro, convertido en una cosa que se ilumina',
    p: commonProbability,
  }),
  Object.freeze({
    id: 'meme',
    name: 'meme',
    description: 'memes de elfa racista',
    p: rareProbability,
  }),
  Object.freeze({
    id: 'monedo',
    name: '1€',
    description: '1 (un) Euro',
    p: commonProbability,
  }),
  Object.freeze({
    id: 'pendrive',
    name: '16GB',
    description: 'Un pendrive de 16GB de hace 6 años',
    p: rareProbability,
  }),
  Object.freeze({
    id: 'pin-1',
    name: 'oh no',
    description: 'One of the mithic characters made pin',
    p: legendaryProbability,
  }),
  Object.freeze({
    id: 'pin-2',
    name: 'mewo',
    description: 'Waiting for something to happen?',
    p: epicProbability,
  }),
  Object.freeze({
    id: 'protoboard',
    name: 'Protoboard',
    description: 'Protobard para montarse circuititos',
    p: commonProbability,
  }),
  Object.freeze({
    id: 'raspbery-pi',
    name: 'Raspberry Pi 3B',
    description:
      'Un mini ordenador capaz de emular decenas de consolas, o para convertirlo como mini servidor, o...',
    p: epicProbability,
  }),
  Object.freeze({
    id: 'sticker-1',
    name: 'Peace was never an option!',
    description: 'Peace was never an option!',
    p: rareProbability,
  }),
  Object.freeze({
    id: 'sticker-2',
    name: 'Pegatina de Jiji',
    description: 'Una pegatina del gato de Nicky, la aprendiz de Bruja (de Studio Ghibli)',
    p: rareProbability,
  }),
  Object.freeze({
    id: 'sticker-3',
    name: 'Pegatina de Komi-san',
    description: 'Quiere decir algo, pero no es capaz',
    p: rareProbability,
  }),
  Object.freeze({
    id: 'yubikey',
    name: 'Yubikey 5 NFC',
    description: 'Una llave de seguridad con USB-A y NFC',
    p: epicProbability,
  }),
  Object.freeze({
    id: 'all',
    name: 'Todo',
    description: 'Te ha tocado todos los regalos a la vez',
    p: mithicProbability,
  }),
] satisfies GiftObject[])

const sumProbabilities = (ob: readonly { p: GiftObject['p'] }[]) =>
  ob.map((o) => o.p).reduce((accumulated, current) => accumulated + current, 0)

const getRandomObject = (alreadyVisitedObjects: readonly GiftObject['id'][]) => {
  const visitedProbability =
    alreadyVisitedObjects.length <= objects.length * 0.5
      ? epicProbability
      : alreadyVisitedObjects.length <= objects.length * 0.75
      ? legendaryProbability
      : mithicProbability
  const patchedObjects = objects.map((obj) => ({
    id: obj.id,
    p: alreadyVisitedObjects.includes(obj.id) ? visitedProbability : obj.p,
  }))
  const maxValue = sumProbabilities(patchedObjects)

  const cumSumObjects = patchedObjects
    .toSorted((a, b) => b.p - a.p)
    .map((obj, i, a) => [obj, sumProbabilities(a.slice(0, i + 1))] as const)

  const p = Math.random() * maxValue
  const [object] = cumSumObjects.find(([, accumulated]) => accumulated >= p)!
  return getObject(object.id)
}

const getObject = (id: (typeof objects)[0]['id']) => objects.find((o) => o.id === id)!

const getRarity = ({ p }: { p: GiftObject['p'] }) => {
  if (p === rareProbability) {
    return 'rare'
  }

  if (p === epicProbability) {
    return 'epic'
  }

  if (p === legendaryProbability) {
    return 'legendary'
  }

  if (p === mithicProbability) {
    return 'mithic'
  }

  return 'common'
}

const getTotalObjects = () => objects.length

const getAllIds = () => objects.map((gift) => gift.id)

export { getRarity, getObject, getRandomObject, getTotalObjects, getAllIds }
