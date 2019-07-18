const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
  isProd, isServer
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

module.exports = [{
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader'
  }
},
{ test: /\.vue$/, use: 'vue-loader' },
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
