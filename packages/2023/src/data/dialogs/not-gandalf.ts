import useDungeonState from '../../hooks/use-dungeon-state'
import useInventory from '../../hooks/use-inventory'
import { newDialog } from '../../types/dialogs'

// s'anomena Tomeu
const notGandalfDialog = newDialog('tomeu', false)
  .addEntry('paraules', 'tomeu', (builder) =>
    builder.setText((b) =>
      b
        .style({ skipable: false, family: 'italic' })
        .text('Cantimplora! ')
        .pause(1000)
        .text('Fasset! ')
        .pause(1000)
        .text('Butifarra! ')
        .pause(1000)
        .text('Mirlo! ')
        .pause(500)
        .text('Gaviota! ')
        .pause(500)
        .text('Boardilla! ')
        .next('au'),
    ),
  )
  .addEntry('au', 'tomeu', (builder) =>
    builder.setText((b) =>
      b
        .text('Au! A ca una puta... ')
        .pause(1000)
        .run(() => useDungeonState.getState().changeTomeuState('back'))
        .pause(1000)
        .text('Epa, qui ets tu? ')
        .pause(1500)
        .text("Aquesta porta no s'obri.")
        .next('yo'),
    ),
  )
  .addEntry('yo', 'player', (builder) =>
    builder.setText((b) =>
      b
        .text('¿Como que no abre? ')
        .pause(1000)
        .text('¿Has visto ese texto? ')
        .pause(1500)
        .text('Por cierto yo...')
        .next('tu'),
    ),
  )
  .addEntry('tu', 'tomeu', (builder) =>
    builder.setText((b) =>
      b
        .text('Es clar que si! No obri però. ')
        .pause(1500)
        .text('He probat a dir de tot...')
        .next('abrir'),
    ),
  )
  .addEntry('abrir', 'player', (builder) =>
    builder
      .setText((b) =>
        b
          .text('Un momento... ')
          .pause(1500)
          .text('Espera... ')
          .pause(1500)
          .text('¿No pone aquí ...'),
      )
      .setChoices((b) =>
        b
          .addNext('not-ok1', 'Me has pisado el zapato', 'not-ok')
          .addNext('ok', 'Agáchate y átate el zapato', 'ok')
          .addNext('not-ok2', 'Te falta un zapato', 'not-ok'),
      ),
  )
  .addEntry('ok', 'tomeu', (builder) =>
    builder.setText((b) =>
      b
        .state(() => true)
        .pause(500)
        .run(() => useDungeonState.getState().changeTomeuState('front'))
        .pause(1000)
        .run(() => useDungeonState.getState().changeDoorOpenState('doorNpc1', true))
        .text('No idò i si, ')
        .pause(1000)
        .text("s'ha obert.")
        .next('final'),
    ),
  )
  .addEntry('not-ok', 'tomeu', (builder) =>
    builder.setText((b) =>
      b
        .run(() => useDungeonState.getState().changeTomeuState('front'))
        .text('.')
        .pause(1000)
        .text('.')
        .pause(1000)
        .text('.')
        .pause(1000)
        .run(() => useDungeonState.getState().changeTomeuState('back'))
        .text(' No ha fet res!')
        .pause(2000)
        .run(() => useDungeonState.getState().changeTomeuState('front'))
        .text(' Però, espera, aquí podria dir un altra cosa...')
        .next('not-ok-next'),
    ),
  )
  .addEntry('not-ok-next', 'tomeu', (builder) =>
    builder.setText((b) =>
      b
        .text('Agáchate ')
        .pause(1100)
        .text('y ')
        .pause(500)
        .text('átate ')
        .pause(1000)
        .text('el ')
        .pause(600)
        .style({ size: 1.5 })
        .text('zapato!')
        .pause(2000)
        .run(() => useDungeonState.getState().changeDoorOpenState('doorNpc1', true))
        .pause(500)
        .style({ size: 1, effect: 'wave' })
        .text(' Idòòòòòò... ')
        .pause(1000)
        .text('Ja ha obert!')
        .next('final'),
    ),
  )
  .addEntry('final', 'tomeu', (builder) =>
    builder.setText((b) =>
      b
        .run(() => useDungeonState.getState().changeTomeuState('back'))
        .text('Això per haber-me ajudat. ')
        .pause(1000)
        .run(() => useInventory.getState().discoverPhoto('photo-3'))
        .pause(500)
        .text('Adèu!')
        .run(() => useDungeonState.getState().changeTomeuState('front'))
        .close(),
    ),
  )
  .build()

export default notGandalfDialog
