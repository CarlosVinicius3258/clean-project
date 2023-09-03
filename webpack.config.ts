const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  devtool: 'source-map',
  devServer: {
    static: './dist',
    port: 8080,
  },
  module: {
    rules: [
      {
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader',],
  exclude: /node_modules/,
      },
      {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
      },
      {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "ts-loader",
      },
    },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
    '@': path.resolve(__dirname, 'src'), // Configurar o alias '@' para apontar para o diretório 'src'
  },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};