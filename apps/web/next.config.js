const {withSentryConfig} = require('@sentry/nextjs');

const webpack = require('webpack');
const {parsed: customEnvironment} = require('dotenv').config({
    path: require('path').resolve(__dirname, '..', '..', '.env'),
});

/** @type {import('next').NextConfig} */
module.exports = {
    transpilePackages: ['@bilibili-dl/core', '@bilibili-dl/util'],
    reactStrictMode: true,
    experimental: {esmExternals: true},
    webpack(config) {
        if (typeof customEnvironment !== 'undefined') {
            config.plugins.push(
                new webpack.EnvironmentPlugin(customEnvironment),
            );
        }
        return config;
    },
};

module.exports = withSentryConfig(
    module.exports,
    {silent: true},
    {hideSourcemaps: true},
);
