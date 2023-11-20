import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack, { ProgressPlugin } from "webpack";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CopyWebpackPlugin from "copy-webpack-plugin";
import CircularDependencyPlugin from "circular-dependency-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import type { BuildOptions } from "./types/config";

export default ({
  paths,
  isDev,
  isAnalyze,
  apiURL,
  project,
}: BuildOptions): webpack.WebpackPluginInstance[] => {
  const isProd = !isDev;

  const plugins: webpack.WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      // when we get other services html's, we get js files based on public path. So if we have a nested route, html plugin tries to get nested files as well which results in error. We need to flat paths in index.html for module federation to work properly
      publicPath: "/",
    }),
    new ProgressPlugin(),
    new webpack.DefinePlugin({
      /* eslint-disable @typescript-eslint/naming-convention */
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiURL),
      __PROJECT__: JSON.stringify(project),
      /* eslint-enable @typescript-eslint/naming-convention */
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ];

  const devPlugins: webpack.WebpackPluginInstance[] = [
    new ReactRefreshWebpackPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
  ];

  const prodPlugins: webpack.WebpackPluginInstance[] = [
    new MiniCSSExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.locales,
          to: paths.buildLocales,
        },
      ],
    }),
  ];

  if (isDev) {
    plugins.push(...devPlugins);
  }

  if (isProd) {
    plugins.push(...prodPlugins);
  }

  if (isAnalyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};
