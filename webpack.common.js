const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

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
  module: {
    rules: [
      {
        test: /\.(css|scss)$/, // 匹配文件
        use: [
          "style-loader", // 使用<style>将css-loader内部样式注入到我们的HTML页面
          "css-loader", // 加载.css文件将其转换为JS模块
          "sass-loader" // 加载 SASS / SCSS 文件并将其编译为 CSS
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/, // 图片处理
        use: ["file-loader"]
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
        test: /\.html$/, // 处理html资源如图片
        use: ["html-loader"]
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
    })
  ]
};
