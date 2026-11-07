import oxlintConfig from '@melchor629/oxfmt-config'
import { defineConfig } from 'oxfmt'

export default defineConfig({
  ...oxlintConfig,
  ignorePatterns: ['packages/2023/src/data/spritesheets/**'],
})
