import useDungeonState from '../../hooks/use-dungeon-state'
import useInventory from '../../hooks/use-inventory'
import { newDialog } from '../../types/dialogs'

const crackDialog = newDialog('crack', () => ({
  hasShovel: !!useInventory.getState().inventory.find((i) => i.id === 'shovel')?.count,
  hasSpecialObject: !!useInventory.getState().inventory.find((i) => i.id === 'special-object')
    ?.count,
}))
  .addEntry('text', 'player', (builder) =>
    builder.setText((b) =>
      b
        .condition(
          (state) => !state.hasShovel,
          (bb) =>
            bb
              .text('Mmmm... ')
              .pause(1500)
              .text('Un agujero en el suelo... ')
              .pause(1000)
              .text('Con una pala, creo que podría abrirlo.')
              .close(),
        )
        .condition(
          (state) => state.hasShovel && !state.hasSpecialObject,
          (bb) =>
            bb
              .text('Vale, ')
              .pause(600)
              .text('a ver… ')
              .pause(1500)
              .style({ size: 0.7 })
              .text('uf ')
              .pause(1000)
              .text('buf ')
              .pause(1000)
              .text('uf ')
              .pause(1000)
              .text('ay ')
              .pause(1000)
              .text('uf ')
              .pause(1000)
              .style({ size: 1.25 })
              .run(() => useDungeonState.getState().openClot())
              .text('¡UY!')
              .next('crack-opened'),
        )
        .condition(
          (state) => state.hasShovel && state.hasSpecialObject,
          (bb) =>
            bb
              .text('Un agujero en el suelo. ')
              .pause(1500)
              .text('Aquí había antes cosas. ')
              .pause(1500)
              .text('Ya no ')
              .pause(500)
              .text(':)')
              .pause(500)
              .text(')')
              .pause(500)
              .text(')')
              .pause(500)
              .text(')')
              .pause(500)
              .text(')')
              .pause(400)
              .text(')')
              .pause(100)
              .text(')')
              .pause(50)
              .text(')')
              .pause(60)
              .text(')')
              .pause(50)
              .text(')')
              .pause(49)
              .text(')')
              .pause(51)
              .text(')')
              .pause(50)
              .text(')')
              .pause(50)
              .text(')')
              .pause(51)
              .text(')')
              .pause(52)
              .text(')')
              .pause(48)
              .text(')')
              .pause(100)
              .text(')')
              .pause(600)
              .text(')')
              .close(),
        )
        .close(),
    ),
  )
  .addEntry('crack-opened', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Vale, ')
        .pause(700)
        .text('se ha abierto, ')
        .pause(800)
        .text('al fin. ')
        .pause(1000)
        .text('Veamos que hay dentro...')
        .next('looking-inside'),
    ),
  )
  .addEntry('looking-inside', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Hay una ')
        .style({ family: 'italic' })
        .text('"fotografía". ')
        .pause(1000)
        .run(() => useInventory.getState().discoverPhoto('photo-17'))
        .style({ family: 'normal' })
        .text('...')
        .pause(1000)
        .text(' Y un objeto raro.')
        .pause(1500)
        .text(' Eh, ')
        .pause(10000)
        .text('lo mismo es lo que buscaba el pibe de la cárcel.')
        .next('for-me'),
    ),
  )
  .addEntry('for-me', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('A ver, que lo coja...')
        .pause(1000)
        .run(() => useInventory.getState().addToInventory('special-object'))
        .pause(1000)
        .text(' Ale. ')
        .pause(700)
        .text('Debería llevárselo al encarcelado...')
        .close(),
    ),
  )
  .build()

export default crackDialog
