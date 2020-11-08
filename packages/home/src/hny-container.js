import { debounce } from 'lodash-es'

const opacityClass = 'o-0'

/**
 * Starts event listeners for the container.
 * @param container {HTMLDivElement} container
 */
const init = (container) => {
  let disappearHandle = null

  const disappear = () => {
    container.classList.add(opacityClass)
    disappearHandle = null
  }

  const cancelDisappear = debounce(
    () => {
      clearTimeout(disappearHandle)
      container.classList.remove(opacityClass)
      disappearHandle = setTimeout(disappear, 15_000)
    },
    100,
    { leading: true },
  )

  document.addEventListener('mousemove', cancelDisappear, { passive: true })
  document.addEventListener('mousedown', cancelDisappear, { passive: true })
  document.addEventListener('touchstart', cancelDisappear, { passive: true })
  document.addEventListener('keydown', cancelDisappear, { passive: true })

  cancelDisappear()
}

export default init
