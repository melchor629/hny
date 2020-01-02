import snow from './snow'

import 'tachyons'
import 'core-js/stable'

const fromYear = 2018
const now = new Date()
const years = [...Array(now.getFullYear() - fromYear + 1)].map((_, i) => fromYear + i)

;(async () => {
  if (
    process.env.NODE_ENV === 'production' &&
    ((now.getMonth() === 0 && now.getDate() <= 6) || (now.getMonth() === 11 && now.getDate() >= 30))
  ) {
    const year = now.getFullYear() + (now.getMonth() === 0 ? 0 : 1)
    const res = await fetch(`/${year}/`, { method: 'HEAD' })
    if (res.ok) {
      window.location.assign(`/${year}/`)
    }
  }

  const yearsListElement = document.getElementById('years-list')
  for (let year of years) {
    const linkElement = document.createElement('a')
    linkElement.href = `/${year}/`
    linkElement.target = '_blank'
    linkElement.text = year.toString()
    linkElement.classList.add('blue', 'dim')

    const liElement = document.createElement('li')
    liElement.classList.add(
      'lh-copy',
      'pv3',
      'ph4',
      'ba',
      'bl-0',
      'bt-0',
      'br-0',
      'b--dotted',
      'b--white-30',
    )
    liElement.appendChild(linkElement)

    yearsListElement.appendChild(liElement)

    snow(document.body.querySelector('#canvas-container'))
  }
})()
