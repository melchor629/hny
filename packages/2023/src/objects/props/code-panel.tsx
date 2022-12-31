import { useCallback } from 'react'
import codePanel from '../../data/props/stuff/code-panel'
import useDialog from '../../hooks/use-dialog'
import type { Dialog } from '../../types/dialogs'
import MapProp from '../map-prop'

interface CodePanelProps {
  x: number
  y: number
  dialog: Dialog
}

export default function CodePanel({ x, y, dialog }: CodePanelProps) {
  const onInteraction = useCallback(() => {
    useDialog.getState().reset(dialog)
  }, [dialog])

  return (
    <MapProp
      prop={codePanel}
      x={x * 32 - 2.5}
      y={y * 32 - 18 - 2.5}
      onInteraction={onInteraction}
    />
  )
}
