#!/usr/bin/env node
const { spawnSync } = require('child_process')

const args = process.argv.slice(2)
const scripts = ['build', 'start', 'clean', 'lint']
const script = args.find((x) => scripts.includes(x))

if (script) {
  const extraArgs = args.slice(args.indexOf(script))
  const result = spawnSync(
    process.execPath,
    [require.resolve(`../scripts/${script}`), ...extraArgs],
    {
      stdio: 'inherit',
    },
  )
  if (result.signal) {
    process.exit(1)
  }

  process.exit(result.status)
} else {
  console.log(`Supported scripts: ${scripts.join(', ')}`)
  process.exit(1)
}
