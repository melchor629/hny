import snow from './snow'
import hnyContainer from './hny-container'

const fromYear = 2018
const now = new Date()
const years = [...Array(now.getFullYear() - fromYear + 1)].map((_, i) => fromYear + i)

const month = now.getMonth() + 1
if (import.meta.env.PROD && month === 1 && now.getDate() <= 6) {
  const year = now.getFullYear() + (month === 1 ? 0 : 1)
  const res = await fetch(`/${year}/`, { method: 'HEAD' })
  if (res.ok) {
    window.location.assign(`/${year}/`)
  }
}

const yearsListElement = document.getElementById('years-list')
for (const year of years) {
  const linkElement = document.createElement('a')
  linkElement.href = `/${year}/`
  linkElement.target = '_blank'
  linkElement.text = year.toString()
  linkElement.classList.add(
    'inline-block',
    'py-2',
    'px-4',
    'rounded-lg',
    'no-underline',
    'text-white',
    'bg-green-800',
    'hover:bg-green-700',
    'transition-colors',
  )

  const liElement = document.createElement('li')
  liElement.classList.add('leading-normal', 'mb-2')
  liElement.appendChild(linkElement)

  yearsListElement.appendChild(liElement)
}

snow(document.body.querySelector('#canvas-container'))
hnyContainer(document.body.querySelector('#hny-container'))
