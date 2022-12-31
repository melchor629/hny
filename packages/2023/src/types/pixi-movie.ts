interface Position {
  x: number
  y: number
}

interface Size {
  w: number
  h: number
}

type Frame = Position & Size

export interface PixiMovie {
  frames: Record<string, PixiMovieFrame>
  meta: {
    image: string
    size: Size
  }
}

export interface PixiMovieFrame {
  frame: Frame
  rotated: boolean
  trimmed: boolean
  spriteSourceSize: Frame
  sourceSize: Size
}
