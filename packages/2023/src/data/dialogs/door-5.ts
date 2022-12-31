import { newDialog } from '../../types/dialogs'

const door5Dialog = newDialog('door-5', null)
  .addEntry('text', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Esta puerta ')
        .pause(700)
        .text('tiene una cerradura ')
        .pause(700)
        .text('para abrirla. ')
        .pause(1000)
        .text('¿Dónde estará la llave?')
        .close(),
    ),
  )
  .build()

export default door5Dialog
