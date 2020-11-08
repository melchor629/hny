import { camelCase } from 'lodash-es'
import { Audio, AudioLoader } from 'three'

const audios = [
  'anvil-smash',
  'brush-train',
  'funky-shuffle',
  'matchbox-beat',
  'minimal-disco',
  'space',
]

const types = [
  {
    ext: 'webm',
    contentType: 'audio/webm; codecs=opus',
    channels: 2,
    bitrate: 128000,
    samplerate: 48000,
  },
  {
    ext: 'ogg',
    contentType: 'audio/ogg; codecs=vorbis',
    channels: 2,
    bitrate: 112000,
    samplerate: 44100,
  },
  {
    ext: 'm4a',
    contentType: 'audio/mp4; codecs=mp4a.40.1',
    channels: 2,
    bitrate: 128000,
    samplerate: 48000,
  },
  { ext: 'wav', contentType: 'audio/wave', channels: 2, samplerate: 96000 },
]

const getAudioExts = async () => {
  // Safari has a weird implementation, to avoid it, this condition must be used
  if (
    navigator.mediaCapabilities &&
    navigator.mediaCapabilities.encodingInfo &&
    navigator.mediaCapabilities.decodingInfo
  ) {
    return (
      await Promise.all(
        types
          .map((t) => ({ type: 'file', audio: t }))
          .map((t) => navigator.mediaCapabilities.decodingInfo(t).then((r) => [t, r])),
      )
    )
      .filter(([, r]) => r.supported)
      .map(([t]) => t.audio)
  }

  const audio = document.createElement('audio')
  return types.filter((t) => audio.canPlayType(t.contentType))
}

const loadSounds = async ({ listener, audioObjects }) => {
  const exts = await getAudioExts()
  const ext = exts[0].ext
  const loader = new AudioLoader()

  const loadAudio = (name) =>
    new Promise((resolve, reject) => loader.load(`snd/${name}.${ext}`, resolve, undefined, reject))

  await Promise.all(
    audios.map(async (audioName) => {
      const buffer = await loadAudio(audioName)
      const audio = new Audio(listener)
      audio.setBuffer(buffer)
      audio.setLoop(true)
      audio.setVolume(1)
      audioObjects.set(camelCase(audioName), audio)
    }),
  )
}

export default loadSounds
