import * as paths from './paths.js'

const host = process.env.HOST || '0.0.0.0'
const port = parseInt(process.env.PORT || '3000', 10)
const all = host === '0.0.0.0' || host === '::'

export default function webpackDevServerConfig() {
  return {
    client: {
      logging: 'none',
      overlay: true,
    },
    hot: true,
    host,
    allowedHosts: all ? 'all' : undefined,
    port,
    historyApiFallback: {
      disableDotRule: true,
      index: paths.publicPath,
    },
    static: {
      directory: paths.publicDirPath,
      publicPath: paths.publicPath,
      watch: false,
    },
    open:
    all
        ? `http://localhost:${port}${paths.publicPath}`
        : paths.publicPath,
  }
}
