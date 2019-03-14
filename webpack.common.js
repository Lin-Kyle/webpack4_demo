const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // 入口
  entry: "./src/index.js",
  // 输出
  output: {
    // 打包文件名
    filename: "[name].bundle.js",
    // 输出路径
    path: path.resolve(__dirname, "dist"),
    // 资源请求路径
    publicPath: ""
  },
  resolve: {
    // 创建 import 或 require 的别名，来确保模块引入变得更简单
    alias: {
      "@": path.resolve(__dirname, "src/"),
      IMG: path.resolve(__dirname, "src/img"),
      STYLE: path.resolve(__dirname, "src/style"),
      JS: path.resolve(__dirname, "src/js"),
      ROUTER: path.resolve(__dirname, "src/router"),
      PAGE: path.resolve(__dirname, "src/page"),
      CMT: path.resolve(__dirname, "src/component")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // 匹配文件
        exclude: /node_modules/, // 过滤文件夹
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/, // 匹配文件
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: "../"
            }
          },
          // "style-loader", // 使用<style>将css-loader内部样式注入到我们的HTML页面
          "css-loader", // 加载.css文件将其转换为JS模块
          "sass-loader" // 加载 SASS / SCSS 文件并将其编译为 CSS
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
          loader: "html-loader",
          options: {
            attrs: ["img:src", "img:data-src", "audio:src"],
            minimize: true
          }
        }
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i, // 图片处理
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[hash:5].[ext]",
              limit: 20 * 1024, // size <= 50kb
              outputPath: "img"
            }
          },
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
              },
              // Compress JPG & PNG images into WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 清除文件
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // title
      title: "test",
      // 模板
      template: "index.html"
    }),
    // 提取样式文件
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "style/[name].[chunkhash:8].css",
      chunkFilename: "style/[id].css"
    })
  ]
};
