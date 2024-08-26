const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')
const dotenv = require('dotenv');
const path = require('./paths')

const PUBLIC_PATH = {
  dev: 'https://questlist-dev.blr1.digitaloceanspaces.com',
  staging: 'https://questlist-staging.blr1.digitaloceanspaces.com',
  prod: 'https://questlist-prod.blr1.digitaloceanspaces.com'
};

module.exports = () => {
  const env = dotenv.config().parsed;
  const isDev = process.env.TCCUP_DEPLOY_ENVIRONMENT === 'development';

  
  return {
    entry: {
      index: path.entry,
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.build,
      clean: true,
      publicPath: '/',
    },
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      minimize: true,
      minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: -20,
            minChunks: 2,
            reuseExistingChunk: true
          },
        },
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'On pic me',
        template: path.template,
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      }),
      new CopyWebpackPlugin({
        patterns: [{
          from: path.assets,
          to: path.build,
        }],
      }),
      new webpack.DefinePlugin({
        'process.env.TCCUP_BASE_URL': JSON.stringify(process.env.TCCUP_BASE_URL),
        'process.env.TCCUP_DEPLOY_ENVIRONMENT': JSON.stringify(process.env.TCCUP_DEPLOY_ENVIRONMENT),
        'process.env.GOOGLE_MAP_API_KEY': JSON.stringify(process.env.GOOGLE_MAP_API_KEY),
        'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.html$/i,
          use: ['html-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|pdf|txt)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(csv|tsv)$/i,
          use: ['csv-loader'],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /.([cm]?js|jsx)$/,
          include: path.src,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /.([cm]?ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [
        '.tsx',
        '.ts',
        '.js',
        '.jsx',
        '.css',
        '.scss',
        '.wasm',
        '.json',
      ],
      alias: {
        src: path.src,
        components: path.components,
        actions: path.actions,
        assets: path.assets,
      },
    },
  }
}
