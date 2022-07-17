import webpack from 'webpack'
import TerserPlugin from 'terser-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

import PostcssPresetEnv from 'postcss-preset-env'
import PostcssNormalize from 'postcss-normalize'

import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import * as paths from './paths.js'

const require = createRequire(import.meta.url)

export default function webpackConfig(webpackEnv) {
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
    NODE_ENV: webpackEnv,
  }

  const getStyleLoaders = (cssOptions = {}, preProcessor) => {
    const loaders = [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          esModule: true,
          publicPath: 'auto',
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
            plugins: [
              PostcssPresetEnv({
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              }),
              PostcssNormalize(),
            ],
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
    target: ['browserslist'],
    mode: prodDevValue('production', 'development'),
    bail: isProductionEnv,
    devtool: prodDevValue('source-map', 'cheap-module-source-map'),
    performance: false,
    stats: false,
    entry: paths.indexPath,
    cache: {
      type: 'filesystem',
      store: 'pack',
      buildDependencies: {
        defaultWebpack: ['webpack/lib/'],
        config: [fileURLToPath(import.meta.url)],
      },
    },
    infrastructureLogging: prodDevValue(undefined, { level: 'none' }),
    experiments: {
      backCompat: false,
    },
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
          parallel: true,
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
          parallel: true,
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
      modules: [
        `${import.meta.url.slice(0, -25)}/node_modules`.slice(7),
        paths.nodeModules,
        'node_modules',
      ],
    },
    module: {
      strictExportPresence: true,
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
              loader: require.resolve('swc-loader'),
              options: {
                jsc: {
                  externalHelpers: true,
                  parser: paths.useTypeScript
                    ? {
                        syntax: 'typescript',
                        tsx: paths.useReact,
                      }
                    : {
                        syntax: 'ecmascript',
                        jsx: paths.useReact,
                      },
                  transform: {
                    react: {
                      runtime: 'automatic',
                      useBuiltins: true,
                      refresh: isDevelopmentEnv,
                    },
                  },
                },
                env: {
                  // browserslist is not read automatically
                  targets:
                    paths.packageJson.browserslist?.[
                      isProductionEnv ? 'production' : 'development'
                    ] ||
                    paths.packageJson.browserslist?.default ||
                    paths.packageJson.browserslist,
                  mode: 'entry',
                  coreJs: 3,
                  dynamicImport: true,
                  exclude: ['transform-typeof-symbol'],
                },
                module: {
                  type: 'es6',
                },

                cacheDirectory: true,
                cacheCompression: false,
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
              exclude: /\.(js|jsx|mjs|ts|tsx|html|json)$/,
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
      new webpack.DefinePlugin(
        Object.fromEntries(
          Object.entries(env).map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)]),
        ),
      ),
      // HMR for development
      isDevelopmentEnv && new webpack.HotModuleReplacementPlugin(),
      // Fast Refresh for React
      isDevelopmentEnv && paths.useReact && new ReactRefreshWebpackPlugin({ overlay: false }),
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
