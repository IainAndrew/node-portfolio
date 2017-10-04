const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const BabiliPlugin = require('babili-webpack-plugin')

module.exports = {
  entry: {
    main: './public/src/js/main.js'
  },
  output: {
    filename: './public/dist/js/[name].min.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      // exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['env']
      }
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true
          }
        }, {
          loader: 'postcss-loader'
        }, {
          loader: 'sass-loader'
        }]
      })
    }]
  },
  resolve: {
    alias: {
      jquery: 'jquery/src/jquery'
    }
  },
  plugins: [
    new ExtractTextPlugin('public/dist/css/style.css'),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer
        ]
      }
    }),
    new BabiliPlugin()
  ]
};
