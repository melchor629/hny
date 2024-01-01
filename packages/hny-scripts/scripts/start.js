import chalk from 'chalk'
import { createServer } from 'vite'
import config from '../config/vite.config.js'

const { red, bold, green, cyan } = chalk

console.log(cyan('  ➜ Preparing dev server...'))
/** @type {import('vite').ViteDevServer} */
let server
try {
  server = await createServer({
    ...config,
    configFile: false,
  })
} catch (e) {
  console.log(red('  ➜ Failed preparing dev server:'))
  console.log(e.message)
  console.log(e.stack)
  process.exit(1)
}

try {
  console.log(cyan('  ➜ Starting dev server...'))
  await server.listen()
} catch (e) {
  console.log(red('  ➜ Failed starting dev server:'))
  console.log(e.message)
  console.log(e.stack)
  process.exit(1)
}

console.log(green('  ➜ Server ready'))
console.log(`  ${green('➜')} ${bold('You can access using:')}`)
server.printUrls()
server.bindCLIShortcuts({ print: false })

process.addListener('SIGTERM', () => server.close())
process.addListener('SIGINT', () => server.close())
