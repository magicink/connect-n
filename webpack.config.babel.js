import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

const sourcePath = path.resolve(__dirname, 'src')
const jsPath = `${sourcePath}/js`
const jadePath = `${sourcePath}/jade`
const sassPath = `${sourcePath}/scss`

export default {
  entry: [
    `${jsPath}/index.js`,
    `file-loader?name=app.css!sass-loader!${sassPath}/app.scss`
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    host: process.env.HOST,
    port: process.env.PORT
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        loader: 'pug-html-loader',
        test: /\.(pug|jade)$/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({inject: 'body', template: `${jadePath}/index.jade`})
  ],
  resolve: {
    extensions: ['.js']
  }
}
