const paths = require('./paths')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = function webpackConfig(webpackEnv) {
  const isDevelopmentEnv = webpackEnv === 'development'
  const isProductionEnv = webpackEnv === 'production'
  const prodDevValue = (prodValue, devValue) => {
    if (isProductionEnv) {
      return prodValue
    }
    if (isDevelopmentEnv) {
      return devValue
    }
  }

  const env = {
    PUBLIC_URL: paths.publicPath,
  }

  const getStyleLoaders = (cssOptions = {}, preProcessor) => {
    const loaders = [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          esModule: true,
          publicPath: paths.publicPath.startsWith('.') ? '../../' : undefined,
        },
      },
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: preProcessor ? 3 : 1,
          sourceMap: true,
          ...cssOptions,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            ident: 'postcss',
            map: { inline: false },
            plugins: () =>
              [
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
                require('postcss-normalize')(),
              ].filter(Boolean),
          },
          sourceMap: true,
        },
      },
    ]

    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: true,
            root: paths.sourcePath,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        },
      )
    }

    return loaders
  }

  return {
    mode: prodDevValue('production', 'development'),
    bail: isProductionEnv,
    devtool: prodDevValue('source-map', 'cheap-module-source-map'),
    performance: false,
    entry: paths.indexPath,
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    },
    infrastructureLogging: prodDevValue(undefined, { level: 'none' }),
    output: {
      path: isProductionEnv ? paths.buildPath : undefined,
      pathinfo: isDevelopmentEnv,
      filename: prodDevValue('static/js/[name].[contenthash:8].js', 'static/js/[name].js'),
      chunkFilename: prodDevValue(
        'static/js/[name].[contenthash:8].chunk.js',
        'static/js/[name].chunk.js',
      ),
      assetModuleFilename: 'static/assets/[name].[hash:8].[ext]',
      publicPath: paths.publicPath,
      globalObject: 'this',
    },
    optimization: {
      minimize: isProductionEnv,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: { ecma: 8 },
            compress: {
              ecma: 5,
              warnings: false,
            },
            output: {
              ecma: 5,
              comments: false,
            },
          },
        }),
        new CssMinimizerPlugin({
          sourceMap: true,
          minimizerOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: {
        name: ({ name }) => `runtime-${name}`,
      },
    },
    resolve: {
      extensions: paths.extensions
        .filter((e) => paths.useTypeScript || !e.includes('ts'))
        .map((e) => `.${e}`),
      // first load modules from our package then load modules from the package using this script
      modules: ['node_modules', paths.nodeModules],
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.glsl$/,
              // this is equivalent to use `raw-loader`, but managed by webpack itself
              // see https://webpack.js.org/guides/asset-modules/
              type: 'asset/source',
            },
            {
              test: /\.(js|jsx|ts|tsx)$/,
              include: paths.sourcePath,
              loader: require.resolve('babel-loader'),
              options: {
                presets: [
                  [
                    require('@babel/preset-env').default,
                    {
                      useBuiltIns: 'entry',
                      corejs: 3,
                      modules: false,
                      loose: false,
                      exclude: ['transform-typeof-symbol'],
                    },
                  ],
                  paths.useTypeScript && [
                    require('@babel/preset-typescript').default,
                    {
                      onlyRemoveTypeImports: true,
                    },
                  ],
                ].filter(Boolean),
                plugins: [
                  [
                    require('@babel/plugin-proposal-class-properties').default,
                    { loose: isProductionEnv },
                  ],
                  require('@babel/plugin-proposal-optional-chaining').default,
                  require('@babel/plugin-proposal-nullish-coalescing-operator').default,
                  isProductionEnv && [
                    require('@babel/plugin-proposal-object-rest-spread').default,
                    { useBuiltIns: true },
                  ],
                  isProductionEnv && [
                    require('@babel/plugin-transform-runtime').default,
                    {
                      corejs: false,
                      helpers: true,
                      regenerator: true,
                      useESModules: true,
                    },
                  ],
                ].filter(Boolean),
                babelrc: false,
                configFile: false,
                cacheDirectory: true,
                cacheCompression: false,
                compact: isProductionEnv,
              },
            },
            {
              test: /\.css$/,
              exclude: /\.module\.css$/,
              use: getStyleLoaders(),
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
            {
              test: /\.module\.css$/,
              use: getStyleLoaders({
                modules: {},
              }),
            },
            {
              test: /\.s[ca]ss$/,
              exclude: /\.module\.s[ca]ss$/,
              use: getStyleLoaders({}, 'sass-loader'),
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
            {
              test: /\.module\.s[ca]ss$/,
              use: getStyleLoaders(
                {
                  modules: {},
                },
                'sass-loader',
              ),
            },
            {
              exclude: /\.(js|jsx|ts|tsx|html|json)$/,
              // this is equivalent to use `url-loader`, but managed by webpack itself:
              // so if the file is small enough, it will be stored in the URL, if not, a file will
              // be emitted and the URL will point to the file.
              // see https://webpack.js.org/guides/asset-modules/
              type: 'asset',
            },
          ],
        },
      ],
    },
    plugins: [
      // generates an index.html with everything filled properly
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.htmlPath,
          },
          isProductionEnv
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined,
        ),
      ),
      // defines some variable environments in JS
      new webpack.DefinePlugin(env),
      // HMR for development
      isDevelopmentEnv && new webpack.HotModuleReplacementPlugin(),
      // extracts processed css into files
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      // ignore moment.js locales
      new webpack.IgnorePlugin({ resourceRegExp: /$\.\/locale$/, contextRegExp: /moment$/ }),
      // check TS code in background
      paths.useTypeScript &&
        new ForkTsCheckerWebpackPlugin({
          typescript: {
            configFile: paths.tsconfigPath,
            diagnosticOptions: {
              semantic: true,
              syntactic: true,
            },
          },
          async: isDevelopmentEnv,
        }),
    ].filter(Boolean),
  }
}
