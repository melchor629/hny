export interface FireworkEvents {
  explode?: () => void
}

export interface IFireworks {
  startListening(): void
  destroy(): void
  throwFirework(x: number, y: number): FireworkEvents
}
