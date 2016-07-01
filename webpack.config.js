
var webpack = require('webpack');
require('es6-promise').polyfill();

module.exports = {

  entry: './example/index.js',

  output: {
    path: './dist',
    filename: 'virtual-element.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ]

};
