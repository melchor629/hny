import useDungeonState from '../../hooks/use-dungeon-state'
import useInventory from '../../hooks/use-inventory'
import { newDialog } from '../../types/dialogs'

const puzzle9EndDialog = newDialog('puzzle-9-start', null)
  .addEntry('first', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Oooo')
        .style({ size: 0.8 })
        .pause(200)
        .text('oooo')
        .style({ size: 0.6 })
        .pause(200)
        .text('oooo')
        .style({ size: 0.4 })
        .pause(200)
        .text('oooo ')
        .pause(500)
        .style({ size: 0.9 })
        .text('Está chiquito. ')
        .pause(1000)
        .style({ size: 1 })
        .text('A ver qué contiene...')
        .next('second'),
    ),
  )
  .addEntry('second', 'player', (builder) =>
    builder.setText((b) =>
      b
        .run(() => useDungeonState.getState().puzzle9Completed())
        .text('Muchas cosas')
        .pause(600)
        .text('.')
        .pause(600)
        .text('.')
        .pause(600)
        .text('.')
        .pause(1000)
        .text(' Aunque, ')
        .pause(900)
        .style({ size: 0.75, effect: 'wave' })
        .text('uuuuuuu')
        .pause(500)
        .run(() => useInventory.getState().discoverPhoto('photo-9'))
        .pause(250)
        .style({ size: 0.9, effect: null })
        .text(' de locos')
        .close(),
    ),
  )
  .build()

export default puzzle9EndDialog
