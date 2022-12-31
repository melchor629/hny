import useDungeonState from '../../hooks/use-dungeon-state'
import useInventory from '../../hooks/use-inventory'
import { newDialog } from '../../types/dialogs'

export const passChrisFirstDialog = newDialog('pass-chris', null)
  .addEntry('text', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ skipable: false })
        .text('Espera, ')
        .pause(1000)
        .text('hay un tipo encerrado')
        .pause(1100)
        .text('...')
        .close(),
    ),
  )
  .build()

export const firstContactWithChrisDialog = newDialog('first-contact-chris', null)
  .addEntry('sleeping', 'player', (builder) =>
    builder
      .setText((b) =>
        b
          .style({ size: 0.7 })
          .text('está durmiendo')
          .pause(1000)
          .text('... ')
          .pause(1200)
          .text('será mejor que me vaya')
          .pause(1000)
          .text('... '),
      )
      .setChoices((b) =>
        b.addNext('run', 'Irse', 'remember').addNext('wakeup', 'Despertar', 'wake-up'),
      ),
  )
  .addEntry('remember', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .text('Recuerda ')
        .pause(600)
        .text('lo que te comentó ')
        .pause(1000)
        .text('Marisa')
        .pause(500)
        .text('... ')
        .next('remember!'),
    ),
  )
  .addEntry('remember!', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 0.7 })
        .text('Ooh ')
        .pause(1000)
        .text('¡es verdad! ')
        .pause(1500)
        .text('Tendré que despertarlo, ')
        .pause(1000)
        .text('no queda otra.')
        .next('wake-up'),
    ),
  )
  .addEntry('wake-up', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 0.7 })
        .text('a ver ')
        .pause(1000)
        .style({ size: 1 })
        .text('EH, BUEN SEÑOR. ')
        .next('wake-up-2'),
    ),
  )
  .addEntry('wake-up-2', 'player', (builder) =>
    builder.setText((b) => b.style({ size: 1.2 }).text('OYE, BUEN SEÑOR. ').next('wake-up-3')),
  )
  .addEntry('wake-up-3', 'player', (builder) =>
    builder.setText((b) =>
      b.style({ size: 1.5, effect: 'crazy' }).text('¡¡DESPIERTE!! ').next('wake-up-4'),
    ),
  )
  .addEntry('wake-up-4', 'player', (builder) =>
    builder.setText((b) => b.text('Tendré que probar más fuerte. ').next('wake-up-5')),
  )
  .addEntry('wake-up-5', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 2, effect: 'crazy' })
        .text('¡¡¡OYEEEEEEE!! ')
        .pause(800)
        .text('¡¡DESPIERTE SEÑOR!!')
        .next('waking-up'),
    ),
  )
  .addEntry('waking-up', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .style({ skipable: false })
        .run(() => useDungeonState.getState().changeChrisState('wakingUp'))
        .pause(1000)
        .text('...')
        .pause(5000)
        .next('wtfay'),
    ),
  )
  .addEntry('wtfay', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('¿Que pasa aquí con tanto grito? ')
        .pause(2000)
        .text('... ')
        .pause(1000)
        .text('Un momento, ')
        .pause(900)
        .text('¿cómo qué grito? ')
        .pause(1200)
        .text('¿Quién narices eres tú?')
        .close(),
    ),
  )
  .build()

