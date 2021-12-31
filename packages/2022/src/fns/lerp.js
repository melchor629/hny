/**
 * Linear Interpolation for numbers
 * @param {Number} from Value from start
 * @param {Number} to Value for end
 * @param {Number} t Time (value from 0 to 1)
 */
const lerp = (from, to, t) => from + (to - from) * t

export default lerp
