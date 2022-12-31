import { newDialog } from '../../types/dialogs'

const door4Dialog = newDialog('door-4', null)
  .addEntry('text', 'player', (builder) =>
    builder.setText((b) =>
      b
        .pause(500)
        .text('Creo que ')
        .pause(300)
        .text('he escuchado ')
        .pause(300)
        .text('algo abrirse')
        .pause(600)
        .text('…')
        .close(),
    ),
  )
  .build()

export default door4Dialog