export const chrisAskingFavourDialog = newDialog('chris-asking-favour', null)
  .addEntry('1', 'chris', (builder) =>
    builder.setText((b) =>
      b.text('¿Qué haces aquí? ').pause(1100).text('No deberías estar aquí abajo...').next('2'),
    ),
  )
  .addEntry('2', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Te resumo: ')
        .pause(1200)
        .text('Hechizo salió mal, ')
        .pause(700)
        .text('estoy recogiendo lo que se ha dispersado por la mazmorra.')
        .next('3'),
    ),
  )
  .addEntry('3', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Espera, ')
        .pause(900)
        .text('¿fuiste tu el de la explosión mágica?')
        .pause(1400)
        .text('Encima, ')
        .pause(600)
        .text('has perdido cosas, ')
        .pause(1100)
        .text('espero que no fueran importantes.')
        .next('4'),
    ),
  )
  .addEntry('4', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 0.8 })
        .text('👉👈 ')
        .pause(1000)
        .style({ size: 0.7 })
        .text('Es que, ')
        .pause(1200)
        .text('lo son.')
        .next('5'),
    ),
  )
  .addEntry('5', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('¿Y ')
        .style({ size: 1.75 })
        .text('Él')
        .style({ size: 1 })
        .pause(200)
        .text(' lo sabe?')
        .next('6'),
    ),
  )
  .addEntry('6', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 0.8 })
        .text('hehe ')
        .pause(1000)
        .style({ size: 0.7 })
        .text('No')
        .pause(650)
        .text('.')
        .next('7'),
    ),
  )
  .addEntry('7', 'chris', (builder) =>
    builder.setText((b) => b.text('Muchacho, ').pause(700).text('estás en un buen lío.').next('8')),
  )
  .addEntry('8', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Creo que sé que estás buscando. ')
        .pause(1300)
        .text('Yo estoy buscando una cosa. ')
        .pause(1200)
        .text('Te propongo un trato.')
        .next('9'),
    ),
  )
  .addEntry('9', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Búscame un objeto en forma de gota ')
        .pause(1300)
        .text('y brillante. ')
        .pause(800)
        .text('Debe estar por aquí cerca, ')
        .pause(1000)
        .text('por ahí delante hacia donde ibas tú.')
        .next('10'),
    ),
  )
  .addEntry('10', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('En cambio ')
        .pause(900)
        .text('yo ')
        .pause(800)
        .text('te daré esto ')
        .pause(1000)
        .style({ family: 'italic' })
        .text('*muestra una foto*')
        .next('11'),
    ),
  )
  .addEntry('11', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('¡Trato hecho! ')
        .pause(1200)
        .text('Volveré con tu objeto, ')
        .pause(1100)
        .text('lo prometo.')
        .next('12'),
    ),
  )
  .addEntry('12', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Claro claro, ')
        .pause(900)
        .text('si ')
        .pause(800)
        .text('vale ')
        .pause(1000)
        .style({ size: 0.5, family: 'italic' })
        .text('(no lo conseguirá)')
        .close(),
    ),
  )
  .build()

export const chrisWaitingForItemDialog = newDialog('chris-waiting-for-item', () =>
  Math.trunc(Math.random() * 3),
)
  .addEntry('text?', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .condition(
          (v) => v === 0,
          (bb) => bb.text('Deberías estar buscando el objeto que te pedí...'),
        )
        .condition(
          (v) => v === 1,
          (bb) =>
            bb
              .text('¿Aún por aquí? ')
              .pause(1200)
              .text('Cuando tengas el objeto, ')
              .pause(800)
              .text('hablamos.'),
        )
        .condition(
          (v) => v === 2,
          (bb) =>
            bb
              .text('Tienes huevos, eso lo reconozco. ')
              .pause(1400)
              .text('Ahora vé a por mi objeto.'),
        )
        .close(),
    ),
  )
  .build()

