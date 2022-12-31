import { newDialog } from '../../types/dialogs'

const door3Dialog = newDialog('door-3', null)
  .addEntry('text', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('¡Eh! ')
        .pause(600)
        .text('Creo que esto abre la puerta aquella')
        .pause(1250)
        .text('.')
        .pause(500)
        .text('.')
        .pause(500)
        .text('.')
        .close(),
    ),
  )
  .build()

export default door3Dialog
