import { newDialog } from '../../types/dialogs'

const puzzle9SurrenderDialog = newDialog('puzzle-9-surrender', false)
  .addEntry('first', 'dev', (builder) =>
    builder
      .setText((b) => b.text('¿Te rindes ya? ').pause(1000).text('¿Sin conseguir el premio?'))
      .setChoices((b) =>
        b.addNext('yes', 'Luego vuelvo', 'surrender').addNext('no', '¡¡NO!!', 'continue'),
      ),
  )
  .addEntry('surrender', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .text('¡Oh! ')
        .pause(600)
        .text('No problemo. ')
        .pause(1000)
        .text('Vuelve cuando quieras.')
        .close(),
    ),
  )
  .addEntry('continue', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .state(() => true)
        .text('Así me gusta, ')
        .pause(750)
        .text('luchando hasta el final.')
        .close(),
    ),
  )
  .build()

export default puzzle9SurrenderDialog
