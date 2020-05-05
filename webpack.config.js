const path = require('path');
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader', 'css-loader'],
      // },
      // {
      //   // Exposes jQuery for use outside Webpack build
      //   test: require.resolve('jquery'),
      //   use: [{
      //     loader: 'expose-loader',
      //     options: 'jQuery'
      //   },{
      //     loader: 'expose-loader',
      //     options: '$'
      //   }]
      // }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js', '.tsx' ]
  },
  output: {
    filename: 'cart.js',
    path: path.resolve(__dirname, 'dist')
  },
   plugins: [
  //   new HtmlWebpackPlugin({
  //       template: './index.html',
  //       minify: {
  //         collapseWhitespace: true,
  //         minifyJS:true,
  //         minifyCSS:true,
  //         removeComments:true,
  //         removeEmptyAttributes:true,
  //         quoteCharacter:'"'
  //     }
  //   }),
  //    // Provides jQuery for other JS bundled with Webpack
  //  new webpack.ProvidePlugin({
  //     $: "jquery",
  //     jQuery: "jquery"
  //   })
]
};