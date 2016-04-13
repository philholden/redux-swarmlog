'use strict'

let path = require('path')
let webpack = require('webpack')

console.log(__dirname)

module.exports = {
  node: {
    fs: 'empty'
  },

  entry:{
    bundle: [
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client',
      './examples/src/index'
    ],
    publish: [
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client',
      './examples/src/publish'
    ],
    consume: [
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client',
      './examples/src/consume'
    ]


  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    modulesDirectories: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'examples', 'src'),
      'node_modules',
      'node_modules/component-archetype/node_modules'
    ]
  },
  module: {
    postLoaders: [
      {
        loader: 'transform?brfs'
      }
    ],
    loaders: [
      {
        test: /\.jsx?/,
        loader: require.resolve('babel-loader'),
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'examples', 'src')
        ]
      },
      {
        test: /\.png$/,
        loader: require.resolve('url-loader') + '?limit=100000'
      },
      {
        test: /\.json$/,
        loader: require.resolve('json-loader')
      },
      // {
      //   test: /\.js$/,
      //   loader: 'transform?brfs'
      // }

    ]
  }
}
