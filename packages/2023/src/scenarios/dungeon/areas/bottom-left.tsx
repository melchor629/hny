import { useCallback, useMemo } from 'react'
import puzzle6Chest from '../../../data/dialogs/puzzle-6-chest'
import puzzle6Panel1 from '../../../data/dialogs/puzzle-6-panel-1'
import puzzle6Panel2 from '../../../data/dialogs/puzzle-6-panel-2'
import puzzle6PanelDone from '../../../data/dialogs/puzzle-6-panel-done'
import codePaint1 from '../../../data/props/stuff/code-paint-1'
import useDialog from '../../../hooks/use-dialog'
import useDungeonState from '../../../hooks/use-dungeon-state'
import MapProp from '../../../objects/map-prop'
import MapTile from '../../../objects/map-tile'
import CodePanel from '../../../objects/props/code-panel'
import WeirdChest from '../../../objects/props/weird-chest'

export default function BottomLeft() {
  const [panel1, panel2] = useDungeonState((s) => s.puzzle6)
  const panel1Dialog = useMemo(() => (panel1 ? puzzle6PanelDone : puzzle6Panel1), [panel1])
  const panel2Dialog = useMemo(() => (panel2 ? puzzle6PanelDone : puzzle6Panel2), [panel2])

  const chestInteraction = useCallback(() => {
    useDialog.getState().reset(puzzle6Chest)
  }, [])

  return (
    <>
      {/* main hall > branch bottom left */}
      <MapProp prop={codePaint1} x={38.5 * 32} y={49 * 32 - 6} />
      <MapTile wall="both-center" x={42} y={48} />
      <MapTile wall="both-center" corners={['left-aftertop', 'right-aftertop']} x={42} y={49} />

      <MapTile wall="left-top" x={37} y={50} />
      <MapTile wall="top" x={38} y={50} />
      <MapTile wall="top" x={39} y={50} />
      <MapTile wall="top" x={40} y={50} />
      <MapTile wall="top" x={41} y={50} />
      <MapTile wall="center" corners={['left-top', 'right-top']} x={42} y={50} />
      <MapTile wall="top" x={43} y={50} />
      <MapTile wall="right-top" x={44} y={50} />

      <MapTile wall="left" x={37} y={51} />
      <MapTile wall="center" corners={['right-bottom']} x={38} y={51} />
      <MapTile wall="bottom" x={39} y={51} />
      <MapTile wall="center" corners={['left-bottom']} x={40} y={51} />
      <MapTile wall="center" corners={['right-bottom']} x={41} y={51} />
      <MapTile wall="bottom" x={42} y={51} />
      <MapTile wall="center" corners={['left-bottom']} x={43} y={51} />
      <MapTile wall="right" x={44} y={51} />

      <MapTile wall="left" x={37} y={52} />
      <MapTile wall="right" corners={['right-aftertop']} x={38} y={52} />
      <MapTile wall="empty" x={39} y={52} />
      <MapTile wall="left" corners={['left-aftertop']} x={40} y={52} />
      <WeirdChest open={panel1 && panel2} onInteraction={chestInteraction} x={40.5} y={52} />
      <MapTile wall="right" corners={['right-aftertop']} x={41} y={52} />
      <MapTile wall="empty" x={42} y={52} />
      <MapTile wall="left" corners={['left-aftertop']} x={43} y={52} />
      <MapTile wall="right" x={44} y={52} />

      <MapTile wall="left" x={37} y={53} />
      <MapTile wall="center" corners={['right-top']} x={38} y={53} />
      <MapTile wall="top" x={39} y={53} />
      <CodePanel dialog={panel1Dialog} x={39} y={53} />
      <MapTile wall="center" corners={['left-top']} x={40} y={53} />
      <MapTile wall="center" corners={['right-top']} x={41} y={53} />
      <MapTile wall="top" x={42} y={53} />
      <CodePanel dialog={panel2Dialog} x={42} y={53} />
      <MapTile wall="center" corners={['left-top']} x={43} y={53} />
      <MapTile wall="right" x={44} y={53} />

      <MapTile wall="left-bottom" x={37} y={54} />
      <MapTile wall="bottom" x={38} y={54} />
      <MapTile wall="bottom" x={39} y={54} />
      <MapTile wall="bottom" x={40} y={54} />
      <MapTile wall="bottom" x={41} y={54} />
      <MapTile wall="bottom" x={42} y={54} />
      <MapTile wall="bottom" x={43} y={54} />
      <MapTile wall="right-bottom" x={44} y={54} />
    </>
  )
}
