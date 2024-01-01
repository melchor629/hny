import { realpathSync, existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export const projectPath = realpathSync(process.cwd())
const resolveSrc = (relativePath) => resolve(projectPath, relativePath)

export const packageJson = JSON.parse(
  readFileSync(resolveSrc('package.json'), { encoding: 'utf-8' }),
)
export const useTypeScript = existsSync(resolveSrc('tsconfig.json'))
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
export const buildPath = resolveSrc('dist')
export const cachePath = resolveSrc('node_modules/.vite')
