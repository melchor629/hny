import useDungeonState from '../../hooks/use-dungeon-state'
import useInventory from '../../hooks/use-inventory'
import { newDialog } from '../../types/dialogs'

export const firstMarinaDialog = newDialog('marina:first', null)
  .addEntry('wtfay', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 1.5, skipable: false, effect: 'crazy' })
        .text('EH ')
        .pause(500)
        .run(() => useDungeonState.getState().changeMarinaState('pointingAtYou'))
        .text('¡TU!')
        .pause(1500)
        .style({ size: 1.125, skipable: true, effect: null })
        .text(' Quieto parao')
        .close(),
    ),
  )
  .build()

export const firstMarisaDialog = newDialog('marisa:first', null)
  .addEntry('wh', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('¿Que pasa Marina? ')
        .pause(1500)
        .text('¡Oh! ')
        .pause(1500)
        .text('¿Qué haces aquí chico?')
        .close(),
    ),
  )
  .build()

export const secondMarinaDialog = newDialog('marina:second', null)
  .addEntry('f', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('¿Que haces aquí abajo? ')
        .pause(1500)
        .text('La gente como tu nunca baja aquí. ')
        .next('s'),
    ),
  )
  .addEntry('s', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('¿Qué tal si ')
        .pause(750)
        .style({ size: 1.25 })
        .text(' te ')
        .pause(750)
        .style({ size: 1.5 })
        .text(' usamos ')
        .pause(750)
        .style({ size: 1.75 })
        .text(' para ')
        .pause(750)
        .style({ size: 2 })
        .text(' nosotras?')
        .close(),
    ),
  )
  .build()

export const secondMarisaDialog = newDialog('marisa:second', null)
  .addEntry('f', 'marisa', (builder) =>
    builder.setText((b) =>
      b.text('Mmmm').pause(500).text('.').pause(500).text('.').pause(500).text('.').next('s'),
    ),
  )
  .addEntry('s', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Podría sernos de utilidad ')
        .pause(1000)
        .text('en uno de nuestros experimentos')
        .pause(1250)
        .text(' :)')
        .close(),
    ),
  )
  .build()

export const thirdMarinaDialog = newDialog('marina:third', null)
  .addEntry('f', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('Justamente estoy ahora con uno')
        .pause(1250)
        .text(' que me vendría bien ')
        .pause(1000)
        .text('algo de carne como la tuya.')
        .pause(500)
        .style({ size: 1.25, effect: 'wave' })
        .text(' fufufufufu~')
        .next('s'),
    ),
  )
  .addEntry('s', 'marina', (builder) =>
    builder.setText((b) =>
      b.text('Marisa, ').pause(1000).style({ size: 1.5 }).text('¡ATRAPÉMOSLO!').next('end'),
    ),
  )
  .addEntry('end', 'dev', (builder) =>
    builder.setText((b) => b.text('Te voy a ahorrar los detalles...').close()),
  )
  .build()

