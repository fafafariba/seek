var path = require('path');


module.exports = {
  entry: "./lib/entry.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  module: {
   loaders: [
     {
       test: [/\.jsx?$/],
       exclude: /(node_modules)/,
       loader: 'babel-loader',
       query: {
         presets: ['es2015']
       }
     }
   ]
 },
 resolve: {
   extensions: ['*', '.js']
 },
  devtool: 'source-map',
};
