const clsx = (...args: Array<string | boolean | null | undefined>): string =>
  args.filter((a) => typeof a === 'string').join(' ')

export default clsx
