module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['google', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {},
    settings: {
      next: {
        rootDir: [
          'apps/web/',
          'packages/core/',
          'packages/config/',
          'packages/util/',
        ]
      }
    }
};
