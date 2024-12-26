import path from "path";
import { fileURLToPath } from "url";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isProduction = process.env.NODE_ENV === 'production';

export default {
  entry: "./server.js", // Ensure this points to your server entry file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Cleans the output directory before each build
  },
  target: "node", // Ensure the build targets a Node.js environment
  mode: isProduction ? "production" : "development", // Set mode based on environment
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
    usedExports: true, // Enable tree-shaking to eliminate unused code
  },
  resolve: {
    extensions: [".js"], // Resolve .js files automatically
  },
  externals: {
    fs: "commonjs fs", // Exclude fs module from the bundle
    path: "commonjs path", // Exclude path module from the bundle
    http: "commonjs http", // Exclude http module from the bundle
    express: "commonjs express", // Exclude express from the bundle
    bodyParser: "commonjs body-parser", // Exclude body-parser from the bundle
    // Add other external modules as needed
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' }),
    isProduction && new BundleAnalyzerPlugin(),  // Only include analyzer in production
  ].filter(Boolean),
};
