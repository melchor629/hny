import {
  forwardRef,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import useDialog from '../../hooks/use-dialog'
import useInput from '../../hooks/use-input'
import type { DialogEntry } from '../../types/dialogs'
import anySignal from '../../utils/any-signal'
import wait from '../../utils/wait'
import DialogTextChoices from './dialog-text-choices'
import styles from './dialog-text.module.scss'

interface TextSection {
  type: 'text-section'
  id: string
  text: string
  style: {
    size: number
    skipable: boolean
    family: 'normal' | 'italic' | 'code'
    effect: string | null
  }
}

interface Next {
  type: 'next'
  dialogEntryId: `${string}:${string}`
}

interface Close {
  type: 'close'
}

interface DialogTextProps {
  dialogEntry: DialogEntry
}

interface DialogTextRef {
  next: () => void
}

async function* textApplier(
  actions: DialogEntry['text'],
  signal: AbortSignal,
  style: TextSection['style'],
  nextSignalRef: MutableRefObject<AbortController | undefined>,
): AsyncGenerator<TextSection | Next | Close> {
  for (const text of actions) {
    if (signal.aborted) {
      return
    }

    if (text.type === 'style') {
      if (text.size === null) {
        style.size = 1
      } else if (text.size != null) {
        style.size = text.size
      }

      if (text.skipable != null) {
        style.skipable = text.skipable
      }

      if (text.family != null) {
        style.family = text.family
      }

      if (text.effect !== undefined) {
        style.effect = text.effect
      }
    } else if (text.type === 'pause') {
      nextSignalRef.current = new AbortController()
      const combinedSignal = style.skipable
        ? anySignal(signal, nextSignalRef.current.signal)
        : signal
      if (await wait(text.delay, combinedSignal).catch(() => signal.aborted)) {
        return
      }
    } else if (text.type === 'text') {
      const styleCopy = { ...style }
      yield {
        type: 'text-section',
        id: (Math.random() * 1000000).toString(16).replace('.', ''),
        text: text.value,
        style: styleCopy,
      }
    } else if (text.type === 'state') {
      useDialog.getState().changeDialogState((state) => text.set(state))
    } else if (text.type === 'condition') {
      const applies = text.fn(useDialog.getState().dialogState!)
      if (applies) {
        yield* textApplier(text.text, signal, { ...style }, nextSignalRef)
      }
    } else if (text.type === 'run') {
      await text.fn()
    } else if (text.type === 'next') {
      yield { type: 'next', dialogEntryId: text.dialogEntryId }
    } else if (text.type === 'close') {
      yield { type: 'close' }
    }
  }
}

const effectClassGenerator = (effect: string | null, num: number) => {
  if (effect === 'wave') {
    return `${styles.wave} ${styles['wave-' + ((num % 8) + 1)]}`
  }
  if (effect === 'crazy') {
    return `${styles.crazy} ${styles['crazy-' + ((num % 10) + 1)]}`
  }

  return undefined
}

const fontFamilyMap = {
  normal: 'Mali',
  italic: 'Mali',
  code: 'monospace',
}

const fontStyleMap = {
  normal: 'normal',
  italic: 'italic',
  code: 'normal',
}

export default forwardRef<DialogTextRef, DialogTextProps>(function DialogText({}, ref) {
  const [textSections, setTextSections] = useState<TextSection[]>([])
  const [onChoiceClick, dialogEntry, finished, setFinished] = useDialog((state) => [
    state.choiceAction,
    state.currentEntry!,
    state.finished,
    state.setFinished,
  ])
  const input = useInput()
  const nextSignalRef = useRef<AbortController>()

  useImperativeHandle(
    ref,
    () => ({
      next: () => nextSignalRef.current?.abort(),
      finished,
    }),
    [finished],
  )

  useEffect(
    () =>
      input.forKey('interact').subscribe({
        release() {
          nextSignalRef.current?.abort()
        },
      }),
    [],
  )

  useLayoutEffect(() => {
    const fn = async (signal: AbortSignal) => {
      // TODO move initial delay to dialog hud
      if (await wait(500, signal).catch(() => true)) {
        return
      }

      const initialStyle: TextSection['style'] = {
        size: 1,
        skipable: true,
        family: 'normal',
        effect: null,
      }
      let next: `${string}:${string}` | 'close' | null = null
      for await (const section of textApplier(
        dialogEntry.text,
        signal,
        initialStyle,
        nextSignalRef,
      )) {
        if (section.type === 'text-section') {
          setTextSections((sections) => [...sections, section])
        } else if (section.type === 'next') {
          next = section.dialogEntryId
          break
        } else if (section.type === 'close') {
          next = 'close'
          break
        }
      }

      // add artificial wait to avoid skiping text too fast
      if (await wait(650, signal).catch(() => signal.aborted)) {
        return
      }

      setFinished()
      if (!dialogEntry.choices && next) {
        nextSignalRef.current = new AbortController()
        nextSignalRef.current.signal.addEventListener(
          'abort',
          () => {
            const state = useDialog.getState()
            if (next === 'close') {
              state.close()
            } else {
              state.next(next!)
            }
          },
          { once: true, capture: false },
        )
      } else {
        nextSignalRef.current = undefined
      }
    }

    const abortController = new AbortController()
    setTextSections([])
    // setFinished(false)
    fn(abortController.signal)

    return () => abortController.abort()
  }, [dialogEntry])

  const nextClassName =
    dialogEntry.who === 'player' ? styles['finished-player'] : styles['finished-npc']
  return (
    <>
      <div className={styles.container}>
        {textSections.map(({ id, text, style }) => (
          <span
            key={id}
            style={{
              fontSize: `calc(${10 * style.size}px * var(--game-scale))`,
              verticalAlign: 'top',
              fontFamily: fontFamilyMap[style.family],
              fontStyle: fontStyleMap[style.family],
            }}
          >
            {style.effect
              ? text.split('').map((v, i) => (
                  <span key={i} className={effectClassGenerator(style.effect, i)}>
                    {v === ' ' ? <>&nbsp;</> : v}
                  </span>
                ))
              : text}
          </span>
        ))}
        <DialogTextChoices
          choices={finished ? dialogEntry.choices : undefined}
          onClick={onChoiceClick}
          show={!!dialogEntry.choices && finished}
        />
      </div>

      {!dialogEntry.choices && finished && (
        <span className={nextClassName} aria-label="Next">
          &gt;
        </span>
      )}
    </>
  )
})
