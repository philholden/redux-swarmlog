var path = require('path') // eslint-disable-line no-var
//var ExtractTextPlugin = require('extract-text-webpack-plugin') // eslint-disable-line no-var

module.exports = {
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'lib'),
    publicPath: '/lib/'
  },
//  plugins: [
//    new ExtractTextPlugin(path.parse(process.argv[2]).name + '.css')
//  ],
  module: {
    loaders: [
      {
        test: /\.png$/,
        loaders: [ 'url-loader?limit=7000' ]
      }
    ]
  }
}
