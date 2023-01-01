import { createElement, Fragment } from 'react'

interface Photo {
  thumbnailPath: string
  path: string
  text: string | React.ReactElement
  tip: string
  who?: string
  whoType?: 'github' | 'instagram' | 'nick' | 'twitter'
}

const photos: Readonly<Record<string, Photo>> = {
  'photo-1': {
    thumbnailPath: 'assets/photos/photo-1-thumb.webp',
    path: 'assets/photos/photo-1.webp',
    // Sorry (redacted), couldn't get the message as you wanted
    text: createElement(
      Fragment,
      {},
      'Una postal navideña de Rudog el reno. En el interior se puede leer:',
      createElement('br'),
      '"Espero que tengas un año igual de bueno o mejor que éste. ¡Sigue así que lo está haciendo muy bien!',
      createElement('br'),
      'Con cariño, Tu bebito fiu fiu"',
    ),
    tip: 'Dentro de un barril.',
    who: 'yeray697',
    whoType: 'twitter',
  },
  'photo-2': {
    thumbnailPath: 'assets/photos/photo-2-thumb.webp',
    path: 'assets/photos/photo-2.webp',
    text: 'Manantial Férreo 2077',
    tip: 'En la gran sala del principio.',
    who: '@Neko250',
    whoType: 'github',
  },
  'photo-3': {
    thumbnailPath: 'assets/photos/photo-3-thumb.webp',
    path: 'assets/photos/photo-3.webp',
    text: 'Escuchas de repente una voz "Dinero para chuches", miras a los lados y no ves a nadie, de repente miras hacia bajo y ves un adorable niño a lo que le indicas que no tienes nada para ofrecerle y te contesta "No era una pregunta".',
    tip: 'Hablando con un hombre que habla raro.',
    who: 'david_camacho_97',
    whoType: 'instagram',
  },
  'photo-4': {
    thumbnailPath: 'assets/photos/photo-4-thumb.webp',
    path: 'assets/photos/photo-4.webp',
    text: 'Decisiones a largo plazo, lo que sabes que dejas y lo que esperas conseguir.',
    tip: 'Cerca de un hombre que habla raro.',
  },
  'photo-5': {
    thumbnailPath: 'assets/photos/photo-5-thumb.webp',
    path: 'assets/photos/photo-5.webp',
    text: 'Las instrucciones son sencillas, solo debes atinar darles a todos los bolos para que el genio te conceda un deseo, plot twist, aun sigo pobre.',
    tip: 'Detrás de una puerta que requiere dos llaves.',
  },
  'photo-6': {
    thumbnailPath: 'assets/photos/photo-6-thumb.webp',
    path: 'assets/photos/photo-6.webp',
    text: 'Prioridades',
    tip: 'Dentro de un cofre grande.',
  },
  'photo-7': {
    thumbnailPath: 'assets/photos/photo-7-thumb.webp',
    path: 'assets/photos/photo-7.webp',
    text: 'De chill con Estrella en el campo, le encanta salir a los Carruchos.',
    tip: 'Detrás de una puerta sin cerradura, escondida a la izquierda.',
  },
  'photo-8': {
    thumbnailPath: 'assets/photos/photo-8-thumb.webp',
    path: 'assets/photos/photo-8.webp',
    text: 'Es complejo saber quién eres realmente, pero... ¿y lo bien que sienta cuándo crees por fin conocerte?',
    tip: 'Por la mazmorra, yendo en dirección contraria a otra puerta sin cerradura.',
    who: 'Ismx',
    whoType: 'nick',
  },
  'photo-9': {
    thumbnailPath: 'assets/photos/photo-9.webp',
    path: 'assets/photos/photo-9.webp',
    text: 'Si tuviese que describir la fiesta más divertida a la que he ido sería este fin de semana. De estos 5 maricones si tuvieras que decir quién va peor, ¿Cuál sería?',
    tip: 'Dentro de un cofre chiquito.',
  },
  'photo-10': {
    thumbnailPath: 'assets/photos/photo-10-thumb.webp',
    path: 'assets/photos/photo-10.webp',
    text: 'Tremenda excursión por la zona del río este. El puente este es larguísimo, que chulo. ¡Que bien me lo paso con vosotros!',
    tip: 'Hablando con dos hechiceras.',
  },
  'photo-11': {
    thumbnailPath: 'assets/photos/photo-11-thumb.webp',
    path: 'assets/photos/photo-11.webp',
    text: 'Este momento consiste en Manolo 👍 meando 👍 en la Feria de la Vendia tras pasarlo bailar y pasarlo muy bien.',
    tip: 'Por la mazmorra, entre basura.',
    who: '@musicalpijama',
    whoType: 'instagram',
  },
  'photo-12': {
    thumbnailPath: 'assets/photos/photo-12-thumb.webp',
    path: 'assets/photos/photo-12.webp',
    text: 'haciendo un proyecto para clase vi a este michi enfadado porque le habíamos despertado y le hice una foto. michienfadau.',
    tip: 'En una zona desconectada de la mazmorra.',
  },
  'photo-13': {
    thumbnailPath: 'assets/photos/photo-13-thumb.webp',
    path: 'assets/photos/photo-13.webp',
    text: 'Cuando notes que ya no entras en tus pantalones y pienses que estás fallando a Amancio Ortega y sus cánones de belleza… Mira la foto y piensa que tampoco cumples con los cánones romanos y Trajano está muy decepcionado contigo.',
    tip: 'En una zona desconectada de la mazmorra.',
    who: 'Joselu',
    whoType: 'nick',
  },
  'photo-14': {
    thumbnailPath: 'assets/photos/photo-14-thumb.webp',
    path: 'assets/photos/photo-14.webp',
    text: 'michi navideño vibin',
    tip: 'En una zona desconectada de la mazmorra.',
  },
  'photo-15': {
    thumbnailPath: 'assets/photos/photo-15-thumb.webp',
    path: 'assets/photos/photo-15.webp',
    text: 'En esta foto aparecen dos de las cosas que mas me gustan, la fotografía y mi familia, en este caso mi abuela.',
    tip: 'Ayudando a un pibe.',
    who: '@rubenzz_',
    whoType: 'instagram',
  },
  'photo-16': {
    thumbnailPath: 'assets/photos/photo-16-thumb.webp',
    path: 'assets/photos/photo-16.webp',
    text: 'Domingo de verano, volando a +500metros del suelo con un casco de la bici que me recolocaba, por si las moscas...',
    tip: 'Detrás de una puerta con código.',
  },
  'photo-17': {
    thumbnailPath: 'assets/photos/photo-17.webp',
    path: 'assets/photos/photo-17.webp',
    text: '¡Michi gratis con la compra de 3 libros!',
    tip: 'Enterrado junto a un objeto de valor incalculable.',
  },
  'photo-18': {
    thumbnailPath: 'assets/photos/photo-18-thumb.webp',
    path: 'assets/photos/photo-18.webp',
    text: 'Yo segundos antes de enfrentarme a Mewtwo con mis puños desnudos y 99 ultraballs en el bolsillo',
    tip: '武士を倒す。',
  },
  'photo-19': {
    thumbnailPath: 'assets/photos/photo-19-thumb.webp',
    path: 'assets/photos/photo-19.webp',
    text: 'Ir caminando sin rumbo y hallar la paz que no buscaba',
    tip: 'Por la mazmorra, después de un boss, cerca del final.',
  },
  'photo-20': {
    thumbnailPath: 'assets/photos/photo-20-thumb.webp',
    path: 'assets/photos/photo-20.webp',
    text: 'Debts have to be paid.',
    tip: 'Entre una puerta rota y un portal. Mucho más cerca del final.',
  },
  'photo-21': {
    thumbnailPath: 'assets/photos/photo-21-thumb.webp',
    path: 'assets/videos/photo-21?.png',
    text: '¡Feliz año 2023! – Espero que sea un gran año para tí <3',
    tip: 'Al completar el juego.',
    who: 'Melchor',
    whoType: 'nick',
  },
  'photo-22': {
    // didn't expect to have many photos
    thumbnailPath: 'assets/photos/photo-22-thumb.webp',
    path: 'assets/photos/photo-22.webp',
    text: 'Two bros chilling in a hot tub five feet apart cuz they are gay',
    tip: 'Apartado de un camino a la derecha, cerca de un trozo de papel',
    who: 'uWu',
    whoType: 'nick',
  },
  'special-1': {
    thumbnailPath: 'assets/photos/fa-album-12-thumb.png',
    path: 'assets/photos/fa-album-12.png',
    text: "(3/10): It's all of us cuddling with SUNNY's stuffed animals. He has so many, and they're all so soft! I wish I could just lay here forever.",
    who: 'Basil',
    tip: '',
  },
  'special-2': {
    thumbnailPath: 'assets/textures/doge-samurai-profile.png',
    path: 'assets/photos/doge-samurai-meme.png',
    text: 'Usado durante fases intermedias del desarrollo para probar ciertas funcionalidades... Buen doge 👍',
    who: 'Doge Samurai',
    tip: '',
  },
  'special-3': {
    // didn't expect to have many photos
    thumbnailPath: 'assets/photos/photo-iii-thumb.webp',
    path: 'assets/photos/photo-iii.webp',
    text: 'Volver de Alemania por unos días y cuando te dicen de decir algo en alemán recibir un "tu puta madre por si acaso". Las cosas buenas no cambian.',
    tip: '',
    who: 'ProtoJF',
    whoType: 'nick',
  },
}

export default photos
