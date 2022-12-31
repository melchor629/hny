import useAcademiaRoomState from '../../hooks/use-academia-room-state'
import useDungeonState from '../../hooks/use-dungeon-state'
import useInventory from '../../hooks/use-inventory'
import useScenario from '../../hooks/use-scenario'
import { newDialog } from '../../types/dialogs'

export const introDialog = newDialog('intro', null)
  .addEntry('1', 'player', (builder) =>
    builder.setText((b) => b.style({ size: 2, effect: 'crazy' }).text('¡MIERDA!').next('2')),
  )
  .addEntry('2', 'player', (builder) =>
    builder.setText((b) =>
      b.style({ size: 1.25 }).text('LA HE LIADO ').pause(800).text('CON ESTE HECHIZO.').next('3'),
    ),
  )
  .addEntry('3', 'player', (builder) =>
    builder.setText((b) =>
      b.text('Menuda explosión. ').pause(700).text('La mesa ha quedado bastante mal...').next('4'),
    ),
  )
  .addEntry('4', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Espero que nadie se entere. ')
        .pause(1100)
        .text('A ver como limpio yo esto ahora...')
        .close(),
    ),
  )
  .build()

export const nextTableMessDialog = newDialog('next-table-mess', null)
  .addEntry('1', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 0.7 })
        .text('no')
        .pause(250)
        .style({ size: 0.9 })
        .text(' no')
        .pause(250)
        .style({ size: 1.2 })
        .text(' no')
        .pause(250)
        .style({ size: 1.5 })
        .text(' no')
        .pause(550)
        .style({ size: 2 })
        .text(' ¡NO!')
        .next('2'),
    ),
  )
  .addEntry('2', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Ha afectado a la mesa de al lado. ')
        .pause(1200)
        .text('Ahora si que estoy en un tremendo lío.')
        .next('3'),
    ),
  )
  .addEntry('3', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Espero que esto ')
        .pause(700)
        .text('no llegue a oídos ')
        .pause(750)
        .text('del hechicero supremo')
        .pause(800)
        .text('...')
        .next('4'),
    ),
  )
  .addEntry('4', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 1.5 })
        .text('ÉL ')
        .style({ size: 1 })
        .pause(240)
        .text('siempre se entera de todo...')
        .next('5'),
    ),
  )
  .addEntry('5', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Y... ')
        .pause(1000)
        .text('Interferir en un trabajo de un compañero... ')
        .pause(1400)
        .text('Se castiga severamente... ')
        .close(),
    ),
  )
  .build()

export const startAdventureDialog = newDialog('start-adventure', null)
  .addEntry('1', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Luego limpiaré mi mesa. ')
        .pause(1000)
        .text('Lo más importante es ')
        .pause(900)
        .text('¡recuperar lo que se ha perdido!')
        .next('2'),
    ),
  )
  .addEntry('2', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 0.8 })
        .text('o más bien, ')
        .pause(800)
        .text('lo que catastróficamente he desperdigado')
        .next('3'),
    ),
  )
  .addEntry('3', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Pero, ')
        .pause(600)
        .text('¿a dónde se habrán ido las "instantáneas"? ')
        .pause(1200)
        .style({ size: 0.75 })
        .text('(las llamaba "fotografías" ¿no?)')
        .close(),
    ),
  )
  .build()

export const dungeonTimeDialog = newDialog('dungeon-time', null)
  .addEntry('1', 'player', (builder) =>
    builder.setText((b) =>
      b.text('No ').pause(1000).text('me ').pause(1000).text('fastidies').next('2'),
    ),
  )
  .addEntry('2', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Se han ido por la mazmorra. ')
        .pause(1100)
        .text('Ese sitio, lo tenemos prohibido...')
        .next('3'),
    ),
  )
  .addEntry('3', 'player', (builder) =>
    builder.setText((b) => b.text('No queda otra, ').pause(1000).text('¡hay que bajar!').next('4')),
  )
  .addEntry('4', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ effect: 'wave' })
        .text('joeeeeee ')
        .pause(800)
        .style({ effect: null })
        .text('menudo lío he montado')
        .next('5'),
    ),
  )
  .addEntry('5', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Me tengo que apresurar, ')
        .pause(1100)
        .text('antes de que venga a buscar su trabajo.')
        .close(),
    ),
  )
  .build()

