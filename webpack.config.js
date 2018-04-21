const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

module.exports = [
  {
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
  },
  {
    context: path.join(__dirname, 'src/javascripts'),
    entry: './src/javascripts/index.js',
    output: {
      path: path.join(__dirname, 'public/javascripts'),
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.vue$/, loader: 'vue'
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery'
      }),
      new webpack.optimize.UglifyJsPlugin(),
    ]
  }
];
