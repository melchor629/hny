import { memo } from 'react'
import styles from './the-track.module.scss'

const TheTrack = ({ trackInfo }) =>
  !trackInfo ? (
    <div className={styles['track-container']}>
      <p className={styles.text1}>Cargando canción...</p>
    </div>
  ) : (
    <a
      href={trackInfo.external_urls.spotify}
      target="_blank"
      rel="noreferrer"
      className={styles['track-container']}
    >
      <img src={trackInfo.album.images[1].url} alt={trackInfo.album.name} />
      <p className={styles.text1}>{trackInfo.name}</p>
      <p className={styles.text2}>{trackInfo.artists.map((artist) => artist.name).join(', ')}</p>
      <p className={styles.text3}>{trackInfo.album.name}</p>
    </a>
  )

export default memo(TheTrack)
