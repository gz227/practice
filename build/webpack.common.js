const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[hash:8].js",
    // publicPath: '//url.com' // 公司存放资源CDN地址
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "demo",
      minify: {
        // 压缩html文件
        removeComments: true, // 去除注释
        collapseWhitespace: true, // 去除空格换行
        minifyCSS: true, // 压缩内联CSS
      },
    }),
    new CleanWebpackPlugin(),
  ],
};
