const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map': undefined ;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlBundlerWebpackPlugin = require("html-bundler-webpack-plugin");

const PugPlugin = require('pug-plugin')

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
      port: 3000,
      open: true,
    },

   
    output: {
      clean: true, // cleaning 'dist'
      },
    plugins: [
      new PugPlugin({
        entry: { // adding html-files in 'dist'
          index: './src/pages/start/start.pug',
          colorsAndType: './src/pages/colors-and-type/colors-and-type.pug',
          formElements: './src/pages/form-elements/form-elements.pug',
        }, 
        js: {
          // JS output filename
            filename: 'js/[name].[contenthash:8].js',
         // }
        },
        css: {
            // CSS output filename
            filename: 'css/[name].[contenthash:8].css',
            
          }
        
      })
    ],
    module: {
      rules: [
        {
          test: /\.(s?css|sass)$/,
          use: ['css-loader','sass-loader'],
        },
        {
          test: /\.(ico|png|jp?g|webp|svg)$/,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name].[hash:8][ext][query]',
          },
        },
        {
          test: /\.pug$/,
          loader: PugPlugin.loader,
          options: {
            pretty: devMode,
            },
        },
        {
          test: /\.html$/i,
          loader: 'html-loader'
        },
        {
          test: /\.woff2?$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[ext]'
          }
        }
      ],
    }
}