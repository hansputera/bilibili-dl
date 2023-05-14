const {withSentryConfig} = require('@sentry/nextjs');

const webpack = require('webpack');
const withTM = require('next-transpile-modules')([
    '@bilibili-dl/core',
    '@bilibili-dl/util',
]);
const UnoCSS = require('@unocss/webpack').default
const {parsed: customEnvironment} = require('dotenv').config({
    path: require('path').resolve(__dirname, '..', '..', '.env'),
});

module.exports = withTM({
    reactStrictMode: true,
    experimental: {esmExternals: true},
    webpack(config) {
        config.cache = false
        config.plugins.push(
            UnoCSS()
        )
        if (typeof customEnvironment !== 'undefined') {
            config.plugins.push(
                new webpack.EnvironmentPlugin(customEnvironment),
            );
        }
        return config;
    },
});

module.exports = withSentryConfig(
    module.exports,
    {silent: true},
    {hideSourcemaps: true},
);
