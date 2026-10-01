import type { Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
export const getOptimization = (): Configuration['optimization'] => ({
  minimize: true,
  minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  splitChunks: {
    chunks: 'all',
  },
  runtimeChunk: 'single',
});
