var config = require("./webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
config.entry.main.unshift("webpack-dev-server/client?http://localhost:8080/");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
	contentBase:'build/',
	publicPath: "/assets/"
});
server.listen(8080);