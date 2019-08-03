// @flow
/* eslint sort-imports: ["error", {"ignoreCase": true}] */
/* eslint sort-keys: "error" */
import path from 'path'
import TerserWebpackPlugin from 'terser-webpack-plugin'

export default {
  entry: {
    main: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      path.resolve(__dirname, 'src', 'js', 'index.js')
    ]
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader'
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'sass-loader'
      }]
    }]
  },
  optimization: {
    minimizer: [new TerserWebpackPlugin()],
    occurrenceOrder: true
  },
  output: {
    filename: '[name].js'
  }
}