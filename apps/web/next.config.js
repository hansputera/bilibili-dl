const webpack = require('webpack');
const withTM = require('next-transpile-modules')([
    '@bilibili-dl/core',
    '@bilibili-dl/util',
]);
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');
const {parsed: customEnvironment} = require('dotenv').config({
    path: require('path').resolve(__dirname, '..', '..', '.env'),
});

module.exports = withTM({
    reactStrictMode: true,
    experimental: {esmExternals: true},
    webpack(config) {
        // adding windicss plugin
        config.plugins.push(new WindiCSSWebpackPlugin());
        if (typeof customEnvironment !== 'undefined') {
            config.plugins.push(
                new webpack.EnvironmentPlugin(customEnvironment),
            );
        }
        return config;
    },
});
