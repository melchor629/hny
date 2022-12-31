import type { OnMapUpdateCallback } from '../objects/map'

export type Scenarios = 'academia-room' | 'dungeon' | 'test'

export interface ScenarioProps {
  onMapUpdate: OnMapUpdateCallback
}
