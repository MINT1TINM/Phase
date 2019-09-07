const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      //terser
      const terserWebpackPlugin = config.optimization.minimizer[0];
      const terserOptions = terserWebpackPlugin.options.terserOptions;
      // terserOptions.compress["drop_console"] = true;
      //gzip
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8
        })
      );
      config.devtool = "source-map";
    }
  },

  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/assets/main.scss"'
      }
    }
  },

  devServer: {
    proxy: {
      "/": {
        target: "http://127.0.0.1:9090",
        ws: false
      }
    }
  },

  outputDir: "phase",
  productionSourceMap: false
};
