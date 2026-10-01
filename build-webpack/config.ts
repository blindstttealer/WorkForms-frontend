import { getPaths } from './paths';
import { getLoaders } from './loaders';
import { getPlugins } from './plugins';
import { getOptimization } from './optimization';
import { getDevServer } from './dev-server';
import type { WebpackOptions } from './options';
export const createConfig = (options: WebpackOptions) => {
  const paths = getPaths(options);
  const isProduction = options.mode === 'production';
  return {
    mode: options.mode,
    entry: paths.entry,
    output: {
      path: paths.build,
      filename: '[name].[contenthash].js',
      publicPath: '/',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        '@': paths.src,
      },
    },
    module: {
      rules: getLoaders(isProduction),
    },
    plugins: getPlugins(options, paths, isProduction),
    devServer: !isProduction ? getDevServer(options) : undefined,
    optimization: isProduction ? getOptimization() : undefined,
    devtool: 'source-map',
  };
};
