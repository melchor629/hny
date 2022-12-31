import useInventory from '../../hooks/use-inventory'
import { newDialog } from '../../types/dialogs'

const rubbishInspectSomethingDialog = newDialog('rubbish-inspect-something', () => ({
  hasCodeI: !!useInventory.getState().inventory.find((i) => i.id === 'rubbish-code-I')?.count,
  hasCodeII: !!useInventory.getState().inventory.find((i) => i.id === 'rubbish-code-II')?.count,
}))
  .addEntry('text', 'player', (builder) =>
    builder.setText((b) =>
      b
        .condition(
          (n) => !n.hasCodeI && !n.hasCodeII,
          (bb) => bb.text('Más basura...').next('found-one'),
        )
        .condition(
          (n) => (n.hasCodeI || n.hasCodeII) && !(n.hasCodeI && n.hasCodeII),
          (bb) =>
            bb
              .text('Un momento')
              .pause(500)
              .text('.')
              .pause(500)
              .text('.')
              .pause(500)
              .text('.')
              .pause(400)
              .text('.')
              .pause(300)
              .text('.')
              .pause(200)
              .text('.')
              .pause(100)
              .text('.')
              .pause(50)
              .text('.')
              .next('found-two'),
        )
        .close(),
    ),
  )
  .addEntry('found-one', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 1.5 })
        .text('¡ESPERA! ')
        .pause(1500)
        .style({ size: 1 })
        .text('¿Y este papel? ')
        .pause(125)
        .run(() => useInventory.getState().addToInventory('rubbish-code-I'))
        .next('found-one-2'),
    ),
  )
  .addEntry('found-one-2', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Me lo voy a quedar, ')
        .pause(750)
        .text('por si es útil ')
        .pause(500)
        .text(':)')
        .close(),
    ),
  )
  .addEntry('found-two', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 1.5 })
        .text('¡OTRO PAPEL! ')
        .pause(1000)
        .run(() => useInventory.getState().addToInventory('rubbish-code-II'))
        .pause(500)
        .style({ size: 1 })
        .text('Y coincide ')
        .pause(500)
        .text('con el primero ')
        .pause(600)
        .text('que encontré.')
        .next('found-two-2'),
    ),
  )
  .addEntry('found-two-2', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Hay unos números escritos. ')
        .pause(1500)
        .text('Parece un código ')
        .pause(700)
        .text('para algo…')
        .close(),
    ),
  )
  .build()

export default rubbishInspectSomethingDialog