export const chrisGoingToReceiveItemDialog = newDialog('chris-going-to-receive-item', null)
  .addEntry('text!', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ skipable: false })
        .text('Es que, ')
        .pause(1000)
        .text('resulta que, ')
        .pause(1200)
        .text('lo encontré.')
        .next('2'),
    ),
  )
  .addEntry('2', 'chris', (builder) =>
    builder.setText((b) =>
      b.text('Me sorprende que sigas vivo. ').pause(1200).text('Déjame verlo.').next('3'),
    ),
  )
  .addEntry('3', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Un segundo, ')
        .pause(900)
        .text('que lo saque de la mochila')
        .pause(1100)
        .text('...')
        .pause(1500)
        .style({ size: 0.7, family: 'italic' })
        .text('*le enseñas el objeto*')
        .next('4'),
    ),
  )
  .addEntry('4', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 1.4 })
        .text('No me ')
        .pause(1300)
        .style({ size: 1 })
        .text('De verdad, ')
        .pause(800)
        .text('lo has encontrado. ')
        .pause(1200)
        .text('No me lo puedo creer...')
        .next('5'),
    ),
  )
  .addEntry('5', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Estaba enterrado muy vagamente. ')
        .pause(1250)
        .text('Con una pala la he desenterrado, ')
        .pause(1000)
        .text('en un tris.')
        .next('6'),
    ),
  )
  .addEntry('6', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .style({ effect: 'crazy' })
        .text('¡Maldito! ')
        .pause(1000)
        .style({ effect: null })
        .text('Lo enterró así para que siempre notara su presencia, ')
        .pause(1500)
        .text('constantemente, ')
        .pause(800)
        .text('pero encerrado no podía ir a buscarlo.')
        .next('7'),
    ),
  )
  .addEntry('7', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Suena a una especie de tortura, ')
        .pause(1300)
        .text('que mal lo habrás estado pasando...')
        .next('8'),
    ),
  )
  .addEntry('8', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 1.25 })
        .text('PERO, ')
        .pause(1100)
        .style({ size: 1 })
        .text('antes de entregartelo, ')
        .pause(900)
        .text('quiero asegurarme de una cosa.')
        .next('9'),
    ),
  )
  .addEntry('9', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Eso no es lo que pactamos... ')
        .pause(1500)
        .text('Aunque, ')
        .pause(900)
        .text('te lo debo. ')
        .pause(1200)
        .text('Adelante.')
        .next('10'),
    ),
  )
  .addEntry('10', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('¿Para qué sirve este objeto')
        .pause(1100)
        .style({ size: 1.5 })
        .text(' y ')
        .style({ size: 1 })
        .pause(900)
        .text('qué quieres hacer con él?')
        .next('11'),
    ),
  )
  .addEntry('11', 'chris', (builder) => builder.setText((b) => b.text('Vaya.').next('12')))
  .addEntry('12', 'chris', (builder) =>
    builder.setText((b) =>
      b.text('No me esperaba esa pregunta... ').pause(1000).text('Te cuento:').next('13'),
    ),
  )
  .addEntry('13', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('El objeto sirve para ')
        .pause(1000)
        .text('catalizar mi mejor poder. ')
        .pause(1200)
        .text('Puedo sentir la vida alrededor mía ')
        .pause(1300)
        .text('e incluso verla ')
        .pause(800)
        .style({ size: 0.7 })
        .text('(dada ciertas condiciones)')
        .pause(800)
        .style({ size: 1 })
        .text('.')
        .next('14'),
    ),
  )
  .addEntry('14', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('A veces, ')
        .pause(900)
        .text('incluso, ')
        .pause(900)
        .text('puedo notar sus sentimientos... ')
        .pause(1100)
        .text('No sirve muy bien para el espionaje, ')
        .pause(1000)
        .text('si te lo preguntas…')
        .next('15'),
    ),
  )
  .addEntry('15', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 1.5 })
        .text('¡BUA! ')
        .pause(1300)
        .style({ size: 1.2, effect: 'wave' })
        .text('¡IMPRESIONANTE! ')
        .pause(1500)
        .style({ size: 1.1, effect: null })
        .text('Lo que ')
        .pause(1100)
        .style({ size: 1 })
        .text('¿cómo es que sabías que estaba cerca tuya?')
        .next('16'),
    ),
  )
  .addEntry('16', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Verás, ')
        .pause(800)
        .text('dentro de él, ')
        .pause(1000)
        .text('hay dos fragmentos de alma')
        .pause(1100)
        .text('...')
        .pause(1500)
        .text(' Así es como consigue catalizar mejor mi poder.')
        .next('17'),
    ),
  )
  .addEntry('17', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Por lo que me dices, ')
        .pause(900)
        .text('no tienes intención de usarlo ')
        .pause(1000)
        .text('para el mal. ')
        .pause(1100)
        .text('Toma. ')
        .pause(1000)
        // here the player should give to chris the item...
        .text('Ahí tienes.')
        .next('18'),
    ),
  )
  .addEntry('18', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Muchas gracias, ')
        .pause(800)
        .text('muchacho. ')
        .pause(1000)
        .text('Lo prometido: ')
        .pause(1100)
        .run(() => {
          // ...but just in case, make all operations in one "transaction"
          useInventory.getState().removeFromInventory('special-object')
          useInventory.getState().discoverPhoto('photo-15')
          useDungeonState.getState().giveSpecialObjectToChris()
        })
        .text('el grabado de alta calidad.')
        .next('19'),
    ),
  )
  .addEntry('19', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('¡Gracias! ')
        .pause(1100)
        .text('Espera ')
        .pause(1000)
        .text('¿cómo que grabado? ')
        .pause(1100)
        .text('¡Esto es un papel impregnado del sentimiento de una persona en un instante!')
        .next('20'),
    ),
  )
  .addEntry('20', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 1.25 })
        .text('¿¡QUE!? ')
        .pause(1000)
        .style({ size: 1.15 })
        .text('¿En serio? ')
        .pause(1000)
        .style({ size: 1 })
        .text('¿Lo has hecho tu?')
        .next('21'),
    ),
  )
  .addEntry('21', 'player', (builder) =>
    builder.setText((b) => b.style({ size: 0.7, family: 'italic' }).text('ojalá').next('22')),
  )
  .addEntry('22', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Anda, ')
        .pause(800)
        .text('que es de otra persona. ')
        .pause(1000)
        .text('Lo que dije, ')
        .pause(850)
        .text('menudo lío en el que te has metido.')
        .next('23'),
    ),
  )
  .addEntry('23', 'chris', (builder) =>
    builder.setText((b) => b.text('¿Conoces quien ha lanzado este hechizo?').next('24')),
  )
  .addEntry('24', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 0.85, family: 'italic' })
        .text('Sé quien es... ')
        .pause(1500)
        .text('Pero apenas he hablado con ella... ')
        .next('25'),
    ),
  )
  .addEntry('25', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Dile que tenga cuidado. ')
        .pause(1000)
        .style({ size: 1.5 })
        .text('ÉL')
        .style({ size: 1 })
        .pause(250)
        .text(' es muy celoso de los poderes del resto.')
        .next('26'),
    ),
  )
  .addEntry('26', 'player', (builder) =>
    builder.setText((b) => b.text('Intentaré hacérselo saber').pause(1000).text('...').next('27')),
  )
  .addEntry('27', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Bueno. ')
        .pause(1000)
        .text('Voy a seguir adelante, ')
        .pause(1200)
        .text('me queda nada para terminar ')
        .pause(1300)
        .text(':)')
        .next('28'),
    ),
  )
  .addEntry('28', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('¡Mucha suerte')
        .pause(900)
        .text(' muchacho! ')
        .pause(1200)
        .text('Ven a darme una visita cuando quieras. ')
        .pause(1300)
        .style({ size: 0.85, family: 'italic' })
        .text('(no voy a ir muy lejos)')
        .close(),
    ),
  )
  .build()

