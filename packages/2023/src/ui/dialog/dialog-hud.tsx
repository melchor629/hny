import { useCallback, useRef, MouseEventHandler, useEffect } from 'react'
import useDialog from '../../hooks/use-dialog'
import useInput from '../../hooks/use-input'
import styles from './dialog-hud.module.scss'
import DialogPicture from './dialog-picture'
import DialogText from './dialog-text'

export default function DialogHud() {
  const [currentEntry] = useDialog((state) => [state.currentEntry])
  const input = useInput('dialog')
  const dialogTextRef = useRef<any>(null)

  const onContainerClick: MouseEventHandler<HTMLElement> = useCallback(
    (e) => {
      e.preventDefault()
      if (currentEntry?.choices) {
        return
      }

      dialogTextRef.current?.next()
    },
    [currentEntry],
  )

  useEffect(() => {
    if (currentEntry) {
      input.focus()
    } else {
      input.blur()
    }
  }, [currentEntry])

  if (currentEntry == null) {
    return null
  }

  const itsMe = currentEntry.who === 'player'
  return (
    <section className={styles.container} onClick={onContainerClick}>
      {itsMe && <DialogPicture who="player" />}
      <DialogText ref={dialogTextRef} dialogEntry={currentEntry} />
      {!itsMe && <DialogPicture who={currentEntry.who} />}
    </section>
  )
}
