const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devServer: {
    contentBase: "../dist",
    hot: true,
    port: 9000,
    open: true,
    compress: true, // 开启压缩
  },
  // devtool: "inline-source-map",
  optimization: {
    usedExports: true, // 开启树摇，仅生产环境有效
    // runtimeChunk: "single",
    // splitChunks: {
    //   chunks: "all",
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/, // 将node_modules下不长变跟的资源单独分包，利用缓存提高效率
    //       name: "vendors",
    //       chunks: "all",
    //     },
    //   },
    // },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "../src"),
        use: {
          loader: "babel-loader?cacheDirectory=true",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  corejs: 3,
                  useBuiltIns: "usage",
                  targets: "> 0.25%, not dead",
                  modules: false,
                },
              ],
            ],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.css|sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
        ],
      },
      {
        test: /\.png|svg|jpg|gif|jpeg$/,
        loader: "url-loader",
        options: {
          esModule: false,
          name: "[name]_[hash].[ext]", // ext表示原资源模块后缀名
          outputPath: "assets/",
          limit: 10 * 1024,
        },
      },
      {
        test: /\.woff|woff2|eot|ttf|otf$/,
        loader: "url-loader",
        options: {
          esModule: false,
          name: "[name]_[hash].[ext]", // ext表示原资源模块后缀名
          limit: 10 * 1024,
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 抽离css
    new MiniCssExtractPlugin({ filename: "[name]_[chunkhash:8].css" }),
    // 压缩css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
  ],
  resolve: {
    // 优化第三方模块查找速度
    modules: [path.resolve(__dirname, "../node_modules")],
    extensions: [".js", ".json", ".jsx", ".ts"],
    alias: {
      "@": path.join(__dirname, "../src"),
      react: path.resolve(
        __dirname,
        "../node_modules/react/umd/react.production.min.js"
      ),
      "react-dom": path.resolve(
        __dirname,
        "../node_modules/react-dom/umd/react-dom.production.min.js"
      ),
    },
  },
};