export const tutorialDialog = newDialog('tutorial', false)
  .addEntry('1', 'dev', (builder) =>
    builder.setText((b) =>
      b.text('Uep! ').pause(600).text('Soy el ente omnipresente de esta historia.').next('2'),
    ),
  )
  .addEntry('2', 'dev', (builder) =>
    builder.setText((b) => b.text('¡Espero que disfrutes del juego!').next('3')),
  )
  .addEntry('3', 'dev', (builder) =>
    builder.setText((b) =>
      b.text('El juego tiene autoguardado. No te preocupes si tienes que dejarlo.').next('4'),
    ),
  )
  .addEntry('4', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .text(
          'Aunque, el navegador puede borrarte la partida porque sí (pasado unas semanas o un mes).',
        )
        .next('5'),
    ),
  )
  .addEntry('5', 'dev', (builder) =>
    builder.setText((b) =>
      b.text('La estantería con libros de arriba hace muchas cosas.').next('6'),
    ),
  )
  .addEntry('6', 'dev', (builder) =>
    builder.setText((b) => b.text('Aunque recomiendo que juegues sin usar trucos :)').next('7')),
  )
  .addEntry('7', 'dev', (builder) =>
    builder
      .setText((b) => b.text('¿Quieres que te abra el menú de controles?'))
      .setChoices((b) => b.addNext('yes', 'Sí', 'yes').addNext('no', 'No', 'no')),
  )
  .addEntry('yes', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .state(() => true)
        .text('¡Perfecto! Ahora te lo abro.')
        .close(),
    ),
  )
  .addEntry('no', 'dev', (builder) =>
    builder.setText((b) => b.text('En ese caso, ¡puedes empezar el juego!').close()),
  )
  .build()

export const myTableDialog = newDialog('my-table', null)
  .addEntry('1', 'player', (builder) =>
    builder.setText((b) =>
      b.text('Menudo estropicio. ').pause(800).text('Luego lo limpio...').close(),
    ),
  )
  .build()

export const herTableDialog = newDialog('her-table', null)
  .addEntry('1', 'player', (builder) => builder.setText((b) => b.text(':|').next('2')))
  .addEntry('2', 'player', (builder) =>
    builder.setText((b) => b.text('Espero no haberle fastidiado la investigación...').next('3')),
  )
  .addEntry('3', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Sé que le ha puesto mucho empeño, ')
        .pause(1200)
        .text('y si me la he cargado, ')
        .pause(1000)
        .text('no me lo podría perdonar... ')
        .pause(1200)
        .style({ effect: 'crazy' })
        .text('nunca')
        .style({ effect: null })
        .text('...')
        .close(),
    ),
  )
  .build()

export const fuckTheGameDialog = newDialog('fuck-the-game', null)
  .addEntry('1', 'dev', (builder) =>
    builder
      .setText((b) => b.text('¿Qué quieres hacer?'))
      .setChoices((b) =>
        b
          .addClose('nothing', 'Nada')
          .addNext('menu', 'Abre el menú', 'menu')
          .addNext('complete', 'Completar juego', 'complete')
          .addNext('reset', 'Borrar guardado', 'reset')
          .addNext('code', 'Show me the code!', 'code'),
      ),
  )
  .addEntry('complete', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .text('¡Dicho y hecho!')
        .pause(250)
        .run(() => {
          useAcademiaRoomState.getState().endingDone()
          useInventory.getState().complete()
        })
        .pause(250)
        .text(' No te olvides de mirar todas las fotos :)')
        .close(),
    ),
  )
  .addEntry('reset', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .text('¡A sus órdenes!')
        .run(() => {
          useInventory.getState().reset()
          useDungeonState.getState().reset()
          useAcademiaRoomState.getState().reset()
          useScenario.getState().change('academia-room')
        })
        .close(),
    ),
  )
  .addEntry('code', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .text('Abriendo código...')
        .run(() => {
          window.open('https://github.com/melchor629/hny/tree/master/packages/2023')
        })
        .close(),
    ),
  )
  .addEntry('menu', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .text('No puedo. ')
        .pause(1000)
        .text('Hazlo tu mismo pulsando X/M (teclado), X/Y (mando xbox) o B (boton táctil).')
        .close(),
    ),
  )
  .build()
