import SnowFlake from './snow-flake'

const rnd = (min: number, max: number) => min + Math.random() * (max - min)

export default class SnowFall {
  #flakes: SnowFlake[] = []
  #maxRadius = 2.5
  #wind = 0.4
  #color = '#eee'
  #minSpeed = 0.25
  #maxSpeed = 0.5
  #canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement, flakes = 5000) {
    this.#canvas = canvas
    for (let i = 0; i < flakes; i++) {
      this.#flakes[i] = this.#makeflake(true)
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
    ctx.fillStyle = this.#color
    ctx.strokeStyle = this.#color
    for (const flake of this.#flakes) {
      flake.draw(ctx)
    }
  }

  update() {
    const snowFlakesToRemove = this.#flakes.filter((snowFlake) =>
      snowFlake.update(this.#wind, this.#canvas.width, this.#canvas.height),
    )
    this.#flakes = this.#flakes.map((snowFlake) =>
      snowFlakesToRemove.includes(snowFlake) ? this.#makeflake(false) : snowFlake,
    )
  }

  #makeflake(initial: boolean) {
    const windRange = (this.#wind * this.#canvas.height) / this.#minSpeed
    const r = rnd(1, this.#maxRadius) * window.devicePixelRatio
    return new SnowFlake(
      rnd(
        Math.min(0, -windRange) - 10,
        Math.max(this.#canvas.width, this.#canvas.width - windRange) + 10,
      ),
      rnd(-this.#canvas.height * 0.25, this.#canvas.height * (initial ? 0.75 : 0)),
      r,
      this.#maxRadius > 1
        ? this.#minSpeed +
          ((this.#maxSpeed - this.#minSpeed) * (r - 1)) /
            (this.#maxRadius * window.devicePixelRatio - 1)
        : rnd(this.#minSpeed, this.#maxSpeed),
      rnd(0.01, 0.09),
    )
  }
}
