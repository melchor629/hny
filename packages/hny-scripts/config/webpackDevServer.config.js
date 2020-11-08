const paths = require('./paths')

const host = process.env.HOST || '0.0.0.0'

module.exports = function webpackDevServerConfig() {
  return {
    compress: true,
    client: {
      logging: 'none',
    },
    // clientLogLevel: 'none',
    // contentBase: paths.publicDirPath,
    // contentBasePublicPath: paths.publicPath,
    // watchContentBase: true,
    hot: true,
    transportMode: 'ws',
    // publicPath: paths.publicPath.slice(0, -1),
    // quiet: true,
    host,
    overlay: true,
    historyApiFallback: {
      disableDotRule: true,
      index: paths.publicPath,
    },
    static: {
      directory: paths.publicDirPath,
      publicPath: paths.publicPath,
      watch: true,
    },
    public: `localhost:${process.env.PORT || '3000'}`,
    open: true,
  }
}
