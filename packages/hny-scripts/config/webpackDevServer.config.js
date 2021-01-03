const paths = require('./paths')

const host = process.env.HOST || '0.0.0.0'

module.exports = function webpackDevServerConfig() {
  return {
    compress: true,
    client: {
      logging: 'none',
    },
    hot: true,
    transportMode: 'ws',
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
    public: `localhost:${process.env.PORT || '3000'}${paths.publicPath.replace(/\/$/, '')}`,
    open: true,
  }
}
