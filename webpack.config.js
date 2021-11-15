const path = require("path");
const webpack = require("webpack");
module.exports = {
  entry: {
    client: "./src/client.tsx",
    bundle: "./src/bundle.tsx",
  },
  output: {
    path: path.resolve(__dirname, "assets"),
    filename: "[name].js",
  },
  mode: process.env.NODE_ENV || "development",
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    fallback: {
      fs: false,
      path: require.resolve("path-browserify"),
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: { loader: "ts-loader" },
      },
    ],
  },
  plugins: [
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
