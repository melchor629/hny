const between = (min: number, value: number, max: number): number =>
  Math.max(min, Math.min(value, max))

export default class Color {
  private red: number
  private green: number
  private blue: number
  private alpha: number | undefined

  static rgb(r: number, g: number, b: number): Color {
    return new Color(r, g, b)
  }

  static rgba(r: number, g: number, b: number, a: number): Color {
    return new Color(r, g, b, a)
  }

  static hex(color: string): Color {
    if (color.startsWith('#')) {
      color = color.substr(1)
    }

    if (color.length === 3) {
      const hexRed = color.charAt(0)
      const hexGreen = color.charAt(1)
      const hexBlue = color.charAt(2)
      return new Color(
        Number(`0x${hexRed}`) / 255,
        Number(`0x${hexGreen}`) / 255,
        Number(`0x${hexBlue}`) / 255,
      )
    } else if (color.length === 6 || color.length === 8) {
      const hexRed = color.substr(0, 2)
      const hexGreen = color.substr(2, 2)
      const hexBlue = color.substr(4, 2)
      const hexAlpha = color.substr(6, 2)
      return new Color(
        Number(`0x${hexRed}`) / 255,
        Number(`0x${hexGreen}`) / 255,
        Number(`0x${hexBlue}`) / 255,
        hexAlpha ? Number(`0x${hexAlpha}`) / 255 : undefined,
      )
    }
  }

  constructor(r: number, g: number, b: number, a?: number) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  public get r(): number {
    return this.red
  }

  public set r(r: number) {
    this.red = between(0, r, 1)
  }

  public get g(): number {
    return this.green
  }

  public set g(g: number) {
    this.green = between(0, g, 1)
  }

  public get b(): number {
    return this.blue
  }

  public set b(b: number) {
    this.blue = between(0, b, 1)
  }

  public get a(): number | undefined {
    return this.alpha
  }

  public set a(a: number | undefined | null) {
    if (a === undefined || a === null || isNaN(a)) {
      this.alpha = undefined
    } else {
      this.alpha = between(0, a, 1)
    }
  }

  public add(o: Color): Color {
    const res = new Color(0, 0, 0, o.alpha)
    res.r = Math.max(0, Math.min(this.r + o.r, 1))
    res.g = Math.max(0, Math.min(this.g + o.g, 1))
    res.b = Math.max(0, Math.min(this.b + o.b, 1))
    if (o.a !== undefined) {
      if (this.a !== undefined) {
        res.a = Math.max(0, Math.min(this.a + o.a, 1))
      } else {
        res.a = Math.max(0, Math.min(1 + o.a, 1))
      }
    }
    return res
  }

  public toHex(): string {
    const red = Math.trunc(this.r * 255)
    const green = Math.trunc(this.g * 255)
    const blue = Math.trunc(this.b * 255)
    if (this.a !== undefined) {
      const alpha = Math.trunc(this.a * 255)
      return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}${alpha.toString(16)}`
    } else {
      return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
    }
  }
}