export const moreLoreChrisDialog = newDialog('more-lore-chris', () => Math.trunc(Math.random() * 3))
  .addEntry('first', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .condition(
          (v) => v === 0,
          (bb) => bb.text('¡Hola de nuevo').pause(800).text(', muchacho!'),
        )
        .condition(
          (v) => v === 1,
          (bb) => bb.text('¡Hola! ').pause(700).text('¿qué te cuentas?'),
        )
        .condition(
          (v) => v === 2,
          (bb) => bb.style({ effect: 'wave' }).text('¿Que onda?'),
        )
        .next('menu'),
    ),
  )
  .addEntry('menu', 'chris', (builder) =>
    builder
      .setText((b) => b.text('¿Qué quieres?'))
      .setChoices((b) =>
        b
          .addClose('no', 'Nada')
          .addNext('q1', '¿Qué te pasó?', 'q1:1')
          .addNext('q2', '¿Qué haces aquí?', 'q2:1')
          .addNext('q3', '¿Tienes esperanza?', 'q3:1')
          .addNext('q4', '¿Me vigilas?', 'q4:1')
          .addNext('q5', '¿Dos almas?', 'q5:1'),
      ),
  )
  .addEntry('q1:1', 'player', (builder) =>
    builder.setText((b) =>
      b.text('¿Como acabaste aquí abajo? ').pause(1200).text('¿Que pasó?').next('q1:2'),
    ),
  )
  .addEntry('q1:2', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Digamos que ')
        .pause(900)
        .text('por mi poder')
        .pause(1000)
        .text(' estoy aquí.')
        .next('q1:3'),
    ),
  )
  .addEntry('q1:3', 'player', (builder) =>
    builder.setText((b) =>
      b.text('¿Y ya? ').pause(1200).text('Porfa, cuéntame que pasó.').next('q1:4'),
    ),
  )
  .addEntry('q1:4', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Hace mucho tiempo, ')
        .pause(1100)
        .text('en un lugar muy cercano. ')
        .pause(1000)
        .text('Conseguimos este poder.')
        .next('q1:5'),
    ),
  )
  .addEntry('q1:5', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('A ')
        .pause(250)
        .style({ size: 1.5 })
        .text('ÉL')
        .pause(250)
        .style({ size: 1 })
        .text(' le interesó mucho. ')
        .pause(900)
        .text('Venía a visitarnos. ')
        .pause(1000)
        .text('Preguntaba como íbamos con la investigación.')
        .next('q1:6'),
    ),
  )
  .addEntry('q1:6', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Un dia vino ')
        .pause(850)
        .text(' y quiso que le enseñáramos el hechizo. ')
        .pause(1250)
        .text('Y lo intentamos.')
        .next('q1:7'),
    ),
  )
  .addEntry('q1:7', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('No era capaz de crear la piedra correctamente. ')
        .pause(1500)
        .text('Y no sabemos usar el hechizo sin piedra.')
        .next('q1:9'),
    ),
  )
  .addEntry('q1:8', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('No pareció importarle mucho que no lo consiguiera.')
        .pause(1000)
        .style({ size: 0.7 })
        .text(' (en teoría)')
        .next('q1:9'),
    ),
  )
  .addEntry('q1:9', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Pero un día, ')
        .pause(1000)
        .text('vino con una petición ')
        .pause(1300)
        .text('que tuvimos que rechazar.')
        .next('q1:10'),
    ),
  )
  .addEntry('q1:10', 'player', (builder) =>
    builder.setText((b) => b.text('¿Qué te pidió hacer?').next('q1:11')),
  )
  .addEntry('q1:11', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Espiar. ')
        .pause(1500)
        .text('Como te he dicho ya, ')
        .pause(1100)
        .text('no sirve bien para espiar. ')
        .pause(1200)
        .text('No funciona bien para ese objetivo.')
        .next('q1:12'),
    ),
  )
  .addEntry('q1:12', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Mas bien, ')
        .pause(600)
        .text('no sirve como ')
        .pause(250)
        .style({ size: 1.5 })
        .text('ÉL')
        .pause(250)
        .style({ size: 1 })
        .text('quería que sirviera.')
        .next('q1:13'),
    ),
  )
  .addEntry('q1:13', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Hubo una pelea... ')
        .pause(1500)
        .text('ÉL nos forzaba a usarlo ')
        .pause(1000)
        .text('como ÉL quiere. ')
        .pause(1000)
        .text('Pero no se puede sin más...')
        .next('q1:14'),
    ),
  )
  .addEntry('q1:14', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('La pelea acabó en una pelea mágica... ')
        .pause(1500)
        .text('Mi compañero... ')
        .pause(1300)
        .text('Murió. ')
        .pause(1250)
        .text('Pero yo sobreviví...')
        .next('q1:15'),
    ),
  )
  .addEntry('q1:15', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('...')
        .pause(1500)
        .text(' Después de eso, ')
        .pause(900)
        .text('me metió aquí.')
        .next('q1:16'),
    ),
  )
  .addEntry('q1:16', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text(':_( ')
        .pause(1500)
        .style({ size: 0.8 })
        .text('qué triste ')
        .pause(900)
        .style({ family: 'italic' })
        .text('*se te cae una lágrima*')
        .next('q1:17'),
    ),
  )
  .addEntry('q1:17', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Ojalá pudiera ayudarte a salir de aquí. ')
        .pause(1200)
        .text('Pero no soy muy bueno en la magia. ')
        .pause(1000)
        .style({ size: 0.85 })
        .text(':(')
        .next('q1:18'),
    ),
  )
  .addEntry('q1:18', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('No te preocupes. ')
        .pause(900)
        .text('No intentes ser lo que no eres. ')
        .pause(1200)
        .text('Encuentra tu camino.')
        .next('q1:19'),
    ),
  )
  .addEntry('q1:19', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 0.7, family: 'italic' })
        .text('(alguién me ha dicho esa misma frase hace poco)')
        .next('menu'),
    ),
  )
  .addEntry('q2:1', 'player', (builder) =>
    builder.setText((b) => b.text('¿Qué haces aquí abajo?').next('q2:2')),
  )
  .addEntry('q2:2', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Al principio ')
        .pause(900)
        .text('intenté escapar con todo tipo de hechizos. ')
        .pause(1200)
        .text('Pero no hubo suerte ')
        .pause(800)
        .text('(como puedes ver).')
        .next('q2:3'),
    ),
  )
  .addEntry('q2:3', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('El sello mágico es muy ')
        .pause(1000)
        .text('muy ')
        .pause(400)
        .text('muy ')
        .pause(400)
        .text('muy ')
        .pause(555)
        .text('bueno')
        .pause(800)
        .text('.')
        .next('q2:4'),
    ),
  )
  .addEntry('q2:4', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Así que ')
        .pause(600)
        .text('el resto del tiempo ')
        .pause(1000)
        .text('he estado meditando ')
        .pause(1000)
        .text('e intentando mejorar mi poder.')
        .next('q2:5'),
    ),
  )
  .addEntry('q2:5', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Ah, no estabas durmiendo ')
        .pause(600)
        .text('cuando te estaba gritando ')
        .pause(1000)
        .text('¿verdad?')
        .next('q2:6'),
    ),
  )
  .addEntry('q2:6', 'chris', (builder) =>
    builder.setText((b) =>
      b.text('No... ').pause(1500).text('Pero no te preocupes por eso. ').next('q2:7'),
    ),
  )
  .addEntry('q2:7', 'player', (builder) =>
    builder.setText((b) => b.text('¿Has conseguido algún progreso?').next('q2:8')),
  )
  .addEntry('q2:8', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('No mucho... ')
        .pause(850)
        .text('Al menos conseguí poder detectar el objeto ')
        .pause(1000)
        .text('sin él ')
        .pause(500)
        .text(':)')
        .next('menu'),
    ),
  )
  .addEntry('q3:1', 'player', (builder) =>
    builder.setText((b) => b.text('¿Tienes esperanza de salir de aquí?').next('q3:2')),
  )
  .addEntry('q3:2', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Ninguna. ')
        .pause(1000)
        .text('A menos que el hechicero supremo cambie de idea, ')
        .pause(1300)
        .text('me temo que moriré aquí.')
        .next('q3:3'),
    ),
  )
  .addEntry('q3:3', 'player', (builder) => builder.setText((b) => b.text('Y si... ').next('q3:4')))
  .addEntry('q3:4', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 1.5 })
        .text('¡Ni se te ocurra! ')
        .pause(1000)
        .style({ size: 1 })
        .text('No quiero que te pase nada malo.')
        .next('q3:5'),
    ),
  )
  .addEntry('q3:5', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Déjame que acabe. ')
        .pause(1000)
        .text('He estado hablando con otras dos que están aquí abajo ')
        .pause(1700)
        .style({ size: 0.8, family: 'italic' })
        .text('(pero no aqui en la cárcel)')
        .next('q3:6'),
    ),
  )
  .addEntry('q3:6', 'chris', (builder) =>
    builder.setText((b) =>
      b.text('Espera ').pause(700).text('¿hay otros hechiceros aquí abajo?').next('q3:7'),
    ),
  )
  .addEntry('q3:7', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Sí, ')
        .pause(400)
        .text('dos muchachas muy majas que las encerraron juntas.')
        .next('q3:8'),
    ),
  )
  .addEntry('q3:8', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('¿Cómo se llaman?')
        .pause(1000)
        .style({ size: 0.9 })
        .text(' Por cierto, ')
        .pause(670)
        .text('me llamo Chris.')
        .next('q3:9'),
    ),
  )
  .addEntry('q3:9', 'player', (builder) =>
    builder.setText((b) =>
      b.text('Se llaman Marina y Marisa.').pause(1000).text('Por cierto, yo soy…').next('q3:10'),
    ),
  )
  .addEntry('q3:10', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Siguen... ')
        .pause(1200)
        .text('Siguen vivas... ')
        .pause(1500)
        .text('Después de tanto tiempo...')
        .next('q3:11'),
    ),
  )
  .addEntry('q3:11', 'player', (builder) =>
    builder.setText((b) => b.text('Anda ').pause(800).text('¿las conoces?').next('q3:12')),
  )
  .addEntry('q3:12', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 1.3, effect: 'wave' })
        .text('¡¡Y tanto!! ')
        .style({ size: 1, effect: null })
        .pause(1200)
        .text('Su investigación es impresionante... ')
        .pause(1500)
        .text('Más incluso que la nuestra... ')
        .pause(1500)
        .text('¡Me alegra saber que siguen vivas!')
        .next('q3:13'),
    ),
  )
  .addEntry('q3:13', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Retomando el tema, ')
        .pause(800)
        .text('tenemos un plan. ')
        .pause(1000)
        .text('No prometo nada. ')
        .pause(1000)
        .text('Solo confía en el plan.')
        .next('q3:14'),
    ),
  )
  .addEntry('q3:14', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Vale ')
        .pause(300)
        .text('vale. ')
        .pause(600)
        .text('No preguntaré. ')
        .pause(1000)
        .text('Pero ten mucho cuidado.')
        .next('q3:15'),
    ),
  )
  .addEntry('q3:15', 'player', (builder) =>
    builder.setText((b) =>
      b.text('Descuida, ').pause(700).text('tendré cuidado').pause(500).text(' :)').next('menu'),
    ),
  )
  .addEntry('q4:1', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('em')
        .pause(600)
        .style({ size: 0.9 })
        .text(' ahora que sé cosas ')
        .pause(1000)
        .style({ size: 0.8 })
        .text('¿me vigilas?')
        .next('q4:2'),
    ),
  )
  .addEntry('q4:2', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('¡Claro que no! ')
        .pause(1200)
        .text('Podría, ')
        .pause(700)
        .text('pero sé que ya estás cerca de terminar.')
        .next('q4:3'),
    ),
  )
  .addEntry('q4:3', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Además ')
        .pause(600)
        .text('prefiero ver en persona ')
        .pause(1200)
        .text('que usando el poder.')
        .next('q4:4'),
    ),
  )
  .addEntry('q4:4', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Indirecta captada. ')
        .pause(600)
        .text('Me pasaré a visitarte, ')
        .pause(1200)
        .text('si puedo.')
        .next('q4:5'),
    ),
  )
  .addEntry('q4:5', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Ahora que pienso. ')
        .pause(900)
        .text('Podrías hacerle una "visita" a Marina y Marisa ')
        .pause(1200)
        .text('con tu poder, ')
        .pause(800)
        .text('¿no?')
        .next('q4:6'),
    ),
  )
  .addEntry('q4:6', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('¡Tienes razón! ')
        .pause(1000)
        .text('A ver como están, ')
        .pause(1200)
        .text('después de tanto tiempo...')
        .next('q4:7'),
    ),
  )
  .addEntry('q4:7', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 1.5 })
        .text('ÉL')
        .pause(200)
        .style({ size: 1 })
        .text(' las desterró antes que a mi. ')
        .next('q4:8'),
    ),
  )
  .addEntry('q4:8', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Si me hubiera dado cuenta antes... ')
        .pause(1400)
        .style({ size: 0.75 })
        .text('No estaría aqui... ')
        .next('menu'),
    ),
  )
  .addEntry('q5:1', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('Has mencionado que el objeto ')
        .pause(1000)
        .text('contiene dos fragmentos de alma.')
        .next('q5:2'),
    ),
  )
  .addEntry('q5:2', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('¿Me lo podrías explicar? ')
        .pause(1000)
        .text('Si no es molestia ')
        .pause(900)
        .style({ size: 0.85 })
        .text('porfi')
        .next('q5:3'),
    ),
  )
  .addEntry('q5:3', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Mmmm... ')
        .pause(1000)
        .text('La investigación la hacía con otro compañero. ')
        .pause(1400)
        .text('Ya sabes de qué va.')
        .next('q5:4'),
    ),
  )
  .addEntry('q5:4', 'chris', (builder) =>
    builder.setText((b) => b.text('Pero no como va. ').next('q5:5')),
  )
  .addEntry('q5:5', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Verás, ')
        .pause(800)
        .text('el hechizo funciona por ')
        .pause(1000)
        .text('una de las emociones que sentimos ')
        .pause(900)
        .text('hacia el resto de personas ')
        .pause(1000)
        .text('(o seres vivos).')
        .next('q5:6'),
    ),
  )
  .addEntry('q5:6', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Por tanto, ')
        .pause(800)
        .text('buscamos cuál es esa fuerte emoción ')
        .pause(1000)
        .text('que nos permitiría lanzar el hechizo. ')
        .next('q5:7'),
    ),
  )
  .addEntry('q5:7', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('El objeto se creó con fragmentos de nuestras almas, ')
        .pause(1400)
        .text('enlazadas por ese sentimiento común. ')
        .pause(1200)
        .text('Y usamos ése mismo ')
        .pause(800)
        .text('para el hechizo.')
        .next('q5:8'),
    ),
  )
  .addEntry('q5:8', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('El objeto nos ayuda a canalizar el hechizo. ')
        .pause(1200)
        .text('Forjado con con nuestro amor, ')
        .pause(1000)
        .text('lanzado siempre con amor.')
        .next('q5:9'),
    ),
  )
  .addEntry('q5:9', 'chris', (builder) =>
    builder.setText((b) =>
      b
        .text('Ese sentimiento, ')
        .pause(1000)
        .style({ size: 1.2 })
        .text('¡es la base de todo! ')
        .pause(1300)
        .style({ size: 1 })
        .text('¿No es increíble?')
        .next('q5:10'),
    ),
  )
  .addEntry('q5:10', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('-')
        .pause(1000)
        .text(' es ')
        .pause(600)
        .style({ size: 1.4, effect: 'wave' })
        .text('SUPER IMPRESIONANTE')
        .style({ size: 0.9, effect: null })
        .pause(1000)
        .text(' me he quedado sin palabras')
        .next('q5:11'),
    ),
  )
  .addEntry('q5:11', 'chris', (builder) =>
    builder.setText((b) =>
      b.text('Gracias. ').pause(1200).text('Me has conmovido ').pause(600).text(':_)').next('menu'),
    ),
  )
  .build()

