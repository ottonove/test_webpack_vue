const { resolve } = require('path')

const { VueLoaderPlugin } = require("vue-loader");
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'
const srcPath = resolve(__dirname, 'src')
const distPath = resolve(__dirname, 'dist')
const bodyPartialFile = resolve(srcPath, 'index.html')
const wasmFile = resolve(
  __dirname,
  'node_modules',
  'mediainfo.js',
  'dist',
  'MediaInfoModule.wasm'
)

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: devMode ? 'development' : 'production',
  entry: { app: resolve(srcPath, 'index.js') },
  plugins: [
    new VueLoaderPlugin(),

    new HtmlWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: wasmFile, to: '.' },
        // { from: 'CNAME', to: '.' },
      ],
    }),
    new HtmlWebpackPartialsPlugin({ path: bodyPartialFile }),
    ...(devMode
      ? [new webpack.HotModuleReplacementPlugin()]
      : [
          new CleanWebpackPlugin([distPath]), // clean dist folder before build
          new MiniCssExtractPlugin({ filename: '[name].css' }),
        ]),
  ],
  output: {
    path: distPath,
    // filename: 'mediainfo-demo.js',
    filename: 'main.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },

      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        // Babel のオプションを指定する
        options: {
          presets: [
            // プリセットを指定することで、ES2020 を ES5 に変換
            "@babel/preset-env",
          ],
        },
      },
    ],
  },
/*   node: {
    fs: 'empty',
  }, */
  // import 文で .ts ファイルを解決するため
  resolve: {
    // Webpackで利用するときの設定
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
    fallback: {
      fs: false
    }
  },
  /* plugins: [
    // Vueを読み込めるようにするため
    new VueLoaderPlugin(),
  ], */
  // ES5(IE11等)向けの指定
  // target: ["web", "es5"],
};