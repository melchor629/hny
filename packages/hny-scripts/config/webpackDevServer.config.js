const paths = require('./paths')

const host = process.env.HOST || '0.0.0.0'
const port = parseInt(process.env.PORT || '3000', 10)

module.exports = function webpackDevServerConfig() {
  return {
    client: {
      logging: 'none',
      overlay: true,
    },
    hot: true,
    host,
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
      host === '0.0.0.0' || host === '::'
        ? `http://localhost:${port}${paths.publicPath}`
        : paths.publicPath,
  }
}
