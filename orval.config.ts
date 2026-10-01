import { defineConfig } from 'orval';
export default defineConfig({
  techApi: {
    input: {
      target: './openapi/openapi.json',
    },
    output: {
      mode: 'tags-split',
      target: 'src/api/generated/endpoints.ts',
      schemas: 'src/api/generated/model',
      client: 'react-query',
      httpClient: 'axios',
      override: {
        mutator: {
          path: 'src/api/orval-axios-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
          version: 5,
        },
      },
    },
  },
});
