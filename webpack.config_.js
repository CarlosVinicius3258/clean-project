const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = 
{
  mode: "development",
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/public/js',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    },
      {
        test: /\.scss$/
        ,
        use: [
          "sass-loader", // 1. Turns sass into css
          "style-loader", // 3. Inject styles into DOM
        ]
      }     
    ],
    
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    historyApiFallback: true
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*']
    })
  ]
}