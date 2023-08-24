const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: 'static/js/[name].js',
    path: path.join(__dirname, '../dist'),
    clean: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        },
      },
      {
        test: /.(css|sass|scss)$/,
        use: ['style-loader','css-loader', 'sass-loader']
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts','.sass','.scss'],
    alias: {
      '@': path.join(__dirname, '../src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true,
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    })
  ]
}
