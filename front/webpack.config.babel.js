import webpack from 'webpack';
import path from 'path';
import glob from 'glob';

const DEBUG = !process.argv.includes('--release'),
      entry = {},
      setFile = (file) => {
        const fileName = file.replace("./src", "./").replace("//","/"),
              keyName = file.replace(/.\/src/, ".") //ディレクトリのパスを消して
                                .replace(/\.(js|js.jsx)$/, "") //拡張子を消して
                                //.replace(new RegExp(/_./, "g"), str => str.charAt(1).toUpperCase()); //キャメルをスネークに変更
        return { key: keyName, file: fileName };
      };

glob.sync("./src/**/*.?(js|jsx)")
    .map(file => setFile(file))
    .filter(file=>!file.key.match(/\/parts\//))
    .forEach(e => Object.assign(entry, { [e.key] : [e.file] }));

export default {
  cache: DEBUG,

  context: `${__dirname}/src`,

  entry: entry,

  output: {
    path: '../assets/javascripts/',
    filename: '[name].bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.js.jsx'],
    root: [
      `${__dirname}/node_modules`,
      path.resolve('./src')
    ]
  },

  devtool: DEBUG ? 'inline-source-map' : 'hidden-source-map',

  module: {
    loaders: [
      { test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': DEBUG ? JSON.stringify('development') : JSON.stringify('production')
      }
    })
  ]
};
