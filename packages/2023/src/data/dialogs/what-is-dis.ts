import useInventory from '../../hooks/use-inventory'
import { newDialog } from '../../types/dialogs'

export const whatIsDis = newDialog('what-is-dis', null)
  .addEntry('text-1', 'stranger', (builder) =>
    builder.setText((b) =>
      b
        .style({ skipable: false })
        .text('You are here again, DREAMER. ')
        .pause(2500)
        .text('To what do we owe the occasion? ')
        .pause(2500)
        .text('Are you running out of time?')
        .next('text-2'),
    ),
  )
  .addEntry('text-2', 'player', (builder) =>
    builder.setText((b) => b.text('Esto me está dando muy mala espina...').next('text-3')),
  )
  .addEntry('text-3', 'stranger', (builder) =>
    builder.setText((b) =>
      b
        .style({ skipable: false })
        .text('This place has changed a great deal since you were last here. ')
        .pause(3000)
        .text('Will you be able to find your way back, ')
        .pause(2500)
        .text('or will you finally lose yourself?')
        .next('text-4'),
    ),
  )
  .addEntry('text-4', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ skipable: false, family: 'italic' })
        .text('Noto un extraño sentimiento... ')
        .pause(1000)
        .run(() => useInventory.getState().discoverPhoto('special-1'))
        .style({ size: 1.75, family: 'normal', effect: 'crazy' })
        .text('¡AAAAH!')
        .style({ size: 1.25, effect: null })
        .pause(1500)
        .text(' ¡HA DESAPARECIDO!')
        .close(),
    ),
  )
  .build()

export const whatIsThis = newDialog('what-is-this', null)
  .addEntry('text', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('El pibe ha desaparecido, ')
        .pause(1000)
        .text('y este sitio me sigue dando mala espina')
        .pause(500)
        .text('.')
        .pause(500)
        .text('.')
        .pause(500)
        .text('.')
        .next('text2'),
    ),
  )
  .addEntry('text2', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Será mejor que me vaya de aquí')
        .pause(500)
        .text('.')
        .pause(500)
        .text('.')
        .pause(500)
        .text('.')
        .close(),
    ),
  )
  .build()
