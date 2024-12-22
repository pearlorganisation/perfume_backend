import path from "path";
import { fileURLToPath } from "url";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  entry: "./server.js", // Ensure this points to your server entry file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Cleans the output directory before each build
  },
  target: "node", // Ensure the build targets a Node.js environment
  mode: "production", // Change to 'production' for optimized builds
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // Ensures compatibility with your Node.js version
          },
        },
      },
    ],
  },
  optimization: {
    usedExports: true, // Enable tree-shaking
  },
  resolve: {
    extensions: [".js"], // Resolve .js files automatically
  },
  externals: {
    // Exclude Node.js built-in modules from the bundle
    fs: "commonjs fs",
    path: "commonjs path",
  },
  plugins: [new BundleAnalyzerPlugin()],
};
