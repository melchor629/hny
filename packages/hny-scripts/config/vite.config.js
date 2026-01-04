import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import * as paths from './paths.js'

const host = process.env.HOST || '0.0.0.0'
const port = parseInt(process.env.PORT || '3000', 10)
const hasTailwind =
  'tailwindcss' in paths.packageJson.dependencies ||
  'tailwindcss' in paths.packageJson.devDependencies
const hasReact = 'react' in paths.packageJson.dependencies

export default defineConfig({
  plugins: [
    ...(hasReact ? [react()] : []),
    ...(paths.useTypeScript ? [checker({ typescript: true })] : []),
    ...('tailwindcss' in paths.packageJson.dependencies ||
    'tailwindcss' in paths.packageJson.devDependencies
      ? [tailwind()]
      : []),
  ],
  root: paths.projectPath,
  base: paths.publicPath,
  build: {
    emptyOutDir: true,
    assetsDir: 'static',
    outDir: paths.buildPath,
  },
  server: {
    host,
    port,
    strictPort: true,
  },
})
