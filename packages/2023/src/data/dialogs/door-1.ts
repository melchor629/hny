import useInventory from '../../hooks/use-inventory'
import { newDialog } from '../../types/dialogs'

const door1Dialog = newDialog('door-1', () => ({
  hasKey1: !!useInventory.getState().inventory.find((i) => i.id === 'key-a-door-1')?.count,
  hasKey2: !!useInventory.getState().inventory.find((i) => i.id === 'key-b-door-1')?.count,
}))
  .addEntry('text', 'player', (builder) =>
    builder.setText((b) =>
      b
        .condition(
          (state) => !state.hasKey1 && !state.hasKey2,
          (bb) =>
            bb
              .text('Mmmm... ')
              .pause(500)
              .style({ size: 0.75 })
              .text('Ufff... ')
              .style({ size: 1 })
              .pause(1000)
              .text('La puerta ')
              .pause(300)
              .text('no abre. ')
              .pause(1100)
              .text('Pero tiene una cerradura, ')
              .pause(1500)
              .text('debe haber alguna llave por aquí.')
              .close(),
        )
        .condition(
          (state) => (state.hasKey1 || state.hasKey2) && !(state.hasKey1 && state.hasKey2),
          (bb) =>
            bb
              .text('Que raro… ')
              .pause(600)
              .text('A ver… ')
              .pause(1500)
              .text('Nop, no abre. ')
              .pause(1000)
              .text('¿Y si hace falta otra llave?')
              .close(),
        )
        .condition(
          (state) => state.hasKey1 && state.hasKey2,
          (bb) =>
            bb
              .style({ size: 1.25 })
              .text('¡Perfecto! ')
              .style({ size: 1 })
              .pause(500)
              .text('Puerta abierta. ')
              .pause(1500)
              .text('¡A por la instantánea!')
              .close(),
        ),
    ),
  )
  .build()

export default door1Dialog
