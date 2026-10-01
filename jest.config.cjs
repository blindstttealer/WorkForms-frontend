module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.test.ts', '**/*.test.tsx'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|scss|sass)$': '<rootDir>/src/test-utils/styleMock.cjs',
        '\\.(ttf|otf|woff|woff2|svg|png|jpg|jpeg|gif)$': '<rootDir>/src/test-utils/fileMock.cjs',
    },
    transformIgnorePatterns: ['/node_modules/(?!nanoid/)'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                tsconfig: {
                    jsx: 'react-jsx',
                    module: 'commonjs',
                    esModuleInterop: true,
                    paths: { '@/*': ['src/*'] },
                    baseUrl: '.',
                },
            },
        ],
    },
    modulePathIgnorePatterns: ['<rootDir>/src/api/generated'],
};
