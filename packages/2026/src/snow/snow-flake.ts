const threesixty = 2 * Math.PI

export default class SnowFlake {
  #x: number
  #y: number
  readonly #radius: number
  readonly #speed: number
  readonly #omega: number

  constructor(x: number, y: number, radius: number, speed: number, omega: number) {
    this.#x = x
    this.#y = y
    this.#radius = radius
    this.#speed = speed
    this.#omega = omega
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.#x, this.#y, this.#radius, 0, threesixty)
    ctx.fill()
  }

  update(wind: number, width: number, height: number) {
    this.#y += this.#speed * window.devicePixelRatio
    this.#x += wind * window.devicePixelRatio
    this.#x += Math.cos((this.#y * this.#omega) / this.#speed) * 0.5
    return this.#y > height || this.#x > width + 100
  }
}
