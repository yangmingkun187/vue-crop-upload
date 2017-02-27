const webpack = require('webpack');

module.exports = {
  entry: './example/demo.js',
  output: {
    path: './example',
    filename: 'example.min.js',
  },
  resolve: {
    extensions: ['', '.js', '.vue']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  babel: {
      presets: ['es2015', 'stage-2'],
      plugins: ['transform-runtime']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin( {
      minimize: true,
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false
      }
    } )
  ]
}
