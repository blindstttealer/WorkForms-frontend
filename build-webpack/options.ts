export interface WebpackOptions {
  mode: 'development' | 'production';
  rootDir: string;
  srcDir: string;
  buildDir: string;
  publicDir: string;
  entry: string;
  template: string;
  port?: number;
  host?: string;
  apiUrl?: string;
  analyze?: boolean;
  sourcemap?: boolean | string;
  minify?: boolean;
  open?: boolean;
  hot?: boolean;
  stats?: boolean | 'verbose' | 'minimal' | 'normal' | 'detailed';
  aliases?: Record<string, string>;
}
export const getDefaultOptions = (): WebpackOptions => ({
  mode: 'development',
  rootDir: process.cwd(),
  srcDir: 'src',
  buildDir: 'build',
  publicDir: 'public',
  entry: './index.tsx',
  template: './index.html',
  port: 4000,
  host: '127.0.0.1',
  sourcemap: true,
  minify: true,
  open: true,
  hot: true,
  analyze: false,
  stats: 'minimal',
  aliases: {},
});
