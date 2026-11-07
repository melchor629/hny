import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'
import chalk from 'chalk'

try {
  const path = process.cwd()
  const projectRootPath = resolve(path, '..', '..')
  const formatMode = process.argv.includes('--format')

  const result = spawnSync('npx', ['oxfmt', formatMode ? '--write' : '--check', path], {
    cwd: projectRootPath,
    stdio: ['ignore', 'inherit', 'inherit'],
  })

  if (!formatMode) {
    if (result.status !== 0) {
      console.warn(chalk.yellow('Code style issues found in the above file(s).'))
      process.exit(1)
    } else {
      console.log(chalk.green('All matched files use oxfmt code style!'))
    }
  }
} catch (e) {
  console.error()
  console.error(e)
  process.exit(1)
}
