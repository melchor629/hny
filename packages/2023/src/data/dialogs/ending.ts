import useInventory from '../../hooks/use-inventory'
import { newDialog } from '../../types/dialogs'

export const endingPhotoGrabbedDialog = newDialog('ending-photo-grabbed', null)
  .addEntry('1', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Yyyyy ')
        .pause(1000)
        .text('con esta ')
        .pause(900)
        .text('ya los tendría todos.')
        .next('2'),
    ),
  )
  .addEntry('2', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Uuuuu... ')
        .pause(1500)
        .text('ala... ')
        .pause(900)
        .text('Éste es distinto al resto...')
        .pause(1000)
        .next('3'),
    ),
  )
  .addEntry('3', 'player', (builder) =>
    builder.setText((b) =>
      b.text('Mejor ').pause(700).text('si ').pause(500).text('dejo todo en la mesa.').close(),
    ),
  )
  .build()

export const cleaningUpTheMessDialog = newDialog('cleaning-up-the-mess', null)
  .addEntry('1', 'player', (builder) =>
    builder.setText((b) =>
      b.text('Debería ').pause(700).text('ordenarla ').pause(400).text('¿verdad?').close(),
    ),
  )
  .build()

export const postCleanedDialog = newDialog('post-cleaned', null)
  .addEntry('1', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Mucho mejor. ')
        .pause(900)
        .text('Ahora parece que no ha pasado nada ')
        .pause(1300)
        .text(';)')
        .next('2'),
    ),
  )
  .addEntry('2', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Espero que no se de cuenta. ')
        .pause(1200)
        .style({ size: 0.8 })
        .text('Espero que no le haya pasado nada a su trabajo…')
        .next('3'),
    ),
  )
  .addEntry('3', 'player', (builder) =>
    builder.setText((b) =>
      b.text('Creo que ').pause(1000).text('estoy más tranquilo ahora…').close(),
    ),
  )
  .build()

export const endingDialog = newDialog('ending', null)
  .addEntry('1', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Tendré que limpiar mi mesa. ')
        .pause(1100)
        .style({ effect: 'wave' })
        .text('jopeeeee')
        .next('2'),
    ),
  )
  .addEntry('2', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('No queda otra ')
        .pause(900)
        .text('.')
        .pause(500)
        .text('.')
        .pause(500)
        .text('. ')
        .pause(1000)
        .style({ effect: 'wave', size: 0.7 })
        .text('aaaaaaaaaaaaaaaaa')
        .pause(250)
        .style({ effect: null, size: 0.9 })
        .text(' no quiero')
        .next('3'),
    ),
  )
  .addEntry('3', 'dev', (builder) =>
    builder.setText((b) =>
      b.text('Amigo ').pause(1000).text('yo que tu limpiaria tu mesa eh...').next('4'),
    ),
  )
  .addEntry('4', 'player', (builder) =>
    builder.setText((b) => b.style({ size: 0.7, effect: 'wave' }).text('yaaaaaaa').close()),
  )
  .build()

export const tHanksDialog = newDialog('thanks', () =>
  useInventory
    .getState()
    .book.filter((p) => p.id.startsWith('special-'))
    .every((p) => p.discovered),
)
  .addEntry('1', 'dev', (builder) =>
    builder.setText((b) => b.text('Ale ').pause(1000).text('¡has completado el juego!').next('2')),
  )
  .addEntry('2', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .text('Puedes ver todas las fotos en el menú. ')
        .pause(1000)
        .text('Incluyendo la última ')
        .pause(800)
        .text(':)')
        .next('3'),
    ),
  )
  .addEntry('3', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .condition(
          (n) => n,
          (bb) =>
            bb
              .text('Usted está basado y ha encontrado todos los easter eggs. ')
              .pause(1400)
              .style({ effect: 'wave' })
              .text('¡Enhorabuena!'),
        )
        .condition(
          (n) => !n,
          (bb) =>
            bb
              .text('Puedes seguir explorando la mazmorra, ')
              .pause(1400)
              .text('puede que haya más cosas por descubrir.'),
        )
        .next('4'),
    ),
  )
  .addEntry('4', 'dev', (builder) =>
    builder.setText((b) =>
      b.style({ size: 2, effect: 'wave' }).text('¡Gracias por jugar!').close(),
    ),
  )
  .build()

export const myTablePostEndingDialog = newDialog('my-table-post-ending', () =>
  Math.trunc(Math.random() * 3),
)
  .addEntry('1', 'player', (builder) =>
    builder.setText((b) =>
      b
        .condition(
          (n) => n === 0,
          (bb) =>
            bb
              .text('Quin merder! ')
              .pause(800)
              .text('Tengo que limparlo antes de que venga nadie...'),
        )
        .condition(
          (n) => n === 1,
          (bb) =>
            bb
              .text('No se como me puede haber salido tan mal el hechizo... ')
              .pause(1600)
              .text('¡Mi mesa está hecho un desastre!'),
        )
        .condition(
          (n) => n === 2,
          (bb) =>
            bb
              .text('Menudo día... ')
              .pause(900)
              .text('Nada sale bien hoy...')
              .pause(1000)
              .text('Y aún tengo que limpiar la mesa...'),
        )
        .close(),
    ),
  )
  .build()

export const herTablePostEndingDialog = newDialog('her-table', () => Math.trunc(Math.random() * 10))
  .addEntry('1', 'player', (builder) =>
    builder.setText((b) =>
      b
        .condition(
          (n) => n % 2 === 0,
          (bb) => bb.text('Ya está todo en su sitio.').next('2'),
        )
        .condition(
          (n) => n < 8,
          (bb) => bb.text('Todo está como antes. ').pause(1000).text('Y menos mal buf…'),
        )
        .condition(
          (n) => n === 9,
          (bb) =>
            bb
              .text('Espero que no se de cuenta ')
              .pause(1000)
              .style({ effect: 'crazy' })
              .text('ella')
              .pause(900)
              .text('... ')
              .style({ effect: 'crazy', size: 0.75 })
              .text('*internal screaming*'),
        )
        .close(),
    ),
  )
  .addEntry('2', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Como si no hubiera pasado nada. ')
        .pause(2000)
        .style({ size: 0.7, effect: 'crazy' })
        .text('espero ')
        .pause(1200)
        .style({ size: 0.6 })
        .text('creo ')
        .pause(800)
        .style({ size: 0.5 })
        .text('ojalá')
        .next('3'),
    ),
  )
  .addEntry('3', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('No pasa nada. ')
        .pause(1200)
        .text('Nadie se tiene que enterar. ')
        .pause(1000)
        .text('Estamos bien. ')
        .pause(1200)
        .style({ size: 0.8, effect: 'crazy' })
        .text('¿no?')
        .close(),
    ),
  )
  .build()
