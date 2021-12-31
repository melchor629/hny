import { clamp } from 'lodash-es'

/**
 * Converts temperature (black body) to RGBA colour.
 * Adapted from https://github.com/m-lima/temperagb/blob/master/src/lib.rs
 * which is an implementation of https://tannerhelland.com/2012/09/18/convert-temperature-rgb-algorithm-code.html
 * @param {Number} temp Temperature in Kelvin
 */
const temperatureToColour = (temp) => {
  const temperature = clamp(temp, 40000.0, 1000.0) / 100.0
  const r =
    temperature <= 66.0
      ? 255
      : Math.floor(329.698727446 * Math.pow(temperature - 60.0, -0.1332047592))
  const g =
    temperature <= 66.0
      ? Math.floor(99.4708025861 * Math.log(temperature) - 161.1195681661)
      : Math.floor(288.1221695283 * Math.pow(temperature - 60.0, -0.0755148492))
  const b = (() => {
    if (temperature >= 66.0) {
      return 255
    } else if (temperature <= 19.0) {
      return 0
    } else {
      return Math.floor(138.5177312231 * Math.log(temperature - 10.0) - 305.0447927307)
    }
  })()

  return { r, g, b, a: 1.0 }
}

export default temperatureToColour
