import path from 'path';
import type { WebpackOptions } from './options';
export const getPaths = (options: WebpackOptions) => {
  const resolve = (...segments: string[]) => path.resolve(options.rootDir, ...segments);
  return {
    root: options.rootDir,
    src: resolve(options.srcDir),
    build: resolve(options.buildDir),
    public: resolve(options.publicDir),
    entry: resolve(options.srcDir, options.entry),
    template: resolve(options.publicDir, options.template),
    resolve,
  };
};
