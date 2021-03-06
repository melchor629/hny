process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
const calculateGzipSize = require('gzip-size').sync
const configFactory = require('../config/webpack.config')
const paths = require('../config/paths')

const config = configFactory('production')

console.log('Cleaning build path...')
fs.emptyDirSync(paths.buildPath)
if (fs.existsSync(paths.publicDirPath)) {
  console.log('Copying public assets...')
  fs.copySync(paths.publicDirPath, paths.buildPath, {
    dereference: true,
  })
}

console.log('Creating production build...')
const compiler = webpack(config)
compiler.run((error, stats) => {
  let messages
  if (error) {
    if (!error.message) {
      console.error(chalk.red('Build failed:'))
      console.error(err.stack)
      process.exit(1)
    }

    let { message } = error

    // grab extra errors from postcss
    if (Object.prototype.hasOwnProperty.call(error, 'postcssNode')) {
      message += `\nCompileError: Begins at CSS Selector ${error.postcssNode.selector}`
    }

    messages = { errors: [{ message }], warnings: [] }
  } else {
    messages = stats.toJson({ all: false, warnings: true, errors: true })
  }

  if (messages.errors.length) {
    if (messages.errors.length > 1) {
      messages.errors.length = 1
    }

    console.error(chalk.red('\nBuild failed!\n'))
    console.error(messages.errors.map(formatMessage).join('\n\n'))
    process.exit(1)
  }

  if (
    process.env.CI &&
    (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') &&
    messages.warnings.length
  ) {
    console.log(
      chalk.yellow(
        'Treating warnings as errors because a CI is detected (node.process.CI = true).\n',
      ),
    )
    console.log(messages.warnings.map(formatMessage).join('\n\n'))
    process.exit(1)
  }

  if (messages.warnings.length) {
    console.log(chalk.yellow('Built with warnings.\n'))
    console.log(messages.warnings.map(formatMessage).join('\n\n'))
  } else {
    console.log(chalk.green('Built succesfully.\n'))
  }

  console.log(`  Files are located inside ${chalk.cyan(paths.buildPath)}`)
  console.log(`  Public URL is ${chalk.cyan(paths.publicPath)}\n`)
  stats
    .toJson({ all: false, assets: true })
    .assets.filter(({ name }) => /\.(js|css)/.test(name))
    .map((asset) => {
      const assetPath = path.join(paths.buildPath, asset.name)
      const assetContents = fs.readFileSync(assetPath)
      const { size } = fs.statSync(assetPath)
      const gzipSize = calculateGzipSize(assetContents)
      return {
        folder: path.dirname(assetPath),
        name: path.basename(assetPath),
        size,
        gzipSize,
      }
    })
    .sort((a, b) => b.size - a.size)
    .forEach((asset) => {
      const isMainBundle = asset.name.includes('main.')
      const isLarge = asset.size > (isMainBundle ? 1_500_000 : 900_000)
      const isGzipLarge = asset.gzipSize > (isMainBundle ? 500_000 : 200_000)
      const size = isLarge ? chalk.yellow(humanByteSize(asset.size)) : humanByteSize(asset.size)
      const gzipSize = isGzipLarge
        ? chalk.yellow(humanByteSize(asset.gzipSize))
        : humanByteSize(asset.gzipSize)
      console.log(
        `    ${chalk.dim(asset.folder + path.sep)}${chalk.cyan(asset.name)}  ${gzipSize} (${size})`,
      )
    })
  console.log()
})

function formatMessage({ file, moduleName, message }) {
  if (moduleName || file) {
    return `${chalk.underline(moduleName || file)}: ${message}`
  }

  return message
}

function humanByteSize(bytes) {
  if (bytes < 1000) {
    return `${bytes} B`
  }
  if (bytes < 1000_000) {
    return `${(bytes / 1000).toFixed(2)} KB`
  }
  if (bytes < 1000_000_000) {
    return `${(bytes / 1000_000).toFixed(2)} MB`
  }
}
