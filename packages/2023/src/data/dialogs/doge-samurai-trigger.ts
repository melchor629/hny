import useDungeonState from '../../hooks/use-dungeon-state'
import { newDialog } from '../../types/dialogs'

// translation made by google translator and reviewed by el maquina danié (@exoddus21)

// melchor note: los he cambiado pero he dejado el original al lado
// Cambiar watashi　(私) por 拙者
// Cambiar anata　(あなた) por 其方

const dogeSamuraiTriggerDialog = newDialog('doge-samurai-trigger', null)
  .addEntry('1', 'dogeSamurai', (builder) =>
    builder.setText((b) =>
      b
        // mi nombre es shibe el samurái
        .text('拙者の名前はサムライのシベです') // 私の名前はサムライのシベです
        .next('2'),
    ),
  )
  .addEntry('2', 'dogeSamurai', (builder) =>
    builder.setText((b) =>
      b
        // soy el mejor samurái de la región,
        .text('拙者はこの地域で最高のサムライです。') // 私はこの地域で最高のサムライです。
        .pause(3000)
        // nadie me ha vencido aún
        .text('まだ誰も拙者を倒していません') // まだ誰も私を倒していません
        .next('3'),
    ),
  )
  .addEntry('3', 'dogeSamurai', (builder) =>
    builder.setText((b) =>
      b
        // ¡¿como has osado entrar en mis dominios!?
        .text('拙者の領域に入るなんて!?') // 私の領域に入るなんて!?
        .pause(3000)
        // este agravio no puede quedar impune
        .text('この犯罪を許しません')
        .next('4'),
    ),
  )
  .addEntry('4', 'dogeSamurai', (builder) =>
    builder.setText((b) =>
      b
        // ahora debes morir!!
        .text('今、其方は死ななければなりません!!') // 今、あなたは死ななければなりません!!
        .next('5'),
    ),
  )
  .addEntry('5', 'player', (builder) =>
    builder.setText((b) => b.text('No me he enterado de nada de lo que ha dicho...').next('6')),
  )
  .addEntry('6', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .text('Te resumo: ')
        .pause(1000)
        .text('has entrado en su territorio ')
        .pause(1500)
        .text('y ahora debes morir ')
        .pause(1000)
        .text(':')
        .pause(1000)
        .text(')')
        .next('7'),
    ),
  )
  .addEntry('7', 'player', (builder) =>
    builder.setText((b) =>
      b
        .style({ size: 1.5 })
        .text('PERO')
        .pause(500)
        .style({ size: 1.25 })
        .text(' PERO')
        .pause(500)
        .style({ size: 1.125 })
        .text(' PERO')
        .pause(500)
        .style({ size: 0.85 })
        .text(' PERO ')
        .pause(1000)
        .style({ size: 1, effect: 'crazy' })
        .text('¡Si no sé luchar!')
        .next('8'),
    ),
  )
  .addEntry('8', 'dev', (builder) =>
    builder.setText((b) =>
      b
        .text('No te preocupes, ')
        .pause(1500)
        .text('no he podido ')
        .pause(500)
        .text('programar esta parte ')
        .pause(1500)
        .text('por lo que ')
        .pause(750)
        .text('no tienes que pelear.')
        .next('9'),
    ),
  )
  .addEntry('9', 'dogeSamurai', (builder) =>
    builder.setText((b) =>
      b
        // ¿Como es posible?
        .style({ effect: 'crazy' })
        .text('馬鹿な。。。！')
        .pause(2000)
        // Nunca nadie me habia derrotado,
        .style({ effect: null })
        .text('誰も拙者を倒したことはありません。') // 誰も私を倒したことはありません。
        .pause(3000)
        // domo arigato y todo eso
        .text('よろしくお願いします')
        .next('10'),
    ),
  )
  .addEntry('10', 'dogeSamurai', (builder) =>
    builder.setText((b) =>
      b
        // dedicaré mi vida a la contemplación y el pensamiento
        .text('拙者は自分の人生を熟考と思考に捧げます') // 私は自分の人生を熟考と思考に捧げます
        .pause(2000)
        // una vez mas, muchas gracias
        .text('改めまして、')
        .pause(1500)
        .text('誠にありがとうございました')
        .next('11'),
    ),
  )
  .addEntry('11', 'player', (builder) =>
    builder.setText((b) =>
      b
        .run(() => useDungeonState.getState().epicBattleHasFinished())
        .text('Okey')
        .pause(1000)
        .text('.')
        .pause(750)
        .text('.')
        .pause(750)
        .text('.')
        .close(),
    ),
  )
  .build()

export default dogeSamuraiTriggerDialog
