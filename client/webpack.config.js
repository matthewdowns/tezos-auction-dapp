const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');
const { resolve } = require('path');

module.exports = (env, argv) => {
    const mode = env['NODE_ENV'];
    const isProd = mode === 'production';

    return {
        mode,
        target: 'web',
        entry: resolve(__dirname, './src/index.tsx'),
        output: {
            filename: isProd ? '[name].[chunkhash].js' : '[name].js',
            path: resolve(__dirname, './dist'),
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/i,
                    exclude: [/node_modules/],
                    use: {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: isProd ? {
                                declaration: false,
                                declarationMap: false,
                                sourceMap: false,
                                removeComments: true,
                                emitDecoratorMetadata: false
                            } : undefined
                        }
                    }
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin({ path: resolve(__dirname, './dist') }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: resolve(__dirname, './public'), to: resolve(__dirname, './dist') }
                ]
            }),
            new NodePolyfillWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: resolve(__dirname, './src/index.ejs')
            }),
            new DefinePlugin({
                TEZOS_RPC: JSON.stringify(isProd ? 'https://mainnet-tezos.giganode.io' : 'https://testnet-tezos.giganode.io'),
                TEZOS_CONTRACT_ADDRESS: JSON.stringify('tz1dxqeeYyPq32XSQyX2Mb2X6VxSQnfNz4DF'),
                TEZOS_SIGNER_KEY: JSON.stringify('')
            })
        ],
        resolve: {
            extensions: ['.js', '.json', '.ts', '.tsx']
        },
        optimization: {
            minimize: isProd,
            minimizer: [
                new TerserWebpackPlugin()
            ]
        },
        devtool: 'source-map',
        devServer: {
            historyApiFallback: true,
            port: 3000,
            publicPath: '/'
        }
    };
}