export const marinaMarisaDialog = newDialog('marina:marisa', () => ({
  preguntiña: 0 as 0 | 1 | 2 | 3,
}))
  .addEntry('first', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('Bueno, bueno, ')
        .pause(1000)
        .text('y ahora ')
        .pause(750)
        .text('¿qué hacemos contigo?')
        .next('second'),
    ),
  )
  .addEntry('second', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('Marisa, vigilalo, ')
        .pause(1000)
        .text('voy a la mesa de abajo ')
        .pause(1250)
        .text('a por las herramientas.')
        .next('third'),
    ),
  )
  .addEntry('third', 'marisa', (builder) =>
    builder.setText((b) => b.text('¡Sin problema!').next('fourth')),
  )
  .addEntry('fourth', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Marina, ')
        .pause(1000)
        .text('un momento')
        .pause(750)
        .text('.')
        .pause(750)
        .text('.')
        .pause(750)
        .text('.')
        .pause(1000)
        .text(' El chico no ha dicho nada.')
        .next('fifth'),
    ),
  )
  .addEntry('fifth', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('¿Qué más da? ')
        .pause(1000)
        .text('Ahora es nuestro, ')
        .pause(1250)
        .text('nadie se va a enterar.')
        .next('sixth'),
    ),
  )
  .addEntry('sixth', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Quiero saber ')
        .pause(1000)
        .text('qué hace aquí. ')
        .pause(1250)
        .style({ size: 0.5 })
        .text(' 👉👈')
        .next('seventh'),
    ),
  )
  .addEntry('seventh', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('.')
        .pause(1000)
        .text('.')
        .pause(1000)
        .text('.')
        .pause(1250)
        .style({ size: 1.5 })
        .text('VA')
        .pause(100)
        .style({ size: 1.4 })
        .text('A')
        .pause(100)
        .style({ size: 1.3 })
        .text('A')
        .pause(100)
        .style({ size: 1.2 })
        .text('A')
        .pause(100)
        .style({ size: 1.1 })
        .text('A')
        .pause(100)
        .style({ size: 1 })
        .text('A')
        .pause(100)
        .style({ size: 0.9 })
        .text('A')
        .pause(100)
        .style({ size: 0.8 })
        .text('A')
        .pause(100)
        .style({ size: 0.7 })
        .text('A')
        .pause(100)
        .style({ size: 0.6 })
        .text('A')
        .pause(100)
        .style({ size: 0.5 })
        .text('A')
        .pause(100)
        .text('LE')
        .pause(200)
        .text('...')
        .next('eighth'),
    ),
  )
  .addEntry('eighth', 'marisa', (builder) =>
    builder
      .setText((b) => b.text('Oye muchacho ').pause(1000).text('¿qué haces aquí?'))
      .setChoices((b) =>
        b
          .addNext('1', 'La he liado...', 'ninth:1')
          .addNext('2', 'Paseando por aquí...', 'ninth:2')
          .addNext('3', 'Me han desterrado...', 'ninth:3'),
      ),
  )
  .addEntry('ninth:1', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('La he liado ')
        .pause(1000)
        .text('con un hechizo ')
        .pause(1000)
        .text('y estoy intentando arreglar el estropicio.')
        .next('tenth'),
    ),
  )
  .addEntry('ninth:2', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Me apetecía pasear ')
        .pause(1000)
        .text('por la mazmorra ')
        .pause(1000)
        .text('de chilling.')
        .next('ninth:2:'),
    ),
  )
  .addEntry('ninth:2:', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('Si, ')
        .pause(500)
        .text('claro, ')
        .pause(500)
        .text('y yo soy la hechicera suprema.')
        .next('ninth:1'),
    ),
  )
  .addEntry('ninth:3', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Me han desterrado ')
        .pause(1000)
        .text('a la mazmorra ')
        .pause(1000)
        .text('de por vida.')
        .next('ninth:3:'),
    ),
  )
  .addEntry('ninth:3:', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Chico ')
        .pause(1250)
        .text('no deberías bromear ')
        .pause(1000)
        .text('con esas cosas...')
        .next('ninth:3::'),
    ),
  )
  .addEntry('ninth:3::', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 1.5, effect: 'crazy' })
        .text('¡NO ')
        .pause(750)
        .text('SABES ')
        .pause(750)
        .text('LO ')
        .pause(750)
        .text('QUE ')
        .pause(750)
        .text('DICES')
        .pause(750)
        .text('!')
        .next('ninth:3:::'),
    ),
  )
  .addEntry('ninth:3:::', 'player', (builder) =>
    builder.setText((b) => b.style({ size: 0.5 }).text('perdón').pause(1000).next('ninth:1')),
  )
  .addEntry('tenth', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Y, ')
        .pause(750)
        .text('¿eso no tendrá ')
        .pause(1000)
        .text('nada que ver ')
        .pause(1000)
        .text('con esto? ')
        .style({ size: 0.5 })
        .text('*muestra una foto*')
        .next('eleventh'),
    ),
  )
  .addEntry('eleventh', 'player', (builder) =>
    builder.setText((b) =>
      b.text('Sí, ').pause(750).text('eso es lo que estoy buscando.').next('12'),
    ),
  )
  // no se contar más
  .addEntry('12', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Tu pequeño hechizo ')
        .pause(1000)
        .text('habrá hecho enfadar mucho ')
        .pause(1500)
        .text('al hechicero supremo, ')
        .pause(1500)
        .text('¿no?')
        .next('13'),
    ),
  )
  .addEntry('13', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Es que')
        .pause(750)
        .text('.')
        .pause(750)
        .text('.')
        .pause(750)
        .text('. ')
        .pause(1000)
        .style({ size: 0.75 })
        .text('👉👈')
        .pause(1000)
        .style({ size: 0.65 })
        .text('nolosabeaún')
        .next('14'),
    ),
  )
  .addEntry('14', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 1.5, effect: 'crazy' })
        .text('¿¡COMO!? ')
        .pause(1000)
        .style({ size: 1.25, effect: null })
        .text('¿Que aún no lo sabe? ')
        .pause(1000)
        .style({ size: 1 })
        .text('Ya verás cuando se entere...')
        .next('15'),
    ),
  )
  .addEntry('15', 'marisa', (builder) =>
    builder.setText((b) =>
      b.text('Chico, ').pause(1000).text('estás en un buen lío... ').next('16'),
    ),
  )
  .addEntry('16', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('Tienes un buen par ')
        .pause(1000)
        .text('bajando aquí ')
        .pause(1000)
        .text('sin ayuda. ')
        .pause(1000)
        .text('Y estás de suerte ')
        .pause(1000)
        .text('que ella me ha parado. ')
        .pause(1250)
        .style({ size: 0.5 })
        .text('que si no... ')
        .next('17'),
    ),
  )
  .addEntry('17', 'marisa', (builder) =>
    builder.setText((b) =>
      b.text('No lo has pensado mucho, ').pause(1250).text('¿verdad? ').next('18'),
    ),
  )
  .addEntry('18', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('No quiero que se enfade ')
        .style({ size: 1.5 })
        .text('ÉL')
        .style({ size: 1 })
        .text(', prefiero adentrarme aquí ')
        .pause(1250)
        .text('que sufrir su ira.')
        .next('19'),
    ),
  )
  .addEntry('19', 'marina', (builder) =>
    builder.setText((b) =>
      b.text('Suerte con eso ').pause(1000).text('se acabará enterando.').next('20'),
    ),
  )
  .addEntry('20', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Lo que me sorprende ')
        .pause(1250)
        .text('es ')
        .pause(750)
        .text('que ')
        .pause(750)
        .text('no se haya enterado aún. ')
        .pause(1500)
        .text('Deberíamos ayudarle, Marina.')
        .next('21'),
    ),
  )
  .addEntry('21', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('¡Claro! ')
        .pause(1000)
        .style({ size: 0.75 })
        .text('espera ')
        .pause(500)
        .style({ size: 2, effect: 'crazy' })
        .text('¡¡¡QUE!!! ')
        .pause(1500)
        .style({ size: 0.9, effect: null })
        .text('Estás loca Marisa.')
        .next('22'),
    ),
  )
  .addEntry('22', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Es posible, ')
        .pause(1250)
        .text('pero no quiero ')
        .pause(750)
        .text('que el chico ')
        .pause(750)
        .text('acabe como nosotras.')
        .next('23'),
    ),
  )
  .addEntry('23', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('Claro ')
        .pause(250)
        .text('claro ')
        .pause(500)
        .text('si venga ')
        .pause(1000)
        .text('¡Lo que faltaba! ')
        .pause(1500)
        .text('A nosotras que nos jodan ')
        .pause(1000)
        .text('pero a este lo ayudamos...')
        .next('24'),
    ),
  )
  .addEntry('24', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Tranquilizate, ')
        .pause(1000)
        .text('nos podría ayudar. ')
        .pause(1000)
        .style({ size: 0.65 })
        .text('Pero si no colabora, ')
        .pause(750)
        .style({ effect: 'wave' })
        .text('fufufufufu')
        .next('25'),
    ),
  )
  .addEntry('25', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 0.65, effect: 'wave' })
        .text('Me gusta como piensas ')
        .pause(1000)
        .style({ size: 1.5, effect: null })
        .text('DECIDIDO ')
        .pause(500)
        .style({ size: 1 })
        .text('Lleguemos a un trato, ')
        .pause(1000)
        .text('chico. ')
        .next('26'),
    ),
  )
  .addEntry('26', 'player', (builder) =>
    builder
      .setText((b) =>
        b
          .condition(
            (state) => state.preguntiña === 0,
            (bb) => bb.text('Me parece bien.'),
          )
          .condition(
            (state) => state.preguntiña === 1,
            (bb) => bb.text('Buf, lo intentaré.'),
          )
          .condition(
            (state) => state.preguntiña === 2,
            (bb) => bb.text('De locos.'),
          ),
      )
      .setChoices((b) =>
        b.addNext('1', '¿Que debo hacer?', '27:1:1').addNext('2', '¿Que me dáis?', '27:2:1'),
      ),
  )
  .addEntry('27:1:1', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .state((state) => ({ ...state, preguntiña: (state.preguntiña | 1) as 1 | 3 }))
        .text('Deberás hablar con el hechicero supremo sobre nosotras. ')
        .next('27:1:2'),
    ),
  )
  .addEntry('27:1:2', 'marina', (builder) =>
    builder.setText((b) => b.text('De lo majas que somos, sobre todo.').next('27:1:3')),
  )
  .addEntry('27:1:3', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Solo dile que hemos meditado sobre lo que pasó, ')
        .pause(2000)
        .text('y no volverá a ocurrir.')
        .condition(
          (state) => !!(state.preguntiña & 2),
          (bb) => bb.next('28'),
        )
        .condition(
          (state) => !(state.preguntiña & 2),
          (bb) => bb.next('26'),
        )
        .close(),
    ),
  )
  .addEntry('27:2:1', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .state((state) => ({ ...state, preguntiña: (state.preguntiña | 2) as 2 | 3 }))
        .text('El trozo de papel mágico que te ha enseñado Marisa.')
        .condition(
          (state) => !!(state.preguntiña & 1),
          (bb) => bb.next('28'),
        )
        .condition(
          (state) => !(state.preguntiña & 1),
          (bb) => bb.next('26'),
        )
        .close(),
    ),
  )
  .addEntry('28', 'marisa', (builder) => builder.setText((b) => b.text('¿Todo claro?').next('29')))
  .addEntry('29', 'player', (builder) => builder.setText((b) => b.text('¡Clarinete!').next('30')))
  .addEntry('30', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('No te olvides de hablar con ')
        .style({ size: 2 })
        .text('ÉL')
        .style({ size: 1 })
        .text('.')
        .next('31'),
    ),
  )
  .addEntry('31', 'player', (builder) =>
    builder.setText((b) => b.text('¡Lo prometo! No se me olvidará.').next('32')),
  )
  .addEntry('32', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Toma el papel. ')
        .run(() => useInventory.getState().discoverPhoto('photo-10'))
        .next('33'),
    ),
  )
  .addEntry('33', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 0.8 })
        .text(
          'Y otra cosa, tienes otro papel mágico por arriba a la izquierda, y dos trozos de papel. ',
        )
        .pause(2000)
        .text('Arriba a la derecha, tienes otros tres papeles mágicos y un trozo de papel.')
        .next('34'),
    ),
  )
  .addEntry('34', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('¡No te pierdas entre los portales! ')
        .pause(1600)
        .style({ size: 0.8 })
        .text('Y no te olvides de hablar con el encarcelado.')
        .next('35'),
    ),
  )
  .addEntry('35', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 2 })
        .text('¡¡MARISA!!')
        .pause(1000)
        .style({ size: 1 })
        .text(' Noo...')
        .next('36'),
    ),
  )
  .addEntry('36', 'marisa', (builder) => builder.setText((b) => b.text(':P').next('37')))
  .addEntry('37', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Muchisimas gracias chicas. ')
        .pause(1000)
        .style({ effect: 'wave' })
        .text('¡Sois geniales! ')
        .pause(500)
        .style({ size: 0.5, effect: null })
        .text('obviandolaparte en la que me queriáis matar')
        .next('38'),
    ),
  )
  .addEntry('38', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('De nada chico. ')
        .pause(1000)
        .style({ size: 0.8 })
        .text('Mucha suerte')
        .pause(1000)
        .text('.')
        .next('39'),
    ),
  )
  .addEntry('39', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 0.5 })
        .text('kawaii~ ')
        .pause(1000)
        .style({ size: 1.2, effect: 'wave' })
        .text('  matane~!')
        .close(),
    ),
  )
  .build()

