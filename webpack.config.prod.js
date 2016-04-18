var path = require('path') // eslint-disable-line no-var
var webpack = require('webpack') // eslint-disable-line no-var

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    // export itself to a global var
    libraryTarget: 'commonjs2',
    // name of the global var: "Foo"
    library: 'redux-swarmlog',
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  resolve: {
    modulesDirectories: [
      path.join(__dirname, 'src'),
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
