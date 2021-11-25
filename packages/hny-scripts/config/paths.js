import { realpathSync, existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const projectPath = realpathSync(process.cwd())
const resolveSrc = (relativePath) => resolve(projectPath, relativePath)

const packageJson = JSON.parse(readFileSync(resolveSrc('package.json'), { encoding: 'utf-8' }))
export const extensions = ['js', 'jsx', 'ts', 'tsx', 'json']
export const useTypeScript = existsSync(resolveSrc('tsconfig.json'))
export const useReact = Object.keys(packageJson.dependencies).includes('react')
export const publicPath = (() => {
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
export const indexPath = (() => {
  const partialPath = resolveSrc('src/index')
  return (
    extensions.map((e) => `${partialPath}.${e}`).find((p) => existsSync(p)) ||
    resolveSrc('src/index.js')
  )
})()
export const sourcePath = resolveSrc('src')
export const buildPath = resolveSrc('dist')
export const htmlPath = resolveSrc('src/index.html')
export const publicDirPath = resolveSrc('public')
export const nodeModules = resolveSrc('node_modules')
export const cachePath = resolveSrc('node_modules/.cache')
export const tsconfigPath = resolveSrc('tsconfig.json')
