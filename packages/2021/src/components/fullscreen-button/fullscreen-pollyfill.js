// thanks apple for doing the things right... Several years with the fullscreen API implemented
// on Safari, yet it is still prefixed...
// This pollyfill is weird and dreadful, but at least code in the react component is not a mess...

if (!('fullscreenElement' in document)) {
  Object.defineProperty(document, 'fullscreenElement', {
    get: () => document.webkitFullscreenElement,
  })
}

if (!('fullscreenEnabled' in document)) {
  Object.defineProperty(document, 'fullscreenEnabled', {
    get: () => document.webkitFullscreenEnabled,
  })
}

if (!('exitFullscreen' in document)) {
  const exitFullscreen = () => {
    document.webkitExitFullscreen()
    return Promise.resolve()
  }
  Object.defineProperty(document, 'exitFullscreen', {
    get: () => exitFullscreen,
  })
}

if (!('requestFullscreen' in Element.prototype)) {
  Element.prototype.requestFullscreen = function () {
    Element.prototype.webkitRequestFullscreen.apply(this, arguments)
    return Promise.resolve()
  }
}

let _fullscreenChangeEventName = 'fullscreenchange'
if ('onwebkitfullscreenchange' in document.body && !('onfullscreenchange' in document.body)) {
  _fullscreenChangeEventName = 'webkitfullscreenchange'
}

export default _fullscreenChangeEventName
