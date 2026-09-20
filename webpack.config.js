const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    index: path.resolve(__dirname, 'src/index.js'), 
    catalog: path.resolve(__dirname, 'src/catalog.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', 
    clean: true,
    //assetModuleFilename: 'assets/images/[name][ext]',
  },
  devServer: {
    static: path.resolve(__dirname, 'src'),
    port: 2000,
    open: true,
    hot: true,
    liveReload: true,
    client: {
      overlay: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['index'], 
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/catalog.html'),
      filename: 'catalog.html',
      chunks: ['catalog'], 
    }),
    /*palgin to copy resurses*/
    
    new CopyWebpackPlugin({
      patterns: [
        {from: 'src/assets', to: 'assets'}, 
      ],
    }),
    
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
        type: 'javascript/auto'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(scss|sass)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'], 
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', 
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/inline', 
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.css', '.scss'], 
  },
};