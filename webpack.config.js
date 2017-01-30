var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
  entry:['babel-polyfill',APP_DIR + '/index.js'],
  output: {
    path: BUILD_DIR,
    filename: './src/bundle.js'
  },	
  devServer: {
      inline: true,
      port: 9900,
       historyApiFallback: true
   },
  module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
				
            query: {
               presets: ['es2015', 'react'],
               plugins: ["transform-es2015-destructuring","transform-object-rest-spread"]
            }
         }
      ]
   }
};


module.exports = config;
