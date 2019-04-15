## 抽取配置参数

同级目录新建文件`env.js`文件,我们将一些环境变量和配置变量独立开来,尽量不耦合进webpack文件里.如下所示

```
const path = require('path');

const isDev = process.env.NODE_ENV !== "DEV",
  isProd = process.env.NODE_ENV !== "PROD",
  isServer = process.env.NODE_ENV !== "SERVER",

  entry = "./src/index.tsx",
  outputName = "[name].bundle.js",
  outputPath = path.resolve(__dirname, "../dist"),
  publicPath = "",
  
  title = "test";

module.exports = {
  isDev,
  isProd,
  isServer,
  entry,
  outputName,
  outputPath,
  publicPath,
  title
};

```



## webpack.common.js

相关变量替换如下:

```
...省略
const { isProd, entry,
    outputName,
    outputPath,
    publicPath, title } = require('./env');

module.exports = {
  // 入口
  entry,
  // 输出
  output: {
    // 打包文件名
    filename: outputName,
    // 输出路径
    path: outputPath,
    // 资源请求路径
    publicPath
  },
  module: {
    rules
  },
  plugins: [
    // 清除文件
    new CleanWebpackPlugin(),
    // 提取样式文件
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename:
        !isProd
          ? "[name].css"
          : "style/[name].[contenthash].css",
      chunkFilename:
        !isProd
          ? "[id].css"
          : "style/[id].[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      // title
      title,
      // 模板
      template: "index.html"
    })
  ],
  ...省略
};

```



#### 进度条展示

```
yarn add progress-bar-webpack-plugin
-------------------------------------------
new VueLoaderPlugin()
```

目测没啥用处,求个视觉效果吧



#### 定义环境变量

    new webpack.DefinePlugin({
      'process.env.project': 'demo'
    }),


plugins部分最终代码如下:

```
  plugins: [
    // 清除文件
    new CleanWebpackPlugin(),
    // 进度条展示
    new ProgressBarPlugin(),
    // 该插件帮助我们安心地使用环境变量
    new webpack.DefinePlugin({
      'process.env.project': 'demo'
    }),
    // 提取样式文件
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename:
        !isProd
          ? "[name].css"
          : "style/[name].[contenthash].css",
      chunkFilename:
        !isProd
          ? "[id].css"
          : "style/[id].[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      // title
      title,
      // 模板
      template: "index.html"
    })
  ],
```



#### 输出信息

我们可以自定义webpack打包的输出信息,因为比较多字段,所以同级目录新增`stats.js`文件

```
module.exports = {
    // 未定义选项时，stats 选项的备用值(fallback value)（优先级高于 webpack 本地默认值）
    all: undefined,

    // 添加资源信息
    assets: true,

    // 对资源按指定的字段进行排序
    // 你可以使用 `!field` 来反转排序。
    // Some possible values: 'id' (default), 'name', 'size', 'chunks', 'failed', 'issuer'
    // For a complete list of fields see the bottom of the page
    assetsSort: 'field',

    // 添加构建日期和构建时间信息
    builtAt: true,

    // 添加缓存（但未构建）模块的信息
    cached: true,

    // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
    cachedAssets: true,

    // 添加 children 信息
    children: true,

    // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
    chunks: false,

    // 添加 namedChunkGroups 信息
    chunkGroups: false,

    // 将构建模块信息添加到 chunk 信息
    chunkModules: false,

    // 添加 chunk 和 chunk merge 来源的信息
    chunkOrigins: false,

    // 按指定的字段，对 chunk 进行排序
    // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
    // Some other possible values: 'name', 'size', 'chunks', 'failed', 'issuer'
    // For a complete list of fields see the bottom of the page
    chunksSort: 'field',


    // `webpack --colors` 等同于
    colors: true,

    // 显示每个模块到入口起点的距离(distance)
    depth: false,

    // 通过对应的 bundle 显示入口起点
    entrypoints: false,

    // 添加 --env information
    env: false,

    // 添加错误信息
    errors: true,

    // 添加错误的详细信息（就像解析日志一样）
    errorDetails: true,

    /* // 将资源显示在 stats 中的情况排除
    // 这可以通过 String, RegExp, 获取 assetName 的函数来实现
    // 并返回一个布尔值或如下所述的数组。
    excludeAssets: "filter" | /filter/ | (assetName) => true | false |
      ["filter"] | [/filter/] | [(assetName) => true | false],

    // 将模块显示在 stats 中的情况排除
    // 这可以通过 String, RegExp, 获取 moduleSource 的函数来实现
    // 并返回一个布尔值或如下所述的数组。
    excludeModules: "filter" | /filter/ | (moduleSource) => true | false |
      ["filter"] | [/filter/] | [(moduleSource) => true | false],

    // 查看 excludeModules
    exclude: "filter" | /filter/ | (moduleSource) => true | false |
      ["filter"] | [/filter/] | [(moduleSource) => true | false], */

    // 添加 compilation 的哈希值
    hash: true,

    // 设置要显示的模块的最大数量
    // maxModules: 15,

    // 添加构建模块信息
    modules: true,

    // 按指定的字段，对模块进行排序
    // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
    // Some other possible values: 'name', 'size', 'chunks', 'failed', 'issuer'
    // For a complete list of fields see the bottom of the page
    modulesSort: 'field',

    // 显示警告/错误的依赖和来源（从 webpack 2.5.0 开始）
    moduleTrace: true,

    // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
    performance: true,

    // 显示模块的导出
    providedExports: false,

    // 添加 public path 的信息
    publicPath: false,

    // 添加模块被引入的原因
    reasons: false,

    // 添加模块的源码
    source: false,

    // 添加时间信息
    timings: true,

    // 显示哪个模块导出被用到
    usedExports: false,

    // 添加 webpack 版本信息
    version: false,

    // 添加警告
    warnings: true,

    // 过滤警告显示（从 webpack 2.4.0 开始），
    // 可以是 String, Regexp, 一个获取 warning 的函数
    // 并返回一个布尔值或上述组合的数组。第一个匹配到的为胜(First match wins.)。
    // warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) => true| false
  }
```



