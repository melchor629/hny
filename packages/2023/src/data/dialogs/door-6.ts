import useDungeonState from '../../hooks/use-dungeon-state'
import useInventory from '../../hooks/use-inventory'
import { newDialog } from '../../types/dialogs'

const door6Dialog = newDialog('door-6', () => ({
  hasMissingPhotos: !useInventory
    .getState()
    .book.filter((p) => p.id.startsWith('photo-') && !p.id.endsWith('20') && !p.id.endsWith('21'))
    .every((p) => p.discovered),
  tries: useDungeonState.getState().brokenDoorTries,
}))
  .addEntry('first', 'player', (builder) =>
    builder.setText((b) =>
      b
        .condition(
          (s) => s.hasMissingPhotos && s.tries === 0,
          (bb) => bb.text('Creo que me olvido de algo...').next('missing-dev'),
        )
        .condition(
          (s) => !s.hasMissingPhotos && s.tries === 0,
          (bb) =>
            bb
              .run(() => useDungeonState.getState().doBrokenDoorTry())
              .text('Esta puerta parece rota...')
              .close(),
        )
        .condition(
          (s) => s.tries === 1,
          (bb) =>
            bb
              .run(() => useDungeonState.getState().doBrokenDoorTry())
              .text('Ufff... ')
              .pause(1000)
              .style({ size: 1.5, effect: 'crazy' })
              .text('*pum* ')
              .pause(1250)
              .style({ size: 1.75 })
              .text('¡Ay! ')
              .style({ size: 1, effect: null })
              .pause(1000)
              .text('Parece que está cediendo...')
              .close(),
        )
        .condition(
          (s) => s.tries === 2,
          (bb) =>
            bb
              .run(() => useDungeonState.getState().doBrokenDoorTry())
              .style({ size: 1.5, effect: 'crazy' })
              .text('*pum* ')
              .pause(1250)
              .style({ size: 1.75, effect: null })
              .text('¡VAMOS! ')
              .style({ size: 1 })
              .pause(1000)
              .text('Ábrete ')
              .pause(250)
              .text('maldita puerta...')
              .close(),
        )
        .condition(
          (s) => s.tries === 3,
          (bb) =>
            bb
              .run(() => useDungeonState.getState().doBrokenDoorTry())
              .style({ size: 1.75 })
              .text('¡AL FIN! ')
              .style({ size: 1 })
              .pause(1000)
              .text('Se abrió ')
              .pause(250)
              .text('la maldita puerta...')
              .close(),
        )
        .close(),
    ),
  )
  .addEntry('missing-dev', 'dev', (builder) =>
    builder
      .setText((b) =>
        b
          .text('Creo que te falta alguna "fotografía" por pillar. ')
          .pause(2300)
          .text('¿Seguro que quieres continuar?'),
      )
      .setChoices((b) => b.addNext('yes', '¡Sí!', 'sudo-open').addClose('no', '¡¡No!!')),
  )
  .addEntry('sudo-open', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .run(() => useDungeonState.getState().doBrokenDoorTry())
        .text('Adelante entonces, ')
        .pause(1000)
        .text('abre la puerta')
        .pause(350)
        .text(' :)')
        .next('open-try'),
    ),
  )
  .addEntry('open-try', 'player', (builder) =>
    builder.setText((b) => b.text('Esta puerta parece rota...').close()),
  )
  .build()

export default door6Dialog
