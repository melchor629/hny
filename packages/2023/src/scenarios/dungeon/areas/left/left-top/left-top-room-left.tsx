import rubbishInspectNothingDialog from '../../../../../data/dialogs/rubbish-inspect-nothing'
import rubbishInspectSomethingDialog from '../../../../../data/dialogs/rubbish-inspect-something'
import useDialog from '../../../../../hooks/use-dialog'
import useInventory from '../../../../../hooks/use-inventory'
import MapTile from '../../../../../objects/map-tile'
import Photo from '../../../../../objects/props/photo'
import Rubbish from '../../../../../objects/props/rubbish'

const nothing = () => useDialog.getState().reset(rubbishInspectNothingDialog)

const something1 = () => {
  const inv = useInventory.getState()
  const codes = inv.inventory.filter((i) => i.id.startsWith('rubbish-code-')).map((i) => i.count)
  if (!codes[0] || !codes[1]) {
    useDialog.getState().reset(rubbishInspectSomethingDialog)
  } else {
    nothing()
  }
}

const something2 = () => {
  const inv = useInventory.getState()
  const codes = inv.inventory.filter((i) => i.id.startsWith('rubbish-code-')).map((i) => i.count)
  if (!codes[0] || !codes[1]) {
    useDialog.getState().reset(rubbishInspectSomethingDialog)
  } else {
    nothing()
  }
}

