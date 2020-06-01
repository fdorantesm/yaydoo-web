const helpers = require('./helpers')
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

let config = {
  entry: {
    'main': helpers.root('/src/main.ts')
  },
  output: {
    path: helpers.root('/dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.html'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'tslint-loader'
    },
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'awesome-typescript-loader'
    },
    {
      test: /\.html$/,
      loader: 'raw-loader',
      exclude: [helpers.root('./src/index.html')]
    }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: './assets'
    }]),
  ]
}

module.exports = config
