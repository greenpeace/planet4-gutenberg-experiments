const defaultConfig = require("./node_modules/@wordpress/scripts/config/webpack.config");    // Require default Webpack config

module.exports = {
	...defaultConfig,
	entry: {
    editorIndex: './react-blocks/src/editorIndex.js',
    frontendIndex: './react-blocks/src/frontendIndex.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/react-blocks/build'
  }
};
