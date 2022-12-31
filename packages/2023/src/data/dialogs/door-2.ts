import useDungeonState from '../../hooks/use-dungeon-state'
import { newDialog } from '../../types/dialogs'

const door2Dialog = newDialog('door-2', null)
  .addEntry('text-1', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ skipable: false })
        .text('A ver… ')
        .pause(1500)
        .style({ skipable: true })
        .run(() => useDungeonState.getState().changeDoorOpenState('door2', true))
        .text('¡Anda! ')
        .pause(300)
        .text('Se abrió sin más.')
        .next('text-2'),
    ),
  )
  .addEntry('text-2', 'dev', (builder) =>
    builder
      .setText((b) =>
        b
          .text('¿Que esperabas? ')
          .pause(1000)
          .text('¿Que todas las puertas estuvieran bloqueadas?')
          .pause(2000),
      )
      .setChoices((b) => b.addNext('yes', '¿Sí?', 'text-3').addClose('no', 'No')),
  )
  .addEntry('text-3', 'dev', (builder) =>
    builder.setText((b) =>
      b.text('Ah').pause(750).text('.').pause(500).text('.').pause(500).text('.').close(),
    ),
  )
  .build()

export default door2Dialog
