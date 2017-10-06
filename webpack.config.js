const webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  resolve: {
    alias: {
      jquery: "jquery/src/jquery"
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
}
