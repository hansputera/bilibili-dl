const webpack = require('webpack');
const withTM = require('next-transpile-modules')(['@bilibili-dl/core']);

module.exports = withTM({
    reactStrictMode: true,
    experimental: {esmExternals: true},
});
