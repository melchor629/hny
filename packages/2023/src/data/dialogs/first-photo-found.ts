import useInventory from '../../hooks/use-inventory'
import { newDialog } from '../../types/dialogs'

const firstPhotoDialog = newDialog(
  'first-photo-found',
  () =>
    useInventory.getState().book.filter((p) => p.discovered).length /
    useInventory.getState().book.length,
)
  .addEntry('found', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Anda, ')
        .pause(500)
        .text('mira que es lo que tenemos aquí…')
        .pause(200)
        .next('found-2'),
    ),
  )
  .addEntry('found-2', 'player', (builder) =>
    builder.setText((b) =>
      b
        .condition(
          (p) => p < 0.5,
          (bb) =>
            bb
              .text('Aunque,')
              .pause(500)
              .text(' aún quedan bastantes por pillar…')
              .pause(200)
              .close(),
        )
        .condition(
          (p) => p < 0.75,
          (bb) => bb.text('Por suerte,').pause(100).text(' no me quedan tantos por pillar').close(),
        )
        .text('Otra de estas ')
        .pause(500)
        .text('cosas')
        .pause(400)
        .text('.')
        .next('found-late'),
    ),
  )
  .addEntry('found-late', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .text('¡Enhorabuena!')
        .pause(750)
        .text(' Has encontrado')
        .pause(100)
        .text(' el primero de todos')
        .pause(800)
        .text(' ahora')
        .pause(500)
        .style({ size: 1.5 })
        .text(':)')
        .next('found-late-2'),
    ),
  )
  .addEntry('found-late-2', 'player', (builder) => builder.setText((b) => b.text('...').close()))
  .build()

export default firstPhotoDialog
