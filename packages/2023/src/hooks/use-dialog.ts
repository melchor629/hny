import createStore from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Dialog, DialogEntry } from '../types/dialogs'

interface State<DialogState> {
  readonly dialog?: Dialog<DialogState>
  readonly dialogState?: Readonly<DialogState>
  readonly currentEntry: DialogEntry | null
  readonly onDialogClose?: (state: any) => void
  readonly finished: boolean

  close(): void
  reset<SpecificDialogState extends DialogState>(
    dialog: Dialog<SpecificDialogState>,
    onDialogClose?: (state: Readonly<SpecificDialogState>) => void,
  ): Promise<Readonly<SpecificDialogState>>
  next(entryId: `${string}:${string}`): void
  choiceAction(choiceId: `${string}:${string}:${string}`): void
  changeDialogState(fn: (state: Readonly<DialogState>) => DialogState): void
  setFinished(): void
}

const useDialog = createStore(
  devtools<State<any>>(
    (set) => ({
      currentEntry: null,
      finished: false,

      close() {
        set(
          (state) => {
            const { onDialogClose, dialogState } = state
            if (onDialogClose) {
              setTimeout(() => onDialogClose(dialogState!))
            }
            return {
              dialog: undefined,
              dialogState: undefined,
              currentEntry: null,
              onDialogClose: undefined,
              finished: false,
            }
          },
          false,
          {
            type: 'dialog:close',
          },
        )
      },

      reset<SpecificDialogState extends any>(
        dialog: Dialog<SpecificDialogState>,
        onDialogClose?: (state: Readonly<SpecificDialogState>) => void,
      ) {
        return new Promise<Readonly<SpecificDialogState>>((resolve) =>
          set(
            () => {
              const currentEntry = dialog.entries.get(dialog.first)
              if (!currentEntry) {
                throw new Error(
                  `Dialog ${dialog.id} has an invalid first dialog entry ${dialog.first}`,
                )
              }

              return {
                dialog,
                dialogState: dialog.initialState() as any,
                currentEntry,
                onDialogClose(finalState) {
                  resolve(finalState)
                  onDialogClose?.(finalState)
                },
                finished: false,
              }
            },
            false,
            { type: 'dialog:reset', dialog, onDialogClose },
          ),
        )
      },

      next(entryId: string) {
        set(
          (state) => {
            if (!state.dialog || state.currentEntry === null) {
              return {}
            }

            const currentEntry = state.dialog.entries.get(entryId)
            if (!currentEntry) {
              throw new Error(`Dialog Entry ${entryId} does not exist`)
            }

            return { currentEntry, finished: false }
          },
          false,
          { type: 'dialog:next', entryId },
        )
      },

      choiceAction(choiceId) {
        set(
          (state) => {
            if (!state.dialog || state.currentEntry === null) {
              return {}
            }

            if (!state.currentEntry.choices) {
              return {}
            }

            const choice = state.currentEntry.choices.find(({ id }) => id === choiceId)
            if (!choice) {
              throw new Error(
                `Choice ${choiceId} does not exist for Dialog Entry ${state.currentEntry.id}`,
              )
            }

            if (choice.action.type === 'next') {
              const currentEntry = state.dialog.entries.get(choice.action.dialogEntryId)
              if (!currentEntry) {
                throw new Error(
                  `Choice ${choiceId} points to ${choice.action.dialogEntryId} which does not exist`,
                )
              }

              return { currentEntry, finished: false }
            }

            if (choice.action.type === 'close') {
              const { onDialogClose, dialogState } = state
              if (onDialogClose) {
                setTimeout(() => onDialogClose(dialogState!))
              }

              return {
                currentEntry: null,
                dialog: undefined,
                dialogState: undefined,
                finished: false,
              }
            }

            return {}
          },
          false,
          { type: 'dialog:choice-action', choiceId },
        )
      },

      changeDialogState(fn) {
        set(
          ({ dialogState }) => {
            if (dialogState === undefined) {
              return {}
            }

            return { dialogState: fn(dialogState) }
          },
          false,
          { type: 'dialog:change-dialog-state', fn },
        )
      },

      setFinished() {
        set(() => ({ finished: true }), false, { type: 'dialog:finished' })
      },
    }),
    { enabled: import.meta.env.DEV, name: 'dialog' },
  ),
)

export default useDialog
