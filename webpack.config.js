const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SRC_DIR = __dirname + "/src";
const DIST_DIR = __dirname + "/dist";
const devMode = true;

module.exports = {
   entry: [SRC_DIR + "/index.jsx"],
   output: {
      path: DIST_DIR,
      publicPath: "/",
      filename: "bundle.js"
   },
   module: {
      rules: [
         {
            test: /\.(html)$/,
            exclude: /node_modules/,
            use: {
               loader: "html-loader",
               options: { minimize: true }
            }
         },
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader"
            }
         },
         {
            test: /\.(scss|sass|css)$/,
            include: SRC_DIR,
            exclude: /node_modules/,
            use: [
               devMode ? "style-loader" : MiniCssExtractPlugin.loader,
               {
                  loader: "css-loader",
                  options: {
                     modules: {
                        localIdentName: "[local]_[hash:base64:5]"
                     },
                     sourceMap: true
                  }
               },
               {
                  loader: "sass-loader",
                  options: {
                     sourceMap: true
                  }
               }
            ]
         }
      ]
   },
   resolve: {
      extensions: ["*", ".js", ".jsx"]
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
         template: SRC_DIR + "/index.html",
         filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
         filename: devMode ? "[name].css" : "[name].[hash].css",
         chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
      })
   ],
   devServer: {
      contentBase: DIST_DIR,
      hot: true,
      port: 4000
   }
};
