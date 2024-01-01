import chalk from 'chalk'
import { emptyDirSync } from 'fs-extra/esm'
import { rmdirSync } from 'node:fs'
import { buildPath, cachePath } from '../config/paths.js'

console.log(chalk.yellow('Cleaning build folder'))
emptyDirSync(buildPath)
rmdirSync(buildPath)

console.log(chalk.yellow('Cleaning cache folder'))
emptyDirSync(cachePath)
rmdirSync(cachePath)

console.log(chalk.green('Clean done'))
