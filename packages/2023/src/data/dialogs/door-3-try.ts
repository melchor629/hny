import { newDialog } from '../../types/dialogs'

const door3TryDialog = newDialog('door-3-try', null)
  .addEntry('text', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('¡Ups! ')
        .pause(700)
        .text('Esta puerta no tiene cerradura. ')
        .pause(1750)
        .text('Debe haber algo que la abra')
        .pause(1000)
        .text('.')
        .pause(500)
        .text('.')
        .pause(500)
        .text('.')
        .close(),
    ),
  )
  .build()

export default door3TryDialog
