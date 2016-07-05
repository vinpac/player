const webpack = require("webpack");
const config = require("../config");
const debug = require("debug");
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require("../webpack.config");
const open = require('open');

const log = debug('app:bin:server')
const port = config.server_port

new WebpackDevServer(webpack(webpackConfig), webpackConfig.devServer)
.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err);
  }
  log('Listening at localhost:' + port);
  open('http://localhost:' + port);
});
