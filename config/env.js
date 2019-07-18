const path = require('path');

const isDev = process.env.NODE_ENV !== "DEV",
  isProd = process.env.NODE_ENV !== "PROD",
  isServer = process.env.NODE_ENV !== "SERVER",

  entry = "./src/index.js",
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