export const marinaDialog = newDialog('marina', () => Math.trunc(Math.random() * 4))
  .addEntry('first', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .condition(
          (n) => n === 0,
          (bb) =>
            bb
              .run(() => useDungeonState.getState().changeMarinaState('lookingAtYou'))
              .text('Hola ')
              .pause(1000)
              .text('¿Todavía por aquí?')
              .next('menu'),
        )
        .condition(
          (n) => n === 1,
          (bb) =>
            bb
              .style({ size: 0.6, family: 'italic' })
              .text('*enormemente concentrada*')
              .pause(2000)
              .run(() => useDungeonState.getState().changeMarinaState('lookingAtYou'))
              .pause(500)
              .style({ size: 1, family: 'normal' })
              .text('¡Ostras!')
              .next('menu'),
        )
        .condition(
          (n) => n === 2,
          (bb) =>
            bb
              .style({ size: 0.6 })
              .text('¡Mierda! ')
              .pause(1000)
              .style({ size: 1 })
              .run(() => useDungeonState.getState().changeMarinaState('lookingAtYou'))
              .text('mmmm ')
              .pause(1000)
              .text('¿Cómo tu por aquí?')
              .next('menu'),
        )
        .close(),
    ),
  )
  .addEntry('menu', 'marina', (builder) =>
    builder
      .setText((b) => b.text('¿Que pasa?'))
      .setChoices((b) =>
        b
          .addClose('no', 'Nada, nada')
          .addNext('q1', '¿No os aburrís?', 'q1:1')
          .addNext('q2', '¿Os lleváis bien?', 'q2:1')
          .addNext('q3', '*agradecer*', 'q3:1'),
      ),
  )
  .addEntry('q1:1', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('¡Para nada! ')
        .pause(1000)
        .text('Nostoras seguimos investigando ')
        .pause(1000)
        .text('y aprendiendo. ')
        .pause(750)
        .style({ size: 0.75 })
        .text('aunque sea a espaldas del hechicero supremo...')
        .next('q1:2'),
    ),
  )
  .addEntry('q1:2', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('La mazmorra nos da todo lo que necesitamos. ')
        .pause(1500)
        .text('Aunque no es fácil sobrevivir aquí... ')
        .pause(2000)
        .text('Nos hemos adaptado bien.')
        .pause(1000)
        .text('Y nos tenemos la una a la otra.')
        .next('menu'),
    ),
  )
  .addEntry('q2:1', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 1.5 })
        .text('¡DARÍA MI VIDA ')
        .pause(700)
        .text('POR ELLA! ')
        .pause(1250)
        .style({ size: 1 })
        .text('Pero, ')
        .pause(1000)
        .text('¿qué haces preguntándome estas cosas?')
        .next('q2:2'),
    ),
  )
  .addEntry('q2:2', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('Bueno mira')
        .pause(1000)
        .text('... ')
        .pause(1000)
        .text('Si te soy sincera, ')
        .pause(1000)
        .text('no sé que haría ')
        .pause(1000)
        .text('sin ella')
        .pause(600)
        .text('...')
        .next('q2:3'),
    ),
  )
  .addEntry('q2:3', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('Me anima a seguir ')
        .pause(1000)
        .text('aunque todo parezca imposible... ')
        .next('q2:4'),
    ),
  )
  .addEntry('q2:4', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('Espero poder salir juntas ')
        .pause(1000)
        .text('de aquí ')
        .pause(750)
        .text('algún día')
        .pause(600)
        .text('...')
        .next('menu'),
    ),
  )
  .addEntry('q3:1', 'player', (builder) =>
    builder.setText((b) =>
      b.text('Os agradezco mucho la ayuda, ').pause(1250).text('¡de verdad!').next('q3:2'),
    ),
  )
  .addEntry('q3:2', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('No solo haré lo promeido, ')
        .pause(1250)
        .text(' sino que también me pasaré a visitaros. ')
        .pause(1500)
        .style({ size: 1.25 })
        .text('¡Estéis donde estéis!')
        .next('q3:3'),
    ),
  )
  .addEntry('q3:3', 'marina', (builder) =>
    builder.setText((b) =>
      b
        .text('Que gran gesto por tu parte... ')
        .style({ size: 0.5, family: 'italic' })
        .text('*tono irónico*')
        .pause(1500)
        .style({ size: 1, family: 'normal' })
        .text(' Aunque, ')
        .pause(1000)
        .text('agradezco el detalle')
        .pause(500)
        .text('.')
        .next('q3:4'),
    ),
  )
  .addEntry('q3:4', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .text('Realmente, ')
        .pause(750)
        .text('le has llegado al corazón ')
        .pause(1000)
        .text('con lo que le has dicho.')
        .next('menu'),
    ),
  )
  .build()

