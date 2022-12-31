import { newDialog } from '../../types/dialogs'

const testDialog = newDialog<number>('test', 0)
  .addEntry('1', 'player', (builder) =>
    builder.setText((textBuilder) =>
      textBuilder
        .text('this is')
        .pause(1000)
        .text(' some ')
        .pause(1000)
        .style({ size: 1.25, effect: 'wave' })
        .text('cool')
        .pause(1000)
        .style({ size: 1.5 })
        .text(' stuff')
        .pause(1000)
        .text('.')
        .pause(500)
        .text('.')
        .pause(500)
        .text('. ')
        .pause(2000)
        .style({ effect: null })
        .condition(
          (n) => n === 0,
          (textBuilder) => textBuilder.style({ size: 1.75 }).text('nice!!'),
        )
        .condition(
          (n) => n === 1,
          (textBuilder) => textBuilder.style({ size: null }).text('Wait a minute!'),
        )
        .condition(
          (n) => n === 2,
          (textBuilder) =>
            textBuilder.style({ size: 2, effect: 'crazy' }).text('This is not funny!'),
        )
        .condition(
          (n) => n === 3,
          (textBuilder) =>
            textBuilder.style({ size: 2.5, effect: 'crazy' }).text('STOP THIS!!!').next('4'),
        )
        .next('2'),
    ),
  )
  .addEntry('2', 'player', (builder) =>
    builder
      .setText((textBuilder) => textBuilder.text('what should I do now?'))
      .setChoices((choicesBuilder) =>
        choicesBuilder
          .addClose('close', 'Close')
          .addNext('next', 'Next', '3')
          .addNext('effects', '¿', 'effects'),
      ),
  )
  .addEntry('3', 'dev', (builder) =>
    builder.setText((textBuilder) =>
      textBuilder
        .text('nice trick you did in there')
        .pause(250)
        .text('.')
        .pause(250)
        .text('.')
        .pause(250)
        .text('.')
        .pause(1000)
        .text(' now see this ')
        .pause(750)
        .style({ size: 2 })
        .text(':)')
        .state((n) => (n % 3) + 1)
        .next('1'),
    ),
  )
  .addEntry('4', 'dev', (builder) =>
    builder.setText((textBuilder) =>
      textBuilder
        .text('Okeeeeeey, I stop messing with you')
        .pause(200)
        .text('.')
        .pause(200)
        .text('.')
        .pause(200)
        .text('.')
        .pause(1000)
        .text(' pinky promise!')
        .close(),
    ),
  )
  .addEntry('effects', 'dev', (builder) =>
    builder.setText((b) =>
      b.style({ effect: 'crazy' }).text('CRAZY ').style({ effect: 'wave' }).text('WAVE').next('2'),
    ),
  )
  .build()

export default testDialog
