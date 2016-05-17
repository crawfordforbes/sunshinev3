var path = require("path");
// require("./styles/app.less");
module.exports = {
  entry: [
    './index.js',
    './assets/styles/app.less'
    ],
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.less?/,
        loader: "style!css!autoprefixer!less"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
