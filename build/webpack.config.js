const commonConfig = require("./webpack.common.js");
const devConfig = require("./dev.config");
const prodConfig = require("./prod.config");
const merge = require("webpack-merge");
module.exports = (env) => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig);
  } else {
    return merge(commonConfig, devConfig);
  }
};
