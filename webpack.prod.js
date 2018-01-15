const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const BabiliPlugin = require('babili-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const S3Plugin = require('webpack-s3-plugin')

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
    new BabiliPlugin(),
    new CompressionPlugin({
      test: /\.(js|css)$/,
			asset: '[path].gz[query]',
			algorithm: 'gzip',
      deleteOriginalAssets: true
    }),
    new S3Plugin({
      exclude: /.*\.(js|css)$/, // exclude non-gzipped js/css
      s3Options: {
        accessKeyId: require('./aws.json').accessKeyId,
        secretAccessKey: require('./aws.json').secretAccessKey,
        region: 'eu-west-1'
      },
      s3UploadOptions: {
        Bucket: 'iainandrew',
        CacheControl: 'max-age=315360000, no-transform, public',
        ContentEncoding(fileName) {
          if (/\.gz/.test(fileName)) {
            return 'gzip'
          }
        },
        ContentType(fileName) {
          if (/\.css/.test(fileName)) {
            return 'text/css'
          }
          if (/\.js/.test(fileName)) {
            return 'text/javascript'
          }
        },
      },
      basePath: 'dist',
      directory: 'public/dist'
    })
  ]
};