#### 禁止超大警告

```
performance: {
	hints: false // 取消静态文件超过250kbkb的警告
},
```

设置后不影响打包,只是不会提示



#### 完整代码

```
const HtmlWebpackPlugin = require("html-webpack-plugin"),
  CleanWebpackPlugin = require("clean-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  ProgressBarPlugin = require('progress-bar-webpack-plugin'),
  webpack = require('webpack'),
  alias = require("./alias"),
  rules = require("./rules"),
  stats = require("./stats"),
  {
    isProd, entry,
    outputName,
    outputPath,
    publicPath, title
  } = require('./env');

module.exports = {
  // 入口
  entry,
  // 输出
  output: {
    // 打包文件名
    filename: outputName,
    // 输出路径
    path: outputPath,
    // 资源请求路径
    publicPath
  },
  module: {
    rules
  },
  stats,
  performance: {
    hints: false // 取消静态文件超过250kbkb的警告
  },
  plugins: [
    // 清除文件
    new CleanWebpackPlugin(),
    // 进度条展示
    new ProgressBarPlugin(),
    // 该插件帮助我们安心地使用环境变量
    new webpack.DefinePlugin({
      'process.env.project': 'demo'
    }),
    // 提取样式文件
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename:
        !isProd
          ? "[name].css"
          : "style/[name].[contenthash].css",
      chunkFilename:
        !isProd
          ? "[id].css"
          : "style/[id].[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      // title
      title,
      // 模板
      template: "index.html"
    })
  ],
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    // 创建 import 或 require 的别名，来确保模块引入变得更简单
    alias
  }
};

```



## rules.js

原本代码充斥很多重复代码,将他们提取出来

```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const {
  isProd, isServer, entry,
  outputName,
  outputPath,
  publicPath, title
} = require('./env')

const cssMiniLoader = !isServer
  ? {
    loader: MiniCssExtractPlugin.loader,
    options: {
      // you can specify a publicPath here
      // by default it use publicPath in webpackOptions.output
      publicPath: process.env.NODE_ENV === "DEV" ? "./" : "../"
    }
  }
  : "style-loader"; // 使用<style>将css-loader内部样式注入到我们的HTML页面,
const postcssLoader = {
  loader: "postcss-loader",
  options: {
    config: {
      path: "./" // 写到目录即可，文件名强制要求是postcss.config.js
    }
  }
};
const imgLoader = {
  loader: "url-loader",
  options: {
    name: "[name].[hash:5].[ext]",
    limit: 20 * 1024, // size <= 50kb
    outputPath: "img"
  }
};

module.exports = [
  // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
  {
    test: /\.tsx?$/,
    loader: "awesome-typescript-loader",
    options: {
      useCache: true,
      useBabel: false, // !important!
      getCustomTransformers: () => ({
        before: [
          tsImportPluginFactory({
            libraryName: "antd",
            libraryDirectory: "lib",
            style: true
          })
        ]
      })
    },
    exclude: [/node_modules\/mutationobserver-shim/g]
  },
  {
    test: /\.s?css$/, // 匹配文件
    use: [
      cssMiniLoader,
      "css-loader", // 加载.css文件将其转换为JS模块
      postcssLoader,
      "sass-loader" // 加载 SASS / SCSS 文件并将其编译为 CSS
    ]
  },
  {
    test: /antd.*\.less$/, // 匹配文件
    use: [
      cssMiniLoader,
      "css-loader", // 加载.css文件将其转换为JS模块
      postcssLoader,
      {
        loader: "less-loader",
        options: {
          javascriptEnabled: true // 是否处理js内样式
        }
      }
    ]
  },
  {
    test: /\.(png|svg|jpe?g|gif)$/i, // 图片处理
    use:
      isProd
        ? [
          imgLoader,
          {
            loader: "image-webpack-loader",
            options: {
              // Compress JPEG images
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // Compress PNG images
              optipng: {
                enabled: false
              },
              //  Compress PNG images
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              // Compress GIF images
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
        : [
          imgLoader
        ]
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/, // 字体处理
    use: ["file-loader"]
  },
  {
    test: /\.xml$/, // 文件处理
    use: ["xml-loader"]
  },
  {
    test: /\.(html)$/,
    use: {
      loader: "html-loader"
    }
  }
];

```





## webpack.server.js

我们稍微再细致一下配置,修改如下

```
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
    host: 'localhost',
    // 是否自动打开页面,可以传入指定浏览器名字打开
    open: false,
    // 是否开启部分热替换功能
    hotOnly: true,
    proxy: {
      '/mizhuakey': {
        target: 'http://alpha.mizhua.net', // http://alpha.mizhua.net/dev/login.html?flash=true&name=test
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/mizhuakey': ''
        }
      },
      '/xiaohuxikey': {
        target: 'http://alpha2.xiaohuxi.cn', // http://alpha2.xiaohuxi.cn/dev/login.html?flash=true&name=test
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/xiaohuxikey': ''
        }
      }
    },
    overlay: { warnings: false, errors: true },
    /* 惰性模式 将不监视文件改动，不想使用自动刷新功能时可设置为true */
    lazy: false,
    /* 静默模式，减少不必要的信息输出 necessary for FriendlyErrorsPlugin */
    quiet: false,
    watchOptions: {
      poll: false
    },
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
```

