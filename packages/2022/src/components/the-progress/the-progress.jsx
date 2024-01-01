import { Html, useProgress } from '@react-three/drei'
import styles from './the-progress.module.scss'

const TheProgress = () => {
  const { progress, item, loaded, total } = useProgress()
  return (
    <Html fullscreen>
      <div className={styles.container}>
        <h1>Cargando...</h1>
        <div>
          {Math.trunc(progress)}%&nbsp;
          <small>
            ({loaded} de {total})
          </small>
        </div>
        <div className={styles['object-load-info']}>
          <pre>{item}</pre>
        </div>
      </div>
    </Html>
  )
}

export default TheProgress