export const marisaDialog = newDialog('marisa', () => Math.trunc(Math.random() * 3))
  .addEntry('first', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .condition(
          (n) => n === 0,
          (bb) =>
            bb
              .run(() => useDungeonState.getState().changeMarisaState('lookingAtYou'))
              .text('¡Hola chico! ')
              .pause(1000)
              .text('¿Que pasa?')
              .next('menu'),
        )
        .condition(
          (n) => n === 1,
          (bb) =>
            bb
              .style({ size: 0.6, family: 'italic' })
              .text('*sufriendo visiblemente*')
              .pause(1000)
              .run(() => useDungeonState.getState().changeMarisaState('lookingAtYou'))
              .pause(500)
              .style({ size: 1, family: 'normal', effect: 'wave' })
              .text(' konnichiwa~!')
              .next('menu'),
        )
        .condition(
          (n) => n === 2,
          (bb) =>
            bb
              .style({ size: 0.6 })
              .text('Jope...')
              .pause(1000)
              .style({ size: 1, effect: 'wave' })
              .run(() => useDungeonState.getState().changeMarisaState('lookingAtYou'))
              .text(' holi :3')
              .next('menu'),
        )
        .close(),
    ),
  )
  .addEntry('menu', 'marisa', (builder) =>
    builder
      .setText((b) => b.text('¿En qué te puedo ayudar?'))
      .setChoices((b) =>
        b
          .addClose('no', 'Nada, nada')
          .addNext('q1', '¿Qué os pasó?', 'q1:1')
          .addNext('q2', '¿Qué hacéis aquí?', 'q2:1')
          .addNext('q3', '¿Tenéis esperanza?', 'q3:1')
          .addNext('q4', '¿Es ella siempre así?', 'q4:1')
          .addNext('q5', '¿Os lleváis bien?', 'q5:1')
          .addNext('q6', '*agradecer*', 'q6:1'),
      ),
  )
  .addEntry('q1:1', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Mmm a ver... ')
        .pause(1000)
        .text('No respondas si no quieres, ')
        .pause(1250)
        .text('pero ')
        .pause(900)
        .text('¿cómo acabásteis aquí abajo?')
        .next('q1:2'),
    ),
  )
  .addEntry('q1:2', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('ay ')
        .pause(700)
        .text('a ver, ')
        .pause(1200)
        .text('como te explico')
        .pause(700)
        .text('...')
        .next('q1:3'),
    ),
  )
  .addEntry('q1:3', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Sin entrar en mucho detalle, ')
        .pause(1100)
        .text('digamos que seguimos una linea de investigación ')
        .pause(1500)
        .text('que el hechicero supremo no aprobó')
        .pause(700)
        .text('.')
        .next('q1:4'),
    ),
  )
  .addEntry('q1:4', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Nos encaramos con él, ')
        .pause(1000)
        .text('e intentamos seguir adelante. ')
        .pause(1200)
        .text('Pero, ')
        .pause(700)
        .text('como ves, ')
        .pause(900)
        .text('no salió bien.')
        .next('q1:5'),
    ),
  )
  .addEntry('q1:5', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 1.5 })
        .text('ÉL ')
        .style({ size: 1 })
        .text('decidió encerrarnos en esta parte de la mazmorra. ')
        .pause(1400)
        .text('Y por la puerta donde has entrado. ')
        .pause(1200)
        .text('nos puso un sello, ')
        .pause(900)
        .text('y no podemos salir de aquí.')
        .next('q1:6'),
    ),
  )
  .addEntry('q1:6', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('A veces, ')
        .pause(800)
        .style({ size: 1.5 })
        .text('ÉL ')
        .style({ size: 1 })
        .text('nos ha visitado. ')
        .pause(1000)
        .text('Pero nunca con buenas intenciones. ')
        .pause(1200)
        .text('Aunque, ')
        .pause(900)
        .text('hace bastante tiempo que no baja.')
        .next('q1:7'),
    ),
  )
  .addEntry('q1:7', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('A ver ')
        .pause(300)
        .style({ size: 0.8 })
        .text('a ver ')
        .pause(300)
        .style({ size: 0.6 })
        .text('a ver ')
        .pause(1000)
        .style({ size: 1 })
        .text('Un segundo. ')
        .pause(1000)
        .text('¿Lo que investigabáis era peligroso? ')
        .pause(1200)
        .text('¿Rozaba las artes oscuras?')
        .next('q1:8'),
    ),
  )
  .addEntry('q1:8', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('¡NOOO! ')
        .pause(1000)
        .text('Nada que ver. ')
        .pause(1200)
        .text('Estaba más enfocada en habilidades de curación ')
        .pause(1500)
        .text('y regeneración. ')
        .next('q1:9'),
    ),
  )
  .addEntry('q1:9', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Pero nada de revivir muertos ')
        .pause(1000)
        .text('o crear abominaciones, como los brujos. ')
        .pause(1200)
        .text('Es para ayudar. ')
        .next('q1:10'),
    ),
  )
  .addEntry('q1:10', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Aquí abajo, ')
        .pause(900)
        .text('avanzamos lento, pero, ')
        .pause(1100)
        .text('avanzamos. ')
        .next('q1:11'),
    ),
  )
  .addEntry('q1:11', 'marisa', (builder) =>
    builder.setText((b) =>
      b.text('Espero que recapacite algún día').pause(1200).text('...').next('q1:12'),
    ),
  )
  .addEntry('q1:12', 'player', (builder) =>
    builder.setText((b) => b.text('Eso espero yo tambien').pause(1200).text('...').next('q1:13')),
  )
  .addEntry('q1:13', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Que pena me da que estéis aquí')
        .pause(1300)
        .text('... ')
        .pause(1000)
        .text('¡Vuestro trabajo parece increíble! ')
        .pause(1200)
        .text('No se puede quedar aquí encerrado...')
        .next('q1:14'),
    ),
  )
  .addEntry('q1:14', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Ay, ')
        .pause(1300)
        .style({ size: 0.6 })
        .text('que majo, ')
        .pause(1300)
        .style({ size: 1, effect: 'wave' })
        .text('gracias')
        .style({ effect: null })
        .text(' :_)')
        .next('menu'),
    ),
  )
  .addEntry('q2:1', 'player', (builder) =>
    builder.setText((b) => b.text('¿Qué hacéis aquí?').next('q2:2')),
  )
  .addEntry('q2:2', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Pues, ')
        .pause(700)
        .text('seguimos aprendiendo e investigando, ')
        .pause(1200)
        .text('por nuestra cuenta.')
        .next('q2:3'),
    ),
  )
  .addEntry('q2:3', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Marina, ')
        .pause(700)
        .text('está mejorando en el combate mucho')
        .pause(1200)
        .text('...')
        .next('q2:4'),
    ),
  )
  .addEntry('q2:4', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Aunque ')
        .pause(1000)
        .text('no deja las otras disciplinas de lado. ')
        .pause(1400)
        .text('Sigue adelante con todo, ')
        .pause(1000)
        .text('es increíble...')
        .next('q2:5'),
    ),
  )
  .addEntry('q2:5', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('En cambio, ')
        .pause(1000)
        .text('el combate a mi no me va mucho. ')
        .pause(1200)
        .text('Estoy mas tiempo dedicada a los libros, ')
        .pause(1300)
        .text('y a los experimentos.')
        .next('q2:6'),
    ),
  )
  .addEntry('q2:6', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('¡Es asombroso! ')
        .pause(1300)
        .style({ size: 0.6 })
        .text('ojalá ser tan bueno como vosotras')
        .next('q2:7'),
    ),
  )
  .addEntry('q2:7', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('eeeee ')
        .pause(500)
        .text('no te desanimes. ')
        .pause(1200)
        .text('Aún eres joven, ')
        .pause(900)
        .text('no sabes lo que podrás conseguir en unos años. ')
        .pause(1300)
        .text('Sigue estudiando, ')
        .pause(900)
        .text('encuentra tu camino.')
        .next('q2:8'),
    ),
  )
  .addEntry('q2:8', 'player', (builder) =>
    builder.setText((b) =>
      b.style({ size: 0.6 }).text('ay, ').pause(1300).text('gracias :_)').next('menu'),
    ),
  )
  .addEntry('q3:1', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Tenéis esperanza ')
        .pause(1000)
        .text('de salir de aquí ')
        .pause(1000)
        .text('algún día, ')
        .pause(700)
        .text('¿verdad? ')
        .next('q3:2'),
    ),
  )
  .addEntry('q3:2', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Marina no mucho, ')
        .pause(1000)
        .text('y creo que incluso contigo ')
        .pause(1000)
        .text('eso apenas ha cambiado.')
        .next('q3:3'),
    ),
  )
  .addEntry('q3:3', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Yo la perdí hace tiempo también, ')
        .pause(1300)
        .text('pero, ')
        .pause(700)
        .text('al verte aquí, ')
        .pause(1000)
        .text('¡me la has devuelto! ')
        .next('q3:4'),
    ),
  )
  .addEntry('q3:4', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('No te preocupes, ')
        .pause(1000)
        .text('¡haré todo lo que esté en mi poder ')
        .pause(1250)
        .text('para que salgáis de aquí!')
        .next('q3:5'),
    ),
  )
  .addEntry('q3:5', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 0.9 })
        .text('O al menos, visitaros mientras tanto. ')
        .pause(1000)
        .style({ size: 0.8 })
        .text(' Si salgo vivo de esta mazmorra. ')
        .pause(1000)
        .style({ size: 0.7 })
        .text(' Si el hechicero no me mata después... ')
        .pause(1000)
        .style({ size: 0.6, family: 'italic' })
        .text('*mental crisis*')
        .next('q3:6'),
    ),
  )
  .addEntry('q3:6', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Ey, ')
        .pause(600)
        .text('tranquilo muchacho. ')
        .pause(1250)
        .text('Haré todo lo que pueda para que salgas de aquí.')
        .next('q3:7'),
    ),
  )
  .addEntry('q3:7', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 0.9 })
        .text('Eso me deja algo más tranquilo.')
        .pause(1000)
        .style({ size: 1 })
        .text(' Pero el hechicero...')
        .next('q3:8'),
    ),
  )
  .addEntry('q3:8', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Algo debe estar cambiando ')
        .pause(800)
        .text('ahí arriba... ')
        .pause(1250)
        .text('Quien sabe...')
        .next('menu'),
    ),
  )
  .addEntry('q4:1', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 0.9 })
        .text('esto, ')
        .pause(1000)
        .text('...')
        .pause(500)
        .style({ size: 1 })
        .text(' ¿Es ')
        .pause(600)
        .text('Marina ')
        .pause(650)
        .text(' siempre así?')
        .next('q4:2'),
    ),
  )
  .addEntry('q4:2', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('¿Te refieres a como se comporta? ')
        .pause(1250)
        .text('Ah, ')
        .pause(600)
        .text('no te preocupes. ')
        .pause(1000)
        .text('Marina siempre desconfía de todo el mundo. ')
        .next('q4:3'),
    ),
  )
  .addEntry('q4:3', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Realmente ')
        .pause(1000)
        .text('es mucho más amable ')
        .pause(600)
        .text('de lo que parece. ')
        .pause(1000)
        .text('Y tiene su corazoncito ')
        .pause(1500)
        .text('aunque lo oculte mucho.')
        .next('q4:4'),
    ),
  )
  .addEntry('q4:4', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Oh, ')
        .pause(1000)
        .text('ya veo. ')
        .pause(1500)
        .text('Gracias por aclararmelo ')
        .pause(500)
        .text(':) ')
        .next('menu'),
    ),
  )
  .addEntry('q5:1', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 0.9 })
        .text('em, ')
        .pause(1250)
        .style({ size: 0.95 })
        .text('parece que os lleváis muy bien')
        .pause(500)
        .style({ size: 1 })
        .text('... ')
        .next('q5:2'),
    ),
  )
  .addEntry('q5:2', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Si')
        .pause(750)
        .text('... ')
        .pause(1000)
        .text('A veces ella es muy impulsiva ')
        .pause(1000)
        .text('pero ')
        .pause(800)
        .text('sin ella ')
        .pause(900)
        .text('no podría vivir')
        .pause(500)
        .text('...')
        .next('q5:3'),
    ),
  )
  .addEntry('q5:3', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('En la mazmorra, ')
        .pause(1000)
        .text('es la que consigue todos los materiales. ')
        .pause(1500)
        .text('Sale a la zona de los portales, ')
        .pause(1000)
        .text('a pelear, ')
        .pause(800)
        .text('y vuelve llena de cosas. ')
        .next('q5:4'),
    ),
  )
  .addEntry('q5:4', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('La alegría con la que vuelve... ')
        .pause(1500)
        .style({ size: 0.9 })
        .text('Me preocupa que algún día ')
        .pause(1250)
        .style({ size: 0.8 })
        .text('no vuelva')
        .pause(1000)
        .style({ size: 0.7 })
        .text('...')
        .pause(1500)
        .style({ size: 0.95 })
        .text(' Ay, perdona. ')
        .next('q5:5'),
    ),
  )
  .addEntry('q5:5', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('No me lo puedo ni imaginar... ')
        .pause(1250)
        .text('Pero me alegra veros tan compenetradas')
        .pause(500)
        .text(' :)')
        .next('q5:6'),
    ),
  )
  .addEntry('q5:6', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .text('Cada día, me ayuda a continuar viviendo ')
        .pause(1500)
        .text('con todo lo que hace. ')
        .pause(1250)
        .text('Con lo que hacemos... ')
        .pause(1250)
        .text('Ojalá salir de aquí ')
        .pause(1000)
        .text('juntas')
        .pause(500)
        .text('.')
        .next('q5:7'),
    ),
  )
  .addEntry('q5:7', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('¡Que chulo! ')
        .pause(900)
        .text('Aún con todo esto, ')
        .pause(1000)
        .text('seguís adelante. ')
        .pause(1000)
        .style({ effect: 'wave' })
        .text('¡Sois la caña! ')
        .pause(500)
        .style({ size: 0.7 })
        .text('sabelo')
        .next('menu'),
    ),
  )
  .addEntry('q6:1', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Habéis sido muy amables conmigo, ')
        .pause(1250)
        .text('y me habéis ayudado.')
        .next('q6:2'),
    ),
  )
  .addEntry('q6:2', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Me pasaré a visitaros, ')
        .pause(1250)
        .text('estéis donde estéis. ')
        .pause(1250)
        .text('¡Lo prometo!')
        .next('q6:3'),
    ),
  )
  .addEntry('q6:3', 'marisa', (builder) =>
    builder.setText((b) =>
      b
        .style({ effect: 'wave' })
        .text('aaaaaayy ')
        .pause(1250)
        .style({ size: 0.5, effect: null, family: 'italic' })
        .text('*te abraza*')
        .pause(1000)
        .style({ size: 0.8, family: 'normal' })
        .text(' Tanto tiempo sin ver una cara nueva... ')
        .pause(1250)
        .text('Gracias a tí ')
        .pause(1000)
        .text('por habernos dado algo de esperanza ')
        .pause(1000)
        .text(':3')
        .next('menu'),
    ),
  )
  .build()

