import { animated } from '@react-spring/web'
import { forwardRef } from 'react'
import { type AnimalKey, animals } from '../animals'
import styles from './animal-picture.module.css'

type AnimalPictureProps = Readonly<{
  animalKey: AnimalKey
  effectStyles: Record<string, any>
  nextAnimal: () => void
}>

const AnimalPicture = forwardRef<HTMLElement, AnimalPictureProps>(function AnimalPicture(
  { animalKey, effectStyles, nextAnimal },
  ref,
) {
  const animal = animals[animalKey]

  return (
    <animated.figure ref={ref} className={styles.figure} onClick={nextAnimal} style={effectStyles}>
      <picture>
        <source srcSet={`./imgs/${animal.imageName}.avif`} type="image/avif" />
        <img src={`./imgs/${animal.imageName}.webp`} alt={animalKey} />
      </picture>
      <figcaption>
        {animal.name} | 📷 {animal.photographer}
        {'location' in animal && animal.location && (
          <>
            {' | 🗺️ '}
            <a
              href={`https://www.google.com/maps/place/${animal.location.latitude}+${animal.location.longitude}`}
              target="_blank"
              rel="noopener"
              onClick={(e) => e.stopPropagation()}
            >
              {animal.location.name}
              {animal.location.subName && ` (${animal.location.subName})`}
            </a>
          </>
        )}
      </figcaption>
    </animated.figure>
  )
})

export default AnimalPicture
