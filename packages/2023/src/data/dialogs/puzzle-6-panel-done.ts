import { newDialog } from '../../types/dialogs'

const puzzle6PanelDone = newDialog('puzzle-6-panel-done', null)
  .addEntry('done', 'code-panel', (builder) =>
    builder.setText((b) => b.style({ family: 'code' }).text('CODE ACCEPTED').close()),
  )
  .build()

export default puzzle6PanelDone
