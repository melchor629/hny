import { useMemo } from 'react'
import styles from './dialog-hud.module.scss'

const pictures: Record<string, { borderColor: string; src: string }> = {
  player: {
    borderColor: '#301364',
    src: 'assets/textures/pj-profile.png',
  },
  dev: {
    borderColor: '#075C8D',
    src: 'assets/textures/developer.png',
  },
  stranger: {
    borderColor: 'black',
    src: 'assets/textures/whothis.png',
  },
  dogeSamurai: {
    borderColor: '#F9E8A9',
    src: 'assets/textures/doge-samurai-profile.png',
  },
  tomeu: {
    borderColor: '#f1d2b3',
    src: 'assets/textures/tomeu-quely-profile.webp',
  },
  marina: {
    borderColor: '#f866e4',
    src: 'assets/textures/marina-profile.png',
  },
  marisa: {
    borderColor: '#87e3d9',
    src: 'assets/textures/marisa-profile.png',
  },
  chris: {
    borderColor: '#dcab54',
    src: 'assets/textures/chris-profile.png',
  },
  napGuy1: {
    borderColor: '#6e511f',
    src: 'assets/textures/nap-guy-1-profile.png',
  },
  napGuy2: {
    borderColor: '#878a81',
    src: 'assets/textures/nap-guy-2-profile.png',
  },
  ['code-panel']: {
    borderColor: '#D7D675',
    src: 'assets/textures/code-panel-profile.png',
  },
}

export default function DialogPicture({ who }: { who: string }) {
  const picture = useMemo(() => pictures[who], [who])

  if (picture) {
    return (
      <div className={styles.npc}>
        <img src={picture.src} alt={who} style={{ borderColor: picture.borderColor }} />
      </div>
    )
  }

  return <div className={styles.npc}>{who}</div>
}
