const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Battleship',
    }),
  ],
  output: {
    filename: './index.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module : {
    rules: [
        {
            test: /\.jsx?$/,
            exclude: ['/node_modules'],
            use: ['babel-loader'],
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
        },
    ],
  },
};