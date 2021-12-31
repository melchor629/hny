import { shuffle } from 'lodash-es'
import { Color } from 'three'
import create from 'zustand'

// yep, 2014s material colors
const colors = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#9E9E9E',
  '#607D8B',
  // - white
  '#FAFAFA',
].map((c) => new Color(c))

const usePartyStore = create((set) => ({
  colour: new Color('#fff'),
  shouldExplodeIn: -1,
  partyStarted: false,
  endParty: false,

  beat: () =>
    set(({ colour, shouldExplodeIn }) => {
      if (shouldExplodeIn === 1) {
        return { shouldExplodeIn, endParty: true }
      }

      let newColour = colour
      while (newColour.equals(colour)) {
        ;[newColour] = shuffle(colors)
      }

      return {
        colour: newColour,
        shouldExplodeIn: Math.max(-1, shouldExplodeIn - 1),
      }
    }),
  markExploding: () => set(() => ({ shouldExplodeIn: 4 })),
  letsParty: () => set(() => ({ partyStarted: true })),
}))

export default usePartyStore
