const eslintConfigs = require('@bilibili-dl/config/eslint-ts.cjs');

module.exports = {
    ...eslintConfigs,
    extends: eslintConfigs.extends.concat(['plugin:@next/next/recommended']),
};
