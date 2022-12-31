import useDungeonState from '../../hooks/use-dungeon-state'
import { newDialog } from '../../types/dialogs'

const napGuysDialog = newDialog('new-guys', null)
  .addEntry('sleeping', 'player', (builder) =>
    builder.setText((b) =>
      b.text('Ay ').pause(900).text('están echándose una siesta.').next('cant-go-back'),
    ),
  )
  .addEntry('cant-go-back', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Pero, ')
        .pause(600)
        .text('por algún motivo, ')
        .pause(1000)
        .text('se ha cerrado el pasillo')
        .pause(900)
        .text('...')
        .next('should-i-awake-them'),
    ),
  )
  .addEntry('should-i-awake-them', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('No me queda otra. ')
        .pause(1000)
        .text('Tendré que despertarlos. ')
        .pause(1100)
        .style({ size: 0.7, family: 'italic' })
        .text('(lo siento mucho tios)')
        .next('time-to-wake-up'),
    ),
  )
  .addEntry('time-to-wake-up', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('em')
        .pause(930)
        .style({ size: 1.25, effect: 'crazy' })
        .text(' ¡TIOS! ')
        .pause(1200)
        .style({ size: 1.5 })
        .text('¡EY TIOS!')
        .next('still-sleeping'),
    ),
  )
  .addEntry('still-sleeping', 'napGuy1', (builder) =>
    builder.setText((b) =>
      b.pause(1000).text('z').pause(1000).text('z').pause(1000).text('z').next('wake-up!'),
    ),
  )
  .addEntry('wake-up!', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 1.75, effect: 'crazy' })
        .text('¡DESPERTAD! ')
        .pause(1100)
        .style({ size: 1.25, effect: null })
        .text('NECESITO PASAR')
        .next('wake-up'),
    ),
  )
  .addEntry('wake-up', 'napGuy1', (builder) =>
    builder.setText((b) =>
      b
        .style({ skipable: false, effect: 'wave' })
        .text('aaaa ')
        .run(() => useDungeonState.getState().changeNapGuyState('wakingUp', 1))
        .pause(2000)
        .style({ effect: null })
        .text('cushame ')
        .pause(930)
        .text('¿a que vienen eso chillios?')
        .run(() => useDungeonState.getState().changeNapGuyState('rest', 1))
        .next('wake-up-2'),
    ),
  )
  .addEntry('wake-up-2', 'napGuy2', (builder) =>
    builder.setText((b) =>
      b
        .style({ skipable: false, effect: 'wave' })
        .text('¿eh? ')
        .run(() => useDungeonState.getState().changeNapGuyState('wakingUp', 2))
        .pause(2000)
        .style({ effect: null })
        .text('¿que pasa pepe? ')
        .pause(1000)
        .text('¿y este chiquillo?')
        .run(() => useDungeonState.getState().changeNapGuyState('rest', 2))
        .next('holi'),
    ),
  )
  .addEntry('holi', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Hola ')
        .pause(1100)
        .text('perdonad que os haya despertado ')
        .pause(1200)
        .text('pero estábais bloqueando el paso ')
        .pause(1100)
        .text('y no podía pasar.')
        .next('understandable'),
    ),
  )
  .addEntry('understandable', 'napGuy2', (builder) =>
    builder.setText((b) =>
      b
        .text('otia ')
        .pause(1000)
        .text('illo ')
        .pause(1000)
        .text('tiene rason. ')
        .pause(1200)
        .text('perdona ya te dehamo pasa.')
        .next('thanks'),
    ),
  )
  .addEntry('thanks', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('De nuevo, ')
        .pause(900)
        .text('perdonadme, ')
        .pause(1200)
        .text('y muchas gracias.')
        .next('no-problemo'),
    ),
  )
  .addEntry('no-problemo', 'napGuy1', (builder) =>
    builder.setText((b) =>
      b
        .text('nite ')
        .pause(1000)
        .text('adema, ')
        .pause(600)
        .text('se no ha hecho tarde. ')
        .next('truita'),
    ),
  )
  .addEntry('truita', 'napGuy2', (builder) =>
    builder.setText((b) =>
      b
        .text('illo si ')
        .pause(1000)
        .text('que estara la cena lista ')
        .pause(900)
        .text('una buena tortilla papas.')
        .next('pacasa'),
    ),
  )
  .addEntry('pacasa', 'napGuy1', (builder) =>
    builder.setText((b) =>
      b
        .text('ea ')
        .pause(900)
        .text('amono pacasa ')
        .pause(1000)
        .style({ skipable: true })
        .text('hasta otra')
        .run(() => useDungeonState.getState().changeNapGuyState('goAway', 1))
        .pause(1500)
        .next('pacasa-2'),
    ),
  )
  .addEntry('pacasa-2', 'napGuy2', (builder) =>
    builder.setText((b) =>
      b
        .text('e verda ')
        .pause(900)
        .text('nosbemo ')
        .pause(1000)
        .style({ skipable: true })
        .run(() => useDungeonState.getState().changeNapGuyState('goAway', 2))
        .pause(1500)
        .next('wtf'),
    ),
  )
  .addEntry('wtf', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('¿Acaban ')
        .pause(900)
        .text('de ')
        .pause(400)
        .text('desaparecer ')
        .pause(600)
        .text('sin más?')
        .next('ok'),
    ),
  )
  .addEntry('ok', 'player', (builder) =>
    builder.setText((b) => b.text('Bueno, ').pause(900).text('ahora puedo continuar.').close()),
  )
  .build()

export default napGuysDialog
