const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [{
  context: path.join(__dirname, 'src/stylesheets'),
  entry: {
    style: './style.scss'
  },
  output: {
    path: path.join(__dirname, 'public/stylesheets'),
    filename: '[name].css'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{loader: 'css-loader', options: {url: false}}, 'sass-loader'],
        })
      },
    ]
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('style.css'),
  ]
}];
