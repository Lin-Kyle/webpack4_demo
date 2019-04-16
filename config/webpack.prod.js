const merge = require("webpack-merge"),
  common = require("./webpack.common.js"),
  OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
  ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = merge(common, {
  mode: "production",
  // 原始源代码
  devtool: "none",
  optimization: {
    // Setting optimization.runtimeChunk to true or "multiple" adds an additional chunk to each entrypoint containing only the runtime. This setting is an alias for:
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        vendor: {
          // 优先级高于其他就不会被打包进其他chunk,如果想匹配自己定义的拆分规则，则priority需要设置为正数，优先匹配默认拆分规则就设置为负数。
          priority: 10,
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        }
      }
    },
    minimizer: [
      // This plugin serves to help projects with many entry points speed up their builds. The UglifyJS plugin provided with webpack runs sequentially on each of the output files. This plugin runs uglify in parallel with one thread for each of your available cpus. This can lead to significantly reduced build times as minification is very CPU intensive.
      new ParallelUglifyPlugin({ 
        // Optional absolute path to use as a cache. If not provided, caching will not be used.
        cacheDir: '.cache/',
        // 传递给 UglifyJS的参数如下：
        uglifyJS: {
          output: {
            /*
             是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
             可以设置为false
            */
            beautify: false,
            /*
           是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
          */
            comments: false
          },
          compress: {
            /*
             是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用
             不大的警告
            */
            warnings: false,

            /*
           是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
          */
            drop_console: true,

            /*
           是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不
           转换，为了达到更好的压缩效果，可以设置为false
          */
            collapse_vars: true,

            /*
           是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
           var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
          */
            reduce_vars: true
          }
        }
      })
    ]
  },

  plugins: [new OptimizeCssAssetsPlugin()]
});
