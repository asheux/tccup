const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common.config.js')
const path = require('./paths')

module.exports = merge(common(), {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 9001,
    hot: true,
    static: path.build,
    historyApiFallback: true,
  },
  output: {
    pathinfo: false,
  },
  optimization: {
    runtimeChunk: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    minimize: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.TCCUP_DEPLOY_ENVIRONMENT': JSON.stringify('development'),
    }),
    new ReactRefreshPlugin(),
    new webpack.ProgressPlugin({
      entries: true,
      activeModules: false,
      modules: true,
      profile: false,
      dependencies: true
    }),
  ],
})
