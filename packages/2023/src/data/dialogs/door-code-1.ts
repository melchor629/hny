import useDungeonState from '../../hooks/use-dungeon-state'
import useInventory from '../../hooks/use-inventory'
import { newDialog } from '../../types/dialogs'

const doorCode1Dialog = newDialog('door-code-1', () => ({
  hasCodeI: !!useInventory.getState().inventory.find((i) => i.id === 'rubbish-code-I')?.count,
  hasCodeII: !!useInventory.getState().inventory.find((i) => i.id === 'rubbish-code-II')?.count,
}))
  .addEntry('text', 'player', (builder) =>
    builder.setText((b) =>
      b
        .condition(
          (n) => !n.hasCodeI && !n.hasCodeII,
          (bb) =>
            bb
              .text('Esta puerta')
              .pause(500)
              .text('.')
              .pause(500)
              .text('.')
              .pause(500)
              .text('.')
              .pause(500)
              .text(' Parece que se abre ')
              .pause(800)
              .text('con un código ')
              .pause(500)
              .text(':/')
              .close(),
        )
        .condition(
          (n) => (n.hasCodeI || n.hasCodeII) && !(n.hasCodeI && n.hasCodeII),
          (bb) =>
            bb
              .text('Me falta una parte del código, ')
              .pause(1000)
              .text('no puedo abrirla sin ella.')
              .close(),
        )
        .condition(
          (n) => n.hasCodeI && n.hasCodeII,
          (bb) =>
            bb
              .style({ skipable: false })
              .text('Un momento')
              .pause(500)
              .text('.')
              .pause(450)
              .text('.')
              .pause(400)
              .text('.')
              .pause(350)
              .text('.')
              .pause(300)
              .text('.')
              .pause(200)
              .text('.')
              .pause(100)
              .text('.')
              .pause(50)
              .text('.')
              .pause(25)
              .style({ skipable: true })
              .run(() => useDungeonState.getState().changeDoorOpenState('doorCode1', true))
              .text(' Abrido.')
              .close(),
        )
        .close(),
    ),
  )
  .build()

export default doorCode1Dialog
