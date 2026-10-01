import { Configuration } from 'webpack';
import { WebpackOptions } from './build-webpack/options';
import { normalizeOptions } from './build-webpack/normalize-options';
import { createConfig } from './build-webpack/config';
export default (env: any = {}, argv: any = {}): Configuration => {
  const mode: WebpackOptions['mode'] =
    env.mode || argv.mode || (process.env.NODE_ENV as WebpackOptions['mode']) || 'development';
  const userOptions: Partial<WebpackOptions> = {
    mode,
    port: env.port ? Number(env.port) : undefined,
    host: env.host,
    apiUrl: env.apiUrl,
    analyze: env.analyze === 'true' || env.analyze === true,
    sourcemap: env.sourcemap,
    minify: env.minify !== 'false',
    open: env.open !== 'false',
    hot: env.hot !== 'false',
  };
  const options = normalizeOptions(userOptions);
  const config = createConfig(options);
  return config;
};
