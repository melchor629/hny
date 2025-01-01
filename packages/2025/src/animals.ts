type AnimalPicture = Readonly<{
  imageName: string
  name: string
  photographer: string
  location?: Readonly<{
    latitude: `${number}.${number}`
    longitude: `${number}.${number}`
    name: string
    subName?: string
  }>
}>

export type AnimalKey = keyof typeof animals

const animals = Object.freeze({
  gatoNoBiches: Object.freeze({
    imageName: 'photo_2024-12-31_11-08-53',
    name: 'No bitches?',
    photographer: 'Ruben',
  }),
  gatoMolestadoPorRobot: Object.freeze({
    imageName: 'gatojarai',
    name: 'Molestado por la roomba',
    photographer: 'Robot',
  }),
  perroDurmiendoEnCama: Object.freeze({
    imageName: 'PXL_20240325_084400816',
    name: 'Durmiendo en la cama',
    photographer: 'Samu',
  }),
  gatoChillEnDeià: Object.freeze({
    imageName: 'IMG_9340',
    name: 'Chilling in da street',
    photographer: 'Melchor',
    location: Object.freeze({
      latitude: '39.7486481666667',
      longitude: '2.64663041666667',
      name: 'Deià',
      subName: 'Illes Balears',
    }),
  }),
  pato: Object.freeze({
    imageName: 'photo_2024-12-31_23-36-38',
    name: '🦆',
    photographer: 'Aida',
  }),
  gatoGamer: Object.freeze({
    imageName: 'photo_2024-12-31_11-07-57',
    name: 'Gamer cat',
    photographer: 'Ruben',
  }),
  perroAngular: Object.freeze({
    imageName: 'photo_2024-12-31_23-36-45',
    name: 'Angular',
    photographer: 'Aida',
  }),
  gatoObservandoLaCalle: Object.freeze({
    imageName: 'IMG_20240629_205630',
    name: 'Observando la calle',
    photographer: 'Melchor',
  }),
  perroChillDeCojones: Object.freeze({
    imageName: 'photo_2024-12-31_11-08-06',
    name: 'Perro chill de cojones',
    photographer: 'Ruben',
  }),
  gatoDescansandoEncimaDeUnCoche: Object.freeze({
    imageName: 'IMG_20240310_102813',
    name: 'Chilling en el coche',
    photographer: 'Melchor',
    location: Object.freeze({
      latitude: '36.722014',
      longitude: '4.485991',
      name: 'El Cónsul, Málaga',
      subName: 'Andalucía',
    }),
  }),
  perroAngular2: Object.freeze({
    imageName: 'photo_2024-12-31_23-36-51',
    name: 'Angular',
    photographer: 'Aida',
  }),
  gatoTriste: Object.freeze({
    imageName: 'photo_2024-12-31_11-07-45',
    name: 'sadcat',
    photographer: 'Ruben',
  }),
  gatoMirandoteEntreLasPlantas: Object.freeze({
    imageName: 'IMG_20240302_110232',
    name: 'Observador oculto',
    photographer: 'Melchor',
    location: Object.freeze({
      latitude: '36.722203',
      longitude: '4.468270972222222',
      name: 'Colonia Santa Inés, Málaga',
      subName: 'Andalucía',
    }),
  }),
  perroPreguntando: Object.freeze({
    imageName: 'IMG_20240219_185337',
    name: '¿Qué haces?',
    photographer: 'Samu',
  }),
  gatoDeChillEnElBaño: Object.freeze({
    imageName: 'photo_2024-12-31_11-07-50',
    name: 'Gato chill',
    photographer: 'Ruben',
  }),
  perroPaseo2: Object.freeze({
    imageName: 'IMG_20241206_100652',
    name: 'De paseo',
    photographer: 'Samu',
  }),
  gatoDeChillEnLaTerraza: Object.freeze({
    imageName: 'photo_2024-12-31_11-09-23',
    name: 'Gato chill y calentito',
    photographer: 'Jose pato',
  }),
  perroDescansandoEnElSuelo: Object.freeze({
    imageName: 'IMG_20240125_213711',
    name: 'Cansado de servir',
    photographer: 'Melchor',
    location: Object.freeze({
      latitude: '36.722735972222225',
      longitude: '-4.419153972222222',
      name: 'Centro, Málaga',
      subName: 'Andalucía',
    }),
  }),
  gatosAmor: Object.freeze({
    imageName: 'photo_2024-12-31_11-07-29',
    name: 'Amor gatuno',
    photographer: 'Ruben',
  }),
  perroTomandoElSol: Object.freeze({
    imageName: 'IMG_8035',
    name: 'Perro tomando el sol',
    photographer: 'Melchor',
    location: Object.freeze({
      latitude: '36.7926134666667',
      longitude: '-3.89699261666667',
      name: 'Frigiliana',
      subName: 'Andalucía',
    }),
  }),
  gatoMirandote: Object.freeze({
    imageName: 'photo_2024-12-31_11-09-26',
    name: '¿Que miras?',
    photographer: 'Jose pato',
  }),
  perroPaseo: Object.freeze({
    imageName: 'IMG_20240504_140812',
    name: 'Explorando el campo',
    photographer: 'Samu',
  }),
  cabra: Object.freeze({
    imageName: 'IMG_0812',
    name: 'Cabra',
    photographer: 'Melchor',
    location: Object.freeze({
      latitude: '39.6181442',
      longitude: '2.645989',
      name: 'En un lloc de Carretera Valldemossa',
      subName: 'Illes Balears',
    }),
  }),
  perroZorro: Object.freeze({
    imageName: '20240529_095225',
    name: '¿Zorro?',
    photographer: 'Raul',
  }),
  gatoMirandoAlgo: Object.freeze({
    imageName: 'photo_2024-12-31_11-09-21',
    name: '¿Pájaro?',
    photographer: 'Jose pato',
  }),
  perroTiradoEnElSueloMirándote: Object.freeze({
    imageName: 'IMG_20221021_094507',
    name: 'Te está pidiendo mimos',
    photographer: 'Melchor',
  }),
  gatoCazadoRompioCosas: Object.freeze({
    imageName: 'photo_2024-12-31_11-07-37',
    name: 'En la escena del crímen',
    photographer: 'Ruben',
  }),
  perroFeliz: Object.freeze({
    imageName: 'IMG_0722',
    name: 'Felicidad',
    photographer: 'Raul',
  }),
} satisfies Record<string, AnimalPicture>)

const animalKeys = Object.freeze(Object.keys(animals) as AnimalKey[])

export { animals, animalKeys }
