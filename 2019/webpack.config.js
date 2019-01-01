const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProd ? "production" : "development",

    entry: {
        app: "./src/index.ts",
    },
    output: {
        filename: isProd ? "[name].js" : "[name].debug.js",
        path: __dirname + "/dist",
        crossOriginLoading: 'anonymous', //https://w3c.github.io/webappsec-subresource-integrity/#cross-origin-data-leakage
    },

    // Configure development server
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        open: true,
        overlay: true,
        //progress: true,
        quiet: true,
        stats: 'errors-only',
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: isProd ? undefined : "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".css", ".scss", '.png'],

        alias: {
            src: path.resolve('./src'),
        },
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            // SCSS styles
            {
                test: /.scss$/,
                use: [
                    { loader: isProd ? MiniCssExtractPlugin.loader : "style-loader" },
                    { loader: "css-loader", options: { sourceMap: true } },
                    { loader: "sass-loader", options: { sourceMap: true } },
                ]
            },

            // Images
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            }
        ]
    },

    // Optimization
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            }
        },
        minimizer: isProd ? [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ] : []
    },

    // Plugins added to webpack
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new HtmlWebpackPlugin({
            title: 'FAN-2019',
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            },
            minify: true,
            template: 'src/index.html',
        }),
        new SriPlugin({
            hashFuncNames: ['sha256', 'sha384'],
            enabled: isProd,
        }),
    ],
};