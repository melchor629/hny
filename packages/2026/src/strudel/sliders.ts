import { ref } from '@strudel/web'
import { create } from 'zustand'

type SliderStore = {
  sliders: Array<
    Readonly<{
      id: `slider_${number}`
      value: number
      min: number
      max: number
      step: number
    }>
  >

  getRef(id: `slider_${number}`): unknown
  getSlider(id: `slider_${number}`): SliderStore['sliders'][0] | null
  addSlider(id: `slider_${number}`, value: number, min?: number, max?: number, step?: number): void
  setSliderValue(id: `slider_${number}`, value: number): void
}

const useSliderStore = create<SliderStore>()((set, get) => ({
  sliders: [],

  getRef: (id) => ref(() => get().getSlider(id)?.value ?? 0),
  getSlider: (id) => {
    const { sliders } = get()
    return sliders.find((slider) => slider.id === id) ?? null
  },
  addSlider: (id, value, min = 0, max = 1, step = 0.1) => {
    set(({ sliders }) => {
      const idx = sliders.findIndex((slider) => slider.id === id)
      if (idx !== -1) return {}
      return {
        sliders: [
          ...sliders,
          {
            id,
            value,
            min,
            max,
            step,
          },
        ],
      }
    })
  },
  setSliderValue: (id, value) => {
    set(({ sliders }) => {
      const idx = sliders.findIndex((slider) => slider.id === id)
      if (idx === -1) return {}
      return {
        sliders: [
          ...sliders.slice(0, idx),
          {
            ...sliders[idx],
            value: Math.min(sliders[idx].max, Math.max(value, sliders[idx].min)),
          },
          ...sliders.slice(idx + 1),
        ],
      }
    })
  },
}))

// @ts-expect-error global fn implementation
window.sliderWithID = (id: `slider_${number}`, value: number, min = 0, max = 1, step = 0.05) => {
  useSliderStore.getState().addSlider(id, value, min, max, step)
  return useSliderStore.getState().getRef(id)
}

export default useSliderStore
