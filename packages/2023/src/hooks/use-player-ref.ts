import type { Ref, RefObject } from 'react'
import { createContext, useContext } from 'react'
import type Player from '../objects/player'

type Unref<T> = T extends Ref<infer P> ? P : never
type PlayerRef = NonNullable<Parameters<typeof Player>[0]['ref']>
type PlayerType = Unref<PlayerRef>

export const context = createContext<RefObject<PlayerType | null>>({ current: null })
context.displayName = 'PlayerRefContext'

const usePlayerRef = () => useContext(context)

export default usePlayerRef
