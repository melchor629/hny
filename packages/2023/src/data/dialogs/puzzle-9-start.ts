import useInventory from '../../hooks/use-inventory'
import { newDialog } from '../../types/dialogs'

const puzzle9StartDialog = newDialog('puzzle-9-start', null)
  .addEntry('first', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .text('¡Ey ')
        .pause(500)
        .text('amigo! ')
        .pause(1000)
        .text('Te va a hacer falta ')
        .pause(1000)
        .text('esto.')
        .run(() => useInventory.getState().addToInventory('pow-gun'))
        .next('second'),
    ),
  )
  .addEntry('second', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('¡Oh! ')
        .pause(600)
        .text('Gracias. ')
        .pause(1000)
        .text('Pero, ')
        .pause(900)
        .text('¿para qué sirve?')
        .next('third'),
    ),
  )
  .addEntry('third', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .text('Empuja basura. ')
        .pause(1300)
        .text('Pero solo ')
        .pause(750)
        .text('una unidad de basura ')
        .pause(800)
        .text('a la vez. ')
        .pause(1500)
        .text('ENJOY :)')
        .close(),
    ),
  )
  .build()

export default puzzle9StartDialog
