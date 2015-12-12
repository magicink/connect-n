import webpack from 'webpack'

export default {
  entry: [
    './src/js/index.js',
    'file?name=index.html!jade!./src/jade/index.jade'
  ],
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}