export default function LeftTopRoomLeft() {
  return (
    <>
      {/* main hall > branch left > branch top > room > branch left */}
      <MapTile wall="center-both" x={33} y={29} />
      <MapTile wall="center-both" x={32} y={29} />
      <MapTile wall="center-both" x={31} y={29} />
      <MapTile wall="center-both" x={30} y={29} />
      <MapTile wall="center-both" x={29} y={29} />
      <MapTile wall="center-both" x={28} y={29} />
      <MapTile wall="left" corners={['right-top', 'right-bottom']} x={27} y={29} />

      {/* main hall > branch left > branch top > room > branch left > branch bottom */}
      <MapTile wall="both-center" x={27} y={30} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={27} y={31} />
      <MapTile wall="right-bottom" corners={['left-top']} x={27} y={32} />
      <MapTile wall="center-both" x={26} y={32} />
      <MapTile wall="left-both" x={25} y={32} />

      {/* main hall > branch left > branch top > room > branch left > branch top */}
      <MapTile wall="both-center" corners={['right-aftertop']} x={27} y={28} />
      <MapTile wall="both-center" x={27} y={27} />
      <MapTile wall="both-center" x={27} y={26} />
      <MapTile wall="right-top" corners={['left-bottom']} x={27} y={25} />
      <MapTile wall="center-both" x={26} y={25} />
      <MapTile wall="center-both" x={25} y={25} />
      <MapTile wall="center-both" x={24} y={25} />
      <MapTile wall="left" corners={['right-top', 'right-bottom']} x={23} y={25} />

      {/* main hall > branch left > branch top > room > branch left > branch top > branch bottom */}
      <MapTile wall="both-center" x={23} y={26} />
      <MapTile wall="both-center" x={23} y={27} />
      <MapTile wall="both-center" corners={['left-aftertop', 'right-aftertop']} x={23} y={28} />
      <MapTile wall="bottom" corners={['left-top', 'right-top']} x={23} y={29} />

      {/* main hall > branch left > branch top > room > branch left > branch top > branch bottom > branch right */}
      <MapTile wall="center-both" x={24} y={29} />
      <MapTile wall="center-both" x={25} y={29} />
      <MapTile wall="right-both" x={26} y={29} />
      <Rubbish x={26} y={29} onInteraction={nothing} />

      {/* main hall > branch left > branch top > room > branch left > branch top > branch bottom > branch left */}
      <MapTile wall="center-both" x={22} y={29} />
      <MapTile wall="center-both" x={21} y={29} />
      <MapTile wall="center-both" x={20} y={29} />
      <MapTile wall="center-both" x={19} y={29} />
      <MapTile wall="center-both" x={18} y={29} />
      <MapTile wall="left-bottom" corners={['right-top']} x={17} y={29} />
      <MapTile
        wall="both-center"
        collisionWall="right"
        corners={['right-aftertop']}
        x={17}
        y={28}
      />
      <MapTile wall="both-center" x={17} y={27} />
      <MapTile wall="left" corners={['right-top', 'right-bottom']} x={17} y={26} />

      {/* main hall > branch left > branch top > room > branch left > branch top > branch bottom > branch left > branch top */}
      <MapTile wall="both-center" corners={['right-aftertop']} x={17} y={25} />
      <MapTile wall="both-center" x={17} y={24} />
      <MapTile wall="left-top" corners={['right-bottom']} x={17} y={23} />
      <MapTile wall="right-bottom" corners={['left-top']} x={18} y={23} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={18} y={22} />
      <MapTile wall="right-top" corners={['left-bottom']} x={18} y={21} />
      <MapTile wall="center-both" x={17} y={21} />
      <MapTile wall="center-both" x={16} y={21} />
      <MapTile wall="left-bottom" corners={['right-top']} x={15} y={21} />
      <MapTile wall="both-center" corners={['right-aftertop']} x={15} y={20} />
      <MapTile wall="both-center" x={15} y={19} />
      <MapTile wall="left-top" corners={['right-bottom']} x={15} y={18} />
      <MapTile wall="center-both" x={16} y={18} />
      <MapTile wall="center-both" x={17} y={18} />
      <MapTile wall="center-both" x={18} y={18} />
      <MapTile wall="center-both" x={19} y={18} />
      <MapTile wall="center-both" x={20} y={18} />

      {/* main hall > branch left > branch top > room > branch left > branch top > branch bottom > branch left > branch right */}
      <MapTile wall="center-both" x={18} y={26} />
      <MapTile wall="center-both" x={19} y={26} />
      <MapTile wall="top" corners={['left-bottom', 'right-bottom']} x={20} y={26} />
      <MapTile wall="both-bottom" x={20} y={27} />
      <Rubbish x={20} y={27} onInteraction={nothing} />
      <MapTile wall="right-bottom" corners={['left-top']} x={21} y={26} />
      <Photo alt={5} photoId="photo-11" x={21} y={26} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={21} y={25} />
      <MapTile wall="both-center" x={21} y={24} />
      <MapTile wall="both-center" x={21} y={23} />
      <MapTile wall="both-center" x={21} y={22} />
      <MapTile wall="both-center" x={21} y={21} />
      <MapTile wall="both-center" x={21} y={20} />
      <MapTile wall="both-center" x={21} y={19} />

      {/* main hall > branch left > branch top > room > branch left > branch top > branch top */}
      <MapTile wall="both-center" corners={['right-aftertop']} x={23} y={24} />
      <MapTile wall="left-top" corners={['right-bottom']} x={23} y={23} />
      <MapTile wall="center-both" x={24} y={23} />
      <MapTile wall="center-both" x={25} y={23} />
      <MapTile wall="right-bottom" corners={['left-top']} x={26} y={23} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={26} y={22} />
      <MapTile wall="left-top" corners={['right-bottom']} x={26} y={21} />
      <MapTile wall="center-both" x={27} y={21} />
      <MapTile wall="right-bottom" corners={['left-top']} x={28} y={21} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={28} y={20} />
      <MapTile
        wall="center"
        corners={['left-top', 'right-top', 'left-bottom', 'right-bottom']}
        x={28}
        y={19}
      />

      {/* main hall > branch left > branch top > room > branch left > branch top > branch top > branch top */}
      <MapTile wall="both-center" corners={['left-aftertop', 'right-aftertop']} x={28} y={18} />
      <MapTile wall="both-center" x={28} y={17} />
      <MapTile wall="top" corners={['left-bottom', 'right-bottom']} x={28} y={16} />
      <MapTile wall="left-both" x={27} y={16} />
      <MapTile wall="right-both" x={29} y={16} />
      <Rubbish x={27} y={16} onInteraction={nothing} />
      <Rubbish x={29} y={16} onInteraction={something1} />

      {/* main hall > branch left > branch top > room > branch left > branch top > branch top > branch right */}
      <MapTile wall="center-both" x={29} y={19} />
      <MapTile wall="center-both" x={30} y={19} />
      <MapTile wall="right" corners={['left-top', 'left-bottom']} x={31} y={19} />
      <MapTile wall="both-top" corners={['left-aftertop']} x={31} y={18} />
      <Rubbish x={31} y={18} onInteraction={nothing} />
      <MapTile wall="both-center" x={31} y={20} />
      <MapTile wall="both-center" x={31} y={21} />
      <MapTile wall="both-center" corners={['left-aftertop']} x={31} y={22} />
      <MapTile wall="right-bottom" corners={['left-top']} x={31} y={23} />
      <MapTile wall="center-both" x={30} y={23} />
      <MapTile wall="left-both" x={29} y={23} />
      <Rubbish x={29} y={23} onInteraction={something2} />

      {/* main hall > branch left > branch top > room > branch left > branch top > branch top > branch left */}
      <MapTile wall="center-both" x={27} y={19} />
      <MapTile wall="center-both" x={26} y={19} />
      <MapTile wall="center-both" x={25} y={19} />
      <MapTile wall="center-both" x={24} y={19} />
      <MapTile wall="center-both" x={23} y={19} />
      <MapTile wall="left-bottom" corners={['right-top']} x={22} y={19} />
      <MapTile wall="right-top" corners={['right-aftertop', 'left-bottom']} x={22} y={18} />
      <MapTile wall="top" corners={['left-bottom', 'right-bottom']} x={21} y={18} />
    </>
  )
}
