import { getDefaultOptions, WebpackOptions } from './options';
export const normalizeOptions = (userOptions: Partial<WebpackOptions>): WebpackOptions => {
  const defaults = getDefaultOptions();
  return { ...defaults, ...userOptions };
};
