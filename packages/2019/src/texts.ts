import anime from 'animejs'

import { IFireworks, FireworkEvents } from './fireworks.interfaces'
import { randomPosOnScreen, centerElementOn, wait } from './utils'

export abstract class TextAnimation {
  constructor(private fireworks: IFireworks) {}

  public abstract animate(): Promise<void>

  protected doAnimation(
    element: HTMLDivElement,
    duration: number = 1000,
    delay: number = 0,
    pos?: [number, number],
  ): Promise<void> {
    return new Promise((resolve) => {
      const [x, y] = pos ? pos : randomPosOnScreen(200, 200)
      centerElementOn(x, y, element, 0.1)
      this.fireworks.throwFirework(x, y).explode = () => {
        const tl = anime
          .timeline()
          .add({
            targets: element,
            opacity: 1,
            scale: [0.1, 1],
            delay,
            duration: duration * 0.6,
            easing: 'easeOutQuad',
            begin: () => (element.style.visibility = 'visible'),
          })
          .add({
            targets: element,
            scale: 1.3,
            easing: 'linear',
            duration,
          })
          .add({
            targets: element,
            opacity: 0,
            scale: 1.33,
            easing: 'easeOutQuad',
            duration: duration * 0.3,
            complete: () => (element.style.visibility = 'hidden'),
          })

        tl.complete = () => resolve()
      }
    })
  }
}

export class PreTextsAnimation extends TextAnimation {
  private textContainer1: HTMLDivElement
  private textContainer2: HTMLDivElement
  private textContainer3: HTMLDivElement
  private textContainer4: HTMLDivElement

  constructor(fireworks: IFireworks) {
    super(fireworks)
    this.textContainer1 = document.querySelector('.text-gone')
    this.textContainer2 = document.querySelector('.text-newcome')
    this.textContainer3 = document.querySelector('.text-extra')
    this.textContainer4 = document.querySelector('.text-click')
    this.checkExtras()
  }

  public async animate() {
    await this.doAnimation(this.textContainer1)
    await wait(anime.random(1000, 2000))
    await this.doAnimation(this.textContainer2)
    if (this.textContainer3.querySelector('p').textContent !== '') {
      await wait(anime.random(1000, 2000))
      await this.doAnimation(this.textContainer3)
    }
    await wait(anime.random(1000, 2000))
    await this.doAnimation(this.textContainer4)
  }

  private async checkExtras() {
    const [isRaul, isAndres, isCasa, isFrances, isCatala] = await Promise.all([
      this.isRaul(),
      this.isAndres(),
      this.isCasa(),
      this.isFrances(),
      this.isCatala(),
    ])

    if (isRaul) {
      this.addThird('Golf o)))')
    } else if (isAndres) {
      this.addThird('er tito t3ch')
    } else if (isCasa) {
      this.addThird('henlo :)')
    } else if (isFrances) {
      this.addThird('je suis une bagette')
    } else if (isCatala) {
      this.addThird('una bona ensaïmada me menjaria jo ara')
    }
  }

  private addThird(text: string) {
    this.textContainer3.querySelector('p').innerText = text
  }

  private __cry_my_ip__: string = null
  private async domainAndItselfIpMatches(domain: string): Promise<boolean> {
    const dnsPromise = fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
      headers: { Accept: 'application/dns-json' },
    }).then((res) => res.json())

    if (this.__cry_my_ip__ === null) {
      this.__cry_my_ip__ = '...'
      const [myip, dns] = await Promise.all([
        fetch('https://ipinfo.io/json')
          .then((res) => res.json())
          .catch(() => ({})),
        dnsPromise,
      ])

      this.__cry_my_ip__ = myip.ip
      return dns.Answer?.find((answer: any) => answer.data === myip.ip) !== undefined
    } else {
      const dns = await dnsPromise

      //This is the worst "workaround" (aka chapuza) of the 2018 year
      while (this.__cry_my_ip__ === '...') await wait(10)
      //Please don't tell your friends about this :(

      return dns.Answer?.find((answer: any) => answer.data === this.__cry_my_ip__) !== undefined
    }
  }

  private async isRaul(): Promise<boolean> {
    return this.domainAndItselfIpMatches('casita.raul.ga')
  }

  private async isAndres(): Promise<boolean> {
    return this.domainAndItselfIpMatches('nopunyir.amgxv.com')
  }

  private async isCasa(): Promise<boolean> {
    return this.domainAndItselfIpMatches('casita.melchor9000.me')
  }

  private async isFrances(): Promise<boolean> {
    return Promise.resolve(
      window.navigator.languages.find((lang) => lang.includes('fr')) !== undefined,
    )
  }

  private async isCatala(): Promise<boolean> {
    return Promise.resolve(
      window.navigator.languages.find((lang) => lang.includes('ca')) !== undefined,
    )
  }
}

export class HappyNewYearAnimation extends TextAnimation {
  private textContainers: Array<HTMLDivElement[]>

  constructor(fireworks: IFireworks, canvas: HTMLCanvasElement) {
    super(fireworks)
    this.textContainers = []
    for (let line of '¡Feliz año nuevo 2019!'.split(' ')) {
      const lineContainers = []
      for (let char of line) {
        const div = document.createElement('div')
        div.classList.add('anime')
        div.classList.add('text-y')
        div.style.fontSize = '3rem'
        div.innerText = char
        document.body.querySelector('.container').insertBefore(div, canvas)
        lineContainers.push(div)
      }
      this.textContainers.push(lineContainers)
    }
  }

  public async animate(): Promise<void> {
    const topPadding = 4
    const leftPadding = 8
    const linesHeights = this.textContainers.map((line) =>
      line.reduce((prev, char) => Math.max(prev, char.clientHeight), 0),
    )
    const linesHeight = linesHeights.reduce((prev, lineHeight) => prev + lineHeight + topPadding, 0)
    const linesWidths = this.textContainers.map((line) =>
      line.reduce((prev, char) => prev + char.clientWidth + leftPadding, 0),
    )
    const width = window.innerWidth
    const height = window.innerHeight

    const animationPromises: Array<Promise<void>> = []
    for (let y = 0; y < this.textContainers.length; y++) {
      const prevLines = linesHeights.slice(0, y)
      const h =
        (height - linesHeight) / 2 + prevLines.reduce((prev, curr) => prev + curr + topPadding, 0)
      for (let x = 0; x < this.textContainers[y].length; x++) {
        const prevChars = this.textContainers[y].slice(0, x)
        const w =
          (width - linesWidths[y]) / 2 +
          prevChars.reduce((prev, curr) => prev + curr.clientWidth + leftPadding, 0)

        animationPromises.push(
          this.doAnimation(this.textContainers[y][x], 3000, anime.random(0, 100), [w, h]),
        )
      }
    }

    anime
      .timeline()
      .add({
        targets: '.anime.end',
        opacity: 1,
        delay: 3500,
        duration: 1500,
        easing: 'easeInOutQuad',
        begin: (anim) => ((<any>anim.animatables[0]).target.style.visibility = 'visible'),
      })
      .add({
        targets: '.anime.end',
        opacity: 0,
        delay: 5000,
        duration: 5000,
        easing: 'easeInOutQuad',
        complete: (anim) => ((<any>anim.animatables[0]).target.style.visibility = 'hidden'),
      })

    await Promise.all(animationPromises)
  }
}
