import { memo } from 'react'
import styles from './the-close-button.module.scss'

const TheCloseButton = ({ floating, onClick }) => (
  <div className={floating ? styles.floating : styles.docked}>
    <button type="button" className={styles.close} onClick={onClick}>
      &times;
    </button>
  </div>
)

export default memo(TheCloseButton)
