const path = require('path'),
  webpack = require('webpack'),
  merge = require('webpack-merge'),
  common = require('./webpack.common.js'),
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: "development",
  // 原始源代码（仅限行）
  devtool: "cheap-module-eval-source-map",
  devServer: {
    clientLogLevel: 'warning', // none，error，warning
    // 打开模式, Iframe mode和Inline mode最后达到的效果都是一样的，都是监听文件的变化，然后再将编译后的文件推送到前端，完成页面的reload的
    inline: true,
    progress: true,
    // 指定了服务器资源的根目录
    contentBase: path.join(__dirname, '../'),
    // 是否开启gzip压缩
    compress: false,
    port: 9000,
    // 是否开启热替换功能
    // hot: true,
    host: '0.0.0.0',
    // 是否自动打开页面,可以传入指定浏览器名字打开
    open: false,
    // 是否开启部分热替换功能
    hotOnly: true,
    proxy: {
    },
    // Shows a full-screen overlay in the browser when there are compiler errors or warnings. Disabled by default. If you want to show only compiler errors:
    overlay: { warnings: false, errors: true },
    /* 惰性模式 将不监视文件改动，不想使用自动刷新功能时可设置为true */
    lazy: false,
    /* 静默模式，减少不必要的信息输出 necessary for FriendlyErrorsPlugin */
    quiet: false,
    watchOptions: {
      // Turn on polling by passing true, or specifying a poll interval in milliseconds:
      poll: false
    },
    // 同stats
    stats: {
      builtAt: true,
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      // 添加时间信息
      timings: true
    }
  },
  plugins: [
    // 热替换模块
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin() //在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。对于所有资源，统计资料(stat)的 emitted 标识都是 false
    // 性能可视化
    // new BundleAnalyzerPlugin()
  ]
});