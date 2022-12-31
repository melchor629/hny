interface ThanksAppleDocument extends Document {
  readonly webkitFullscreenEnabled: boolean
  readonly webkitFullscreenElement: Element | null
  webkitExitFullscreen(): Promise<void>
}

interface ThanksAppleHTMLElement extends HTMLElement {
  webkitRequestFullscreen(options?: FullscreenOptions): Promise<void>
}

const document: ThanksAppleDocument = window.document as any

const handleFullscreen = (element?: HTMLElement) => {
  if ((document.webkitFullscreenElement ?? document.fullscreenElement) == null) {
    const el: ThanksAppleHTMLElement = (element ?? document.body) as any
    return (
      (el.requestFullscreen ?? el.webkitRequestFullscreen).call(el, { navigationUI: 'hide' }) ??
      Promise.resolve()
    )
  } else {
    return (
      (document.exitFullscreen ?? document.webkitExitFullscreen).call(document) ?? Promise.resolve()
    )
  }
}

Object.defineProperty(handleFullscreen, 'isEnabled', {
  enumerable: true,
  get() {
    return document.fullscreenEnabled ?? document.webkitFullscreenEnabled
  },
})

export default handleFullscreen as ((element?: HTMLElement) => Promise<void>) & {
  readonly isEnabled: boolean
}
