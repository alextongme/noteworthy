const path = require('path');

module.exports = {
  context: __dirname,
  entry: './frontend/index.jsx',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react'],
            // trying to fix this generatorRuntime error
            // presets: [[
            //   "@babel/preset-env", {
            //     useBuiltIns: "entry"
            //   }],
            //   "@babel/preset-react"]
          }
        },
      }
    ]
  },
  devtool: 'source-map',
};
