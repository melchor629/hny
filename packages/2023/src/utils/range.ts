export default function* range(from: number, to: number, step = 1) {
  for (let num = from; num <= to; num += step) {
    yield num
  }
}
