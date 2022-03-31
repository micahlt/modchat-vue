const path = require("path");
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, "./src/service-worker.js")
      })
    ]
  },
  devServer: {
    disableHostCheck: true,
    port: 3000
  }
};