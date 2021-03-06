import snow from './snow'
import hnyContainer from './hny-container'
import 'tachyons'
import './home.css'

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
    linkElement.classList.add(
      'dib',
      'pv2',
      'ph4',
      'br3',
      'no-underline',
      'white',
      'bg-dark-green',
      'dim',
    )

    const liElement = document.createElement('li')
    liElement.classList.add('lh-copy', 'mb2')
    liElement.appendChild(linkElement)

    yearsListElement.appendChild(liElement)
  }

  snow(document.body.querySelector('#canvas-container'))
  hnyContainer(document.body.querySelector('#hny-container'))
})()
