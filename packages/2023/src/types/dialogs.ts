type DialogEntryChoiceAction = Readonly<{ type: 'close' } | { type: 'next'; dialogEntryId: string }>

interface DialogEntryChoice {
  readonly id: `${string}:${string}:${string}`
  readonly text: string
  readonly action: DialogEntryChoiceAction
}

type DialogEntryText = Readonly<
  | { type: 'text'; value: string }
  | {
      type: 'style'
      size?: number | null
      skipable?: boolean
      family?: 'normal' | 'italic' | 'code'
      effect?: 'wave' | 'crazy' | null
    }
  | { type: 'pause'; delay: number }
  | { type: 'state'; set(value: any): any }
  | { type: 'condition'; fn(value: any): boolean; text: DialogEntryText[] }
  | { type: 'next'; dialogEntryId: `${string}:${string}` }
  | { type: 'close' }
  | { type: 'run'; fn(): Promise<void> | void }
>

export type DialogEntry = Readonly<{
  id: `${string}:${string}`
  who: string
  text: DialogEntryText[]
  choices?: DialogEntryChoice[]
}>

export interface Dialog<State = any> {
  readonly id: string
  readonly first: string
  readonly entries: Map<string, DialogEntry>
  initialState(): State
}

interface DialogEntryChoicesBuilder {
  addClose(choiceId: string, text: string): DialogEntryChoicesBuilder
  addNext(choiceId: string, text: string, dialogEntryId: string): DialogEntryChoicesBuilder
}

interface DialogEntryTextBuilder<State> {
  condition(
    fn: (state: Readonly<State>) => boolean,
    builder: (subBuilder: DialogEntryTextBuilder<State>) => void,
  ): DialogEntryTextBuilder<State>
  text(value: string): DialogEntryTextBuilder<State>
  pause(delay: number): DialogEntryTextBuilder<State>
  style(style: Omit<DialogEntryText & { type: 'style' }, 'type'>): DialogEntryTextBuilder<State>
  state(set: (current: Readonly<State>) => State): DialogEntryTextBuilder<State>
  run(fn: () => Promise<void> | void): DialogEntryTextBuilder<State>
  next(dialogEntryId: string): void
  close(): void
}

interface DialogEntryBuilder<State> {
  setChoices(fn: (choicesBuilder: DialogEntryChoicesBuilder) => void): DialogEntryBuilder<State>
  setText(fn: (textBuilder: DialogEntryTextBuilder<State>) => void): DialogEntryBuilder<State>
}

export const newDialogEntryText = <State = never>(
  fn: (builder: DialogEntryTextBuilder<State>) => void,
  id: string,
) => {
  const text: DialogEntryText[] = []

  fn(
    Object.freeze<DialogEntryTextBuilder<State>>({
      condition(conditionFn, builderFn) {
        text.push({ type: 'condition', fn: conditionFn, text: newDialogEntryText(builderFn, id) })
        return this
      },
      text(value) {
        text.push({ type: 'text', value })
        return this
      },
      pause(delay) {
        text.push({ type: 'pause', delay })
        return this
      },
      style(style) {
        text.push({ ...style, type: 'style' })
        return this
      },
      state(set) {
        text.push({ type: 'state', set })
        return this
      },
      run(fn) {
        text.push({ type: 'run', fn })
        return this
      },
      next(dialogEntryId: string) {
        text.push({ type: 'next', dialogEntryId: `${id}:${dialogEntryId}` })
      },
      close() {
        text.push({ type: 'close' })
      },
    }),
  )

  return text
}

export const newDialog = <State = never>(id: string, initialState: State | (() => State)) => {
  const partialDialog: { -readonly [P in keyof Dialog<State>]: Dialog<State>[P] } = {
    id,
    entries: new Map(),
    first: '',
    initialState:
      typeof initialState === 'function' ? (initialState as () => State) : () => initialState,
  }
  return Object.freeze({
    setFirst(dialogId: string) {
      partialDialog.first = dialogId
      return this
    },
    addEntry(
      entryId: string,
      who: string,
      entryBuilder: (builder: DialogEntryBuilder<State>) => void,
    ) {
      if (!partialDialog.first) {
        partialDialog.first = `${id}:${entryId}`
      }

      const partialEntry: { -readonly [P in keyof DialogEntry]: DialogEntry[P] } = {
        id: `${id}:${entryId}`,
        who,
        text: [],
      }

      entryBuilder(
        Object.freeze<DialogEntryBuilder<State>>({
          setChoices(fn) {
            partialEntry.choices = []

            fn(
              Object.freeze<DialogEntryChoicesBuilder>({
                addClose(choiceId: string, text: string) {
                  partialEntry.choices?.push({
                    id: `${id}:${entryId}:${choiceId}`,
                    text,
                    action: { type: 'close' },
                  })
                  return this
                },
                addNext(choiceId: string, text: string, dialogEntryId: string) {
                  partialEntry.choices?.push({
                    id: `${id}:${entryId}:${choiceId}`,
                    text,
                    action: { type: 'next', dialogEntryId: `${id}:${dialogEntryId}` },
                  })
                  return this
                },
              }),
            )

            Object.freeze(partialEntry.choices)

            return this
          },
          setText(fn) {
            partialEntry.text.push(...newDialogEntryText(fn, id))
            return this
          },
        }),
      )

      partialDialog.entries.set(`${id}:${entryId}`, Object.freeze(partialEntry))

      return this
    },
    build() {
      if (!partialDialog.first) {
        throw new Error('Missing first property')
      }

      if (!partialDialog.entries.size) {
        throw new Error('Missing entries')
      }

      return partialDialog as Dialog<State>
    },
  })
}
