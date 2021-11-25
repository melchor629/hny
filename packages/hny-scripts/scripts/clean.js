import chalk from 'chalk'
import fs from 'fs-extra'
import { buildPath, cachePath } from '../config/paths.js'

console.log(chalk.yellow('Cleaning build folder'))
fs.emptyDirSync(buildPath)
fs.rmdir(buildPath)

console.log(chalk.yellow('Cleaning cache folder'))
fs.emptyDirSync(cachePath)
fs.rmdir(cachePath)

console.log(chalk.green('Clean done'))
