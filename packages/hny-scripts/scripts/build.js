import chalk from 'chalk'
import { build } from 'vite'
import config from '../config/vite.config.js'

const { red, green, cyan } = chalk

try {
  console.log(cyan('  ➜ Building...'))
  await build({
    ...config,
    configFile: false,
  })

  console.log(green('  ➜ Built succesfully.'))
  console.log(`  ➜  Public URL is ${cyan(config.base)}`)
  console.log(`  ➜  Files are located inside ${cyan(config.build.outDir)}`)
} catch (e) {
  console.error(red('\nBuild failed!\n'))
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}
