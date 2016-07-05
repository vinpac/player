const webpack = require("webpack");
const config = require("./config")
const cssnano = require("cssnano")
const debug = require("debug")
const HtmlWebpackPlugin = require("html-webpack-plugin");

const log = debug("app:webpack:config")
const paths = config.paths

const __DEV__ = config.globals.__DEV__
const __TEST__ = config.globals.__TEST__
const __PROD__ = config.globals.__PROD__

const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    root: paths.client(),
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {},
  plugins: []
}

const APP_ENTRY_PATH = config.app_entry_path

webpackConfig.entry = {
  app: __DEV__
    ? [ 'webpack-dev-server/client?http://127.0.0.1:' + config.server_port,
        'webpack/hot/only-dev-server',
        APP_ENTRY_PATH
      ]
    : [APP_ENTRY_PATH]
}

webpackConfig.output = {
  filename: `[name].[${config.compiler_hash_type}].js`,
  path: paths.dist("static"),
  publicPath: config.compiler_public_path
}


// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new HtmlWebpackPlugin({
    template: paths.client('index.html'),
    hash: false,
    //favicon: paths.client('static/favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    }
  })
]

if (__DEV__) {
  log('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
}

webpackConfig.module.loaders = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    cacheDirectory: true,
    plugins: ['transform-runtime'],
    presets: ['es2015', 'react', 'stage-0'],
    env: {
      development: {
        plugins: [
          ['react-transform', {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module']
            }, {
              transform: 'react-transform-catch-errors',
              imports: ['react', 'redbox-react']
            }]
          }]
        ]
      },
      production: {
        plugins: [
          'transform-react-remove-prop-types',
          'transform-react-constant-elements'
        ]
      }
    }
  }
},
{
  test: /\.json$/,
  loader: 'json'
}]


// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

webpackConfig.module.loaders.push({
  test: /\.scss$/,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss',
    'sass?sourceMap'
  ]
})

webpackConfig.module.loaders.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?name=fonts/[name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?name=fonts/[name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/,    loader: 'url?name=img/[name].[ext]&limit=8192' }
)

webpackConfig.module.loaders.push({
  test: /\.css$/,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss'
  ]
})

// ------------------------------------
// Style Configuration
// ------------------------------------
webpackConfig.sassLoader = {
  includePaths: paths.client('styles')
}


webpackConfig.postcss = [
  cssnano({
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: true
  })
]

webpackConfig.devServer = {
  contentBase: './src/',
  historyApiFallback: true,
  hot: true,
  port: config.server_port,
  publicPath: config.compiler_public_path,
  noInfo: false
}

module.exports = webpackConfig
