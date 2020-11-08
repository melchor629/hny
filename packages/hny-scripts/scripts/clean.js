const chalk = require('chalk')
const fs = require('fs-extra')
const paths = require('../config/paths')

console.log(chalk.yellow('Cleaning build folder'))
fs.emptyDirSync(paths.buildPath)
fs.rmdir(paths.buildPath)

console.log(chalk.yellow('Cleaning cache folder'))
fs.emptyDirSync(paths.cachePath)
fs.rmdir(paths.cachePath)

console.log(chalk.green('Clean done'))
