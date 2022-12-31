import useDungeonState from '../../hooks/use-dungeon-state'
import useInventory from '../../hooks/use-inventory'
import { newDialog } from '../../types/dialogs'

const puzzle6Chest = newDialog('puzzle-6-panel-1', () => ({
  codeAccepted: useDungeonState.getState().puzzle6.every((v) => v),
  photoTaken: useInventory.getState().book.find((p) => p.id === 'photo-6')!.discovered,
}))
  .addEntry('text', 'player', (builder) =>
    builder.setText((b) =>
      b
        .condition(
          (s) => s.codeAccepted && !s.photoTaken,
          (bb) =>
            bb
              .text('A ver, ')
              .pause(750)
              .text('que hay en este cofre')
              .pause(1000)
              .text('...')
              .next('grab-photo'),
        )
        .condition(
          (s) => s.codeAccepted && s.photoTaken,
          (bb) => bb.text('Ya no hay nada de valor en este cofre...').close(),
        )
        .condition(
          (s) => !s.codeAccepted && !s.photoTaken,
          (bb) =>
            bb
              .text('Este cofre ')
              .pause(750)
              .text('no se quiere')
              .pause(750)
              .text(' abrir')
              .pause(500)
              .text('...')
              .next('not-open'),
        ),
    ),
  )
  .addEntry('not-open', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Debe haber ')
        .pause(500)
        .text('alguna manera ')
        .pause(500)
        .text('de ')
        .pause(250)
        .text('poder abrirlo')
        .pause(600)
        .text('...')
        .close(),
    ),
  )
  .addEntry('grab-photo', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('¡Anda! ')
        .pause(600)
        .text('Un papel de estos, ')
        .pause(800)
        .style({ effect: 'wave' })
        .text('que bien.')
        .run(() => useInventory.getState().discoverPhoto('photo-6'))
        .close(),
    ),
  )
  .build()

export default puzzle6Chest