/** LORE QA
 * - are they a couple?
 *      yes
 * - but..
 *      yep, I know. why this could be a problem?
 * - is the supreme wizard gelous of their investigation line?
 *      yes
 * - did he manage to use those spells?
 *      no, that's part of why they are here
 * - why marisa speaks japanese sometimes?
 *      why not?
 * - is marina gelous about the player?
 *      no, she is protective of her love, and marina does not know you and your intentions
 * - is marina a tsundere?
 *      ... in the past, probably
 * - is this healing/regeneration power related to marisa feelings to marina?
 *      in a way, yes. marisa do not want to see marina wounded. but also both like to help others
 *      the best way they can: healing!
 *      also note that marina can also help with fighting, but she would rather not use this way...
 * - but wait, why marina, which loves fighting, changed so much?
 *      my friend, love, that's all what you need
 * - did they know chris?
 *      yep
 * - do they hate the supreme wizard?
 *      marina do hate him. marisa, instead, do not hate him, but do not like the decision he took
 *      against them.
 * - are they really powerful?
 *      healing/regeneration requires a lot of "energy". So yeah, they really are powerful. remember
 *      too that marina is a good fighter, but focus more on they main power instead.
 * - what do you mean with "witchers" (male)?
 *      it is a reference to Andrzej Sapkowski "The Witcher Saga" (la saga del brujo) and
 *      "The Witcher" games.
 * - why marina and marisa?
 *      look how the common part of their names, the begining in fact. does it remind you of
 *      someone? (another reference to OMORI)
 *      in fact, the colour scheme is stracted from the slime girls boss.
 * - marisa changed marina a lot, no?
 *      asi es. marina learned to share his love to the rest, even though she still has some trust
 *      issues with the people. as marisa said, marina still has a big heart and will show to you
 *      (a su tiempo)
 * - so, love is the base of their spells?
 *      indeed. but they are not fully aware of it.
 *      (SPOILER) the way they handle love differs from Chris.
 *
 * DO NOT FORGET TO SEE Chris QA TOO!!
 */
