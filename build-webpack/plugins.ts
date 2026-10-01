import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import type { WebpackOptions } from './options';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import Dotenv from 'dotenv-webpack';
export const getPlugins = (options: WebpackOptions, paths: any, isProduction: boolean) =>
  [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: paths.template,
      minify: isProduction,
      favicon: path.resolve(paths.public, 'favicon.ico'),
    }),
    new Dotenv({
      path: isProduction ? '.env.production' : '.env.development',
      systemvars: true,
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({}),
    new webpack.ProgressPlugin(),
    !isProduction && new ReactRefreshWebpackPlugin(),
    options.analyze &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: '../bundle-report.html',
        openAnalyzer: true,
      }),
  ].filter(Boolean);
