const webpack = require('webpack');
const withTM = require('next-transpile-modules')([
    '@bilibili-dl/core',
    '@bilibili-dl/util',
]);
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');

module.exports = withTM({
    reactStrictMode: true,
    experimental: {esmExternals: true},
    webpack(config) {
        // adding windicss plugin
        config.plugins.push(new WindiCSSWebpackPlugin());
        return config;
    },
});
