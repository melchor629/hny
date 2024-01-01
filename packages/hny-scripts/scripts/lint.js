import anymatch from 'anymatch'
import chalk from 'chalk'
import klaw from 'klaw'
import { readFile, writeFile } from 'node:fs/promises'
import { sep } from 'node:path'
import prettier from 'prettier'

try {
  const path = process.cwd() + sep
  const formatMode = process.argv.includes('--format')
  const prettierConfig = await prettier.resolveConfig(path, { editorconfig: true })
  let hasInvalid = false

  const ignoredPaths = await readFile(`${path}${sep}.prettierignore`, { encoding: 'utf-8' })
    .then((t) => t.split('\n').filter((v) => !!v))
    .catch(() => [])
  const ignoredPathsMatcher = anymatch(ignoredPaths)

  console.log(formatMode ? `Formatting files inside ${path}src` : `Checking format for ${path}src`)
  for await (const file of klaw('src')) {
    if (!file.stats.isFile()) continue
    if (ignoredPathsMatcher(file.path.replace(path, ''))) continue

    const { ignored, inferredParser } = await prettier.getFileInfo(file.path)
    if (ignored || !inferredParser) continue

    const contents = await readFile(file.path, { encoding: 'utf-8' })
    if (formatMode) {
      const start = +new Date()
      process.stdout.write(file.path.replace(path, ''))
      const formatted = prettier.format(contents, { ...prettierConfig, parser: inferredParser })
      await writeFile(file.path, formatted, { encoding: 'utf-8' })
      process.stdout.write(` ${+new Date() - start}ms\n`)
    } else if (!prettier.check(contents, { ...prettierConfig, parser: inferredParser })) {
      console.warn(chalk.yellow(file.path.replace(path, '')))
      hasInvalid = true
    }
  }

  if (!formatMode) {
    if (hasInvalid) {
      console.warn(chalk.yellow('Code style issues found in the above file(s).'))
      process.exit(1)
    } else {
      console.log(chalk.green('All matched files use Prettier code style!'))
    }
  }
} catch (e) {
  console.error()
  console.error(e)
  process.exit(1)
}
