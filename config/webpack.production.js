// 客户端代码打包 production
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const LessPluginFunctions = require('less-plugin-functions');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = webpackMerge(baseConfig, {
  mode: 'production',
  output: {
    publicPath: './',
    path: path.join(__dirname, '../dist'),
    filename: '[name]-[hash].js',
  },
  entry: {
    main: path.resolve(__dirname, '../src/index.js'),
  },
  module: {
    rules: [
      {
        test: /\.(png|woff|woff2|svg|eot|jpg)($|\?)/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'images/png',
              name: 'images/[name].[hash:7].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: false,
            },
          },
          'postcss-loader',
        ],
      },
      {
          test: /\.(scss|sass)$/,
          use: [
              'style-loader',
              {
                  loader: 'css-loader',
                  options: {
                      minimize: true,
                      sourceMap: false
                  }
              },
              'postcss-loader',
              'sass-loader'
          ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              sourceMap: false,
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              plugins: [
                new LessPluginFunctions(),
              ],
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    moduleIds: 'hashed',
    // 压缩js、css
    minimizer: [],
    // 清除无用的代码
    usedExports: true,
    // 抽离公用的js部分 , 配置自动提取node_modules里用到的模块如jquery
    splitChunks: {
      cacheGroups: {
        main: {
          name: 'common',
          test: /\.js$/,
          chunks: 'all', // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(['dist'],{
      root: path.resolve(__dirname, '..')
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      minify: true,
      // favicon: './src/App/static/image/logo.jpg',
      filename: "./index.html",
      hash: true,
      contentHash: true,
      cache: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
});

module.exports = config;
