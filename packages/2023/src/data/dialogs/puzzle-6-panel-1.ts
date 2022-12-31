import useDungeonState from '../../hooks/use-dungeon-state'
import { newDialog } from '../../types/dialogs'

const puzzle6Panel1 = newDialog(
  'puzzle-6-panel-1',
  () => [false, false, false, false] as [boolean, boolean, boolean, boolean],
)
  .addEntry('first-number', 'code-panel', (builder) =>
    builder
      .setText((b) => b.style({ family: 'code' }).text('CODE PLS'))
      .setChoices((b) =>
        b
          .addNext('2', '2', 'second-number-ok')
          .addNext('4', '4', 'second-number-wrong')
          .addNext('6', '6', 'second-number-wrong')
          .addNext('3', '3', 'second-number-wrong'),
      ),
  )
  .addEntry('second-number-ok', 'code-panel', (builder) =>
    builder
      .setText((b) =>
        b
          .state(() => [true, false, false, false])
          .style({ size: 0.75, family: 'code' })
          .text('*bip*')
          .pause(500),
      )
      .setChoices((b) =>
        b
          .addNext('1', '1', 'third-number-wrong')
          .addNext('5', '5', 'third-number-ok')
          .addNext('8', '8', 'third-number-wrong')
          .addNext('4', '4', 'third-number-wrong'),
      ),
  )
  .addEntry('second-number-wrong', 'code-panel', (builder) =>
    builder
      .setText((b) => b.style({ size: 0.75, family: 'code' }).text('*bip*').pause(500))
      .setChoices((b) =>
        b
          .addNext('1', '1', 'third-number-wrong')
          .addNext('5', '5', 'third-number-ok')
          .addNext('8', '8', 'third-number-wrong')
          .addNext('4', '4', 'third-number-wrong'),
      ),
  )
  .addEntry('third-number-ok', 'code-panel', (builder) =>
    builder
      .setText((b) =>
        b
          .state(([f]) => [f, true, false, false])
          .style({ size: 0.75, family: 'code' })
          .text('*bip*')
          .pause(500),
      )
      .setChoices((b) =>
        b
          .addNext('3', '3', 'fourth-number-wrong')
          .addNext('1', '1', 'fourth-number-wrong')
          .addNext('7', '7', 'fourth-number-ok')
          .addNext('9', '9', 'fourth-number-wrong'),
      ),
  )
  .addEntry('third-number-wrong', 'code-panel', (builder) =>
    builder
      .setText((b) => b.style({ size: 0.75, family: 'code' }).text('*bip*').pause(500))
      .setChoices((b) =>
        b
          .addNext('3', '3', 'fourth-number-wrong')
          .addNext('1', '1', 'fourth-number-wrong')
          .addNext('7', '7', 'fourth-number-ok')
          .addNext('9', '9', 'fourth-number-wrong'),
      ),
  )
  .addEntry('fourth-number-ok', 'code-panel', (builder) =>
    builder
      .setText((b) =>
        b
          .state(([f, s]) => [f, s, true, false])
          .style({ size: 0.75, family: 'code' })
          .text('*bip*')
          .pause(500),
      )
      .setChoices((b) =>
        b
          .addNext('8', '8', 'final-wrong')
          .addNext('4', '4', 'final-wrong')
          .addNext('3', '3', 'final-wrong')
          .addNext('0', '0', 'final-ok'),
      ),
  )
  .addEntry('fourth-number-wrong', 'code-panel', (builder) =>
    builder
      .setText((b) => b.style({ size: 0.75, family: 'code' }).text('*bip*').pause(500))
      .setChoices((b) =>
        b
          .addNext('8', '8', 'final-wrong')
          .addNext('4', '4', 'final-wrong')
          .addNext('3', '3', 'final-wrong')
          .addNext('0', '0', 'final-ok'),
      ),
  )
  .addEntry('final-ok', 'code-panel', (builder) =>
    builder.setText((b) =>
      b
        .state(([f, s, t]) => [f, s, t, true])
        .style({ family: 'code' })
        .text('*bip*')
        .next('end'),
    ),
  )
  .addEntry('final-wrong', 'code-panel', (builder) =>
    builder.setText((b) => b.style({ family: 'code' }).text('*bip*').next('end')),
  )
  .addEntry('end', 'code-panel', (builder) =>
    builder.setText((b) =>
      b
        .style({ family: 'code' })
        .condition(
          ([f, s, t, ft]) => f && s && t && ft,
          (bb) =>
            bb.text('CODE ACCEPTED').run(() => useDungeonState.getState().puzzle6CodeAccepted(0)),
        )
        .condition(
          ([f, s, t, ft]) => !f || !s || !t || !ft,
          (bb) => bb.style({ size: 1.25 }).text('CODE WRONG'),
        )
        .close(),
    ),
  )
  .build()

export default puzzle6Panel1
