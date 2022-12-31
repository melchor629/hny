import useDungeonState from '../../hooks/use-dungeon-state'
import useInventory from '../../hooks/use-inventory'
import { newDialog } from '../../types/dialogs'

const doorCode2Dialog = newDialog('door-code-2', () => ({
  hasCode1: !!useInventory.getState().inventory.find((i) => i.id === 'paper-code-1')?.count,
  hasCode2: !!useInventory.getState().inventory.find((i) => i.id === 'paper-code-1')?.count,
}))
  .addEntry('text', 'player', (builder) =>
    builder.setText((b) =>
      b
        .condition(
          (n) => !n.hasCode1 && !n.hasCode2,
          (bb) =>
            bb
              .text('Otra puerta con código. ')
              .pause(1000)
              .text('Voy a probar')
              .pause(500)
              .text('.')
              .pause(500)
              .text('.')
              .pause(500)
              .text('.')
              .pause(500)
              .text(' Creo que necesito otro código ')
              .pause(800)
              .text(':/')
              .close(),
        )
        .condition(
          (n) => (n.hasCode1 || n.hasCode2) && !(n.hasCode1 && n.hasCode2),
          (bb) =>
            bb
              .text('Me falta una parte del código, ')
              .pause(1000)
              .text('no puedo abrirla sin ella.')
              .close(),
        )
        .condition(
          (n) => n.hasCode1 && n.hasCode2,
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
              .run(() => useDungeonState.getState().changeDoorOpenState('doorCode2', true))
              .text(' pacasa')
              .close(),
        )
        .close(),
    ),
  )
  .build()

export default doorCode2Dialog
