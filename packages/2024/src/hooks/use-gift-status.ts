import { devtools, persist } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { getRandomObject } from '../objects'
import { getAllIds } from '../objects/logic'

type GiftId = ReturnType<typeof getRandomObject>['id']

type State = Readonly<{
  gift: GiftId | null
  // welcome -> appearing -> closed -> opening -> opened -> closing -> closed
  //                                              opened -> changing-closing -> changing-opening -> opened
  state:
    | 'welcome'
    | 'appearing'
    | 'closed'
    | 'opening'
    | 'opened'
    | 'closing'
    | 'changing-closing'
    | 'changing-opening'
  giftsVisited: readonly GiftId[]
  nextGift?: GiftId
}>

const useGiftStatus = createWithEqualityFn(
  persist(
    devtools<State>(
      () => ({
        gift: null,
        state: 'welcome',
        giftsVisited: [],
      }),
      {
        enabled: import.meta.env.DEV,
        name: 'gift-status',
      },
    ),
    {
      name: 'me.melchor9000.2024',
    },
  ),
  shallow,
)

const appearing = () => {
  const { state } = useGiftStatus.getState()
  if (state === 'welcome') {
    useGiftStatus.setState({ state: 'appearing' }, undefined, 'appearing')
  }
}

const finishAppearing = () => {
  const { state } = useGiftStatus.getState()
  if (state === 'appearing') {
    useGiftStatus.setState({ state: 'closed' }, undefined, 'finish-appearing')
  }
}

const opening = () => {
  const { state, giftsVisited } = useGiftStatus.getState()
  if (state === 'closed') {
    const { id: gift } = getRandomObject(giftsVisited)
    useGiftStatus.setState(
      {
        state: 'opening',
        gift,
        giftsVisited: giftsVisited.includes(gift)
          ? giftsVisited
          : gift === 'all'
            ? [
                ...giftsVisited,
                gift,
                ...getAllIds().filter((v) => !giftsVisited.includes(v) && v !== gift),
              ]
            : [...giftsVisited, gift],
      },
      undefined,
      'opening',
    )
  }
}

const opened = () => {
  const { state } = useGiftStatus.getState()
  if (state === 'opening' || state === 'changing-opening') {
    useGiftStatus.setState({ state: 'opened' }, undefined, 'opened')
  }
}

const closing = () => {
  const { state } = useGiftStatus.getState()
  if (state === 'opened') {
    useGiftStatus.setState({ state: 'closing' }, undefined, 'closing')
  }
}

const closed = () => {
  const { state } = useGiftStatus.getState()
  if (state === 'closing') {
    useGiftStatus.setState({ gift: null, state: 'closed' }, undefined, 'closed')
  }
}

const changingClosing = (nextGift: GiftId) => {
  const { state } = useGiftStatus.getState()
  if (state === 'opened') {
    useGiftStatus.setState({ state: 'changing-closing', nextGift }, undefined, {
      type: 'changing-closing',
      nextGift,
    })
  }
}

const changingOpening = () => {
  const { state, nextGift } = useGiftStatus.getState()
  if (state === 'changing-closing' && nextGift) {
    useGiftStatus.setState(
      { state: 'changing-opening', nextGift: undefined, gift: nextGift },
      undefined,
      { type: 'changing-opening' },
    )
  }
}

export {
  appearing,
  changingClosing,
  changingOpening,
  closed,
  closing,
  finishAppearing,
  opened,
  opening,
  useGiftStatus,
}
