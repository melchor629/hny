const fs = require('fs')
const path = require('path')

const projectPath = fs.realpathSync(process.cwd())
const resolveSrc = (relativePath) => path.resolve(projectPath, relativePath)

const packageJson = require(resolveSrc('package.json'))
const extensions = ['js', 'jsx', 'ts', 'tsx', 'json']
const useTypeScript = fs.existsSync(resolveSrc('tsconfig.json'))
const publicPath = (() => {
  let { homepage } = packageJson
  if (homepage) {
    homepage = homepage.endsWith('/') ? homepage : `${homepage}/`

    const validHomepagePathname = new URL(homepage, 'https://melchor9000.me').pathname
    if (process.env.NODE_ENV === 'development') {
      return homepage.startsWith('.') ? '/' : validHomepagePathname
    }

    return homepage.startsWith('.') ? homepage : validHomepagePathname
  }

  return '/'
})()
const indexPath = () => {
  const partialPath = resolveSrc('src/index')
  return (
    extensions.map((e) => `${partialPath}.${e}`).find((p) => fs.existsSync(p)) ||
    resolveSrc('src/index.js')
  )
}

module.exports = {
  extensions,
  useTypeScript,
  publicPath,
  indexPath,
  sourcePath: resolveSrc('src'),
  buildPath: resolveSrc('dist'),
  htmlPath: resolveSrc('src/index.html'),
  publicDirPath: resolveSrc('public'),
  nodeModules: resolveSrc('node_modules'),
  cachePath: resolveSrc('node_modules/.cache'),
  tsconfigPath: resolveSrc('tsconfig.json'),
}
