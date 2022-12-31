import { newDialog } from '../../types/dialogs'

const rubbishInspectNothingDialog = newDialog('rubbish-inspect-nothing', () =>
  Math.trunc(Math.random() * 4),
)
  .addEntry('text', 'player', (builder) =>
    builder.setText((b) =>
      b
        .condition(
          (n) => n === 0,
          (bb) => bb.text('Nada por aquí...').close(),
        )
        .condition(
          (n) => n === 1,
          (bb) => bb.text('Solo hay basura...').close(),
        )
        .condition(
          (n) => n === 2,
          (bb) => bb.text('Apesta, ').pause(600).text('y sin nada interesante...').close(),
        )
        .condition(
          (n) => n === 3,
          (bb) =>
            bb
              .text('No se que hago ')
              .pause(750)
              .text('mirando basura ')
              .pause(650)
              .text('si no hay nada...')
              .close(),
        )
        .close(),
    ),
  )
  .build()

export default rubbishInspectNothingDialog
