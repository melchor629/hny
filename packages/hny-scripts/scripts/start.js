process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const configFactory = require('../config/webpack.config')
const paths = require('../config/paths')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const config = configFactory('development')
const port = parseInt(process.env.PORT, 10) || 3000
const host = process.env.HOST || '0.0.0.0'

let compiler
try {
  compiler = webpack(config)
} catch (e) {
  console.log(chalk.red('Failed to compile.\n'))
  console.log(e.message)
  console.log(e.stack)
  process.exit(1)
}

let tsMessagesPromise
let tsMessagesResolver
compiler.hooks.invalid.tap('invalid', () => {
  clearConsole()
  console.log('Compiling...')
})

if (paths.useTypeScript) {
  compiler.hooks.beforeCompile.tap('beforeCompile', () => {
    tsMessagesPromise = new Promise((resolve) => {
      tsMessagesResolver = (msgs) => resolve(msgs)
    })
  })

  ForkTsCheckerWebpackPlugin.getCompilerHooks(compiler).receive.tap(
    'afterTypeScriptCheck',
    (diagnostics, lints) => {
      const allMessages = [...diagnostics, ...lints]
      const format = (message) => {
        const color = message.severity === 'warning' ? chalk.yellow : chalk.red
        const color2 = chalk.bold.cyan
        return {
          message: [
            chalk.underline(message.file)`${color.bold(message.severity)} in ${color2(
              `${message.file}(${message.line},${message.column})`,
            )}`,
            `${message.message} (${color.underline(`TS${message.code}`)})`,
          ].join('\n'),
          moduleName: message.file,
        }
      }
      tsMessagesResolver({
        errors: allMessages.filter(({ severity }) => severity === 'error').map(format),
        warnings: allMessages.filter(({ severity }) => severity === 'warning').map(format),
      })
    },
  )
}

compiler.hooks.done.tap('done', async (stats) => {
  clearConsole()

  const statsData = stats.toJson({
    all: false,
    warnings: true,
    errors: true,
  })

  if (paths.useTypeScript && !statsData.errors.length) {
    const tsCheckHandle = setTimeout(
      () => console.log(chalk.yellow('Compilation done, waiting for TS results...')),
      100,
    )

    const messages = await tsMessagesPromise
    clearTimeout(tsCheckHandle)
    statsData.errors.push(...messages.errors)
    statsData.warnings.push(...messages.warnings)

    clearConsole()
  }

  if (!messages.errors.length && !messages.warnings.length) {
    console.log(chalk.green('Compilation done successfully!'))
  } else if (messages.errors.length) {
    if (messages.errors.length > 1) {
      messages.errors.length = 1
    }

    console.log(chalk.red('Failed to compile!'))
    console.error(messages.errors.map(formatMessage).join('\n\n'))
  } else {
    console.log(chalk.yellow('Compiled with warnings!'))
    console.error(messages.warnings.map(formatMessage).join('\n\n'))
  }
})

const devServer = new WebpackDevServer(compiler, require('../config/webpackDevServer.config')())
devServer.listen(port, host, (err) => {
  if (err) {
    return console.log(err)
  }
  clearConsole()

  console.log(chalk.cyan('Starting the development server...'))
})
;[('SIGINT', 'SIGTERM')].forEach((sig) =>
  process.on(sig, () => {
    devServer.close(() => process.exit())
  }),
)

function clearConsole() {
  if (process.stdout.isTTY) {
    process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H')
  }
}

function formatMessage({ moduleName, message }) {
  if (moduleName) {
    return `${chalk.underline(moduleName)}: ${message}`
  }

  return message
}
