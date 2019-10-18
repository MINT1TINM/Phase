const CompressionWebpackPlugin = require('compression-webpack-plugin');
const glob = require('glob');
const merge = require('webpack-merge');
const OS = require('os');
const HappyPack = require('happypack');

const happyThreadPool = HappyPack.ThreadPool({ size: OS.cpus().length });

// eslint-disable-next-line func-names
const page = function () {
  const entryHtml = glob.sync('src/views/*/*.html');
  const obj = {};
  entryHtml.forEach((filePath) => {
    const filename = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));
    const entryname = filePath.substring(0, filePath.lastIndexOf('.'));
    let conf = {
      entry: `${entryname}.ts`,
      template: filePath,
      filename: `${filename}.html`,
      chunks: ['chunk-vendors', 'chunk-common', filename],
    };
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        },
        chunksSortMode: 'dependency',
      });
    }
    obj[filename] = conf;
  });
  return obj;
};

const productionGzipExtensions = ['js', 'css'];
module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // terser
      const terserWebpackPlugin = config.optimization.minimizer[0];
      const { terserOptions } = terserWebpackPlugin.options;
      terserOptions.compress.drop_console = true;
      terserWebpackPlugin.cache = true;
      terserWebpackPlugin.parallel = true;
      // gzip
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
          threshold: 10240,
          minRatio: 0.8,
        }),
        new HappyPack({
          id: 'happybabel',
          loaders: ['babel-loader', 'sass-loader'],
          threadPool: happyThreadPool,
          verbose: true
        })
      );
      config.devtool = 'source-map';
    }
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9090',
        ws: false,
      },
    },
  },

  outputDir: 'dim-step',
  productionSourceMap: false,

  pages: page()
};
