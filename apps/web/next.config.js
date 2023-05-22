const {withSentryConfig} = require('@sentry/nextjs');

const webpack = require('webpack');
const {parsed: customEnvironment} = require('dotenv').config({
    path: require('path').resolve(__dirname, '..', '..', '.env'),
});

/** @type {import('next').NextConfig} */
module.exports = {
    i18n: {
        locales: ['en-US', 'id-ID'],
        defaultLocale: 'en-US'
    },
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
    images: {
        domains: ['upload.wikimedia.org']
    }
};

module.exports = withSentryConfig(
    module.exports,
    {silent: true},
    {hideSourcemaps: true},
);