/** LORE QA
 * - is he in love with his tragically dead companion?
 *      yep
 * - but, ANOTHER ONE?
 *      I don't care, it is cool to have this kind of representation. But you are not forced to know
 *      that if you don't ask. cope
 * - what is the emotion that moves the spell and the special object?
 *      LOVE, in this case, they are aware of it (as Chris mentions)
 *      (SPOILER) the way they handle love differs from Marina and Marisa.
 * - why did the supreme wizard not managed to get the object work?
 *      because he loves no one but himself - love is the key of the spell
 * - why did he not managed to improve the powers?
 *      he needs his love. he is in some kind of "post-depression" which he has accepted what happened
 *      but he still miss his love...
 * - so, the spy-thing does not work because of love?
 *      more or less. love is key in the spell. the spell only works with people (or living things)
 *      the wizard knows. but works best if they care about the target (has some love relationship,
 *      but not romantic!!). work/school mates, friends, family, his loved one...
 * - did you put a Fernando Alonso reference?
 *      yes, I did :)
 * - confirmed chris was jailed after marina/marisa, but...
 *      what chris said in one of the dialogs, is that he (they in fact) did not think much about
 *      what happened with marisa and marina. perhaps if chris thought for a bit, they would be
 *      in another place, together... they could have fled together...
 * - what is the name of the other one?
 *      did not think of any name, sorry :(
 * - is he powerful? how does he compare with marina and marisa?
 *      he is really powerful too. but he was even more with his love. they power resided in their
 *      love they shared. so now he is less powerful (yet he really still is).
 *      compared to the girls, he even mentioned that they are more powerful than him (for obvious
 *      reasons).
 * - does he hate the supreme wizard?
 *      he had. but he has accepted and understands him. yet does not like what the supreme wizard
 *      did to them. just understands how he is and why did what he did.
 * - why chris?
 *      I am bad with names. always. so this name came across due to some circumstances I recently
 *      experienced (around december), and I kind like it :)
 *      no game references this time
 *
 * - influences around the LOVE topic on the spells?
 *      if I have to say something, maybe the experiences during the year, and the content I consumed
 *      may have something to to. during the year, I've watched "Komi-san can't communicate",
 *      "Weathering with you", "A silent voice" and "Steven Universe". Also played "OMORI".
 *      nice music has come out this year too, mainly "Life is Yours" (from The Foals).
 *      probably all these experiences combined, made this.
 *      don't know :)
 *
 * - wait a second, does the protagonist have a crush??
 *      :)
 *
 * DO NOT FORGET TO SEE Marina & Marisa QA TOO!!
 */
