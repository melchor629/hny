/**
 * Cubic In/Out easing
 * @param {Number} percentage Time/Percentage from 0 to 1
 */
const cubicInOut = (percentage) =>
  percentage < 0.5 ? 2.0 * percentage ** 2 : 1.0 - (-2.0 * percentage + 2.0) ** 2 / 2.0

export default cubicInOut
