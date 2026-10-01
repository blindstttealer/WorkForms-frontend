import ReactRefreshTypeScript from 'react-refresh-typescript';
export const getLoaders = (isProduction: boolean) => [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'ts-loader',
      options: {
        getCustomTransformers: () => ({
          before: [!isProduction && ReactRefreshTypeScript()].filter(Boolean),
        }),
        transpileOnly: true,
        compilerOptions: {
          sourceMap: true,
        },
      },
    },
  },
  {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          exportType: 'named',
          namedExport: 'ReactComponent',
        },
      },
    ],
  },
  {
    test: /\.(png|jpg|jpeg|gif|webp|avif)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'images/[name][hash][ext]',
    },
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name][hash][ext]',
    },
  },
];
