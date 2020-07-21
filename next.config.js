
const withPlugins = require('next-compose-plugins');
const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const path = require('path');
const config = require('./config');


const nextConfig = {
    publicRuntimeConfig: {
        BASE_URL: process.env.BASE_URL || config.baseUrl,

    },
    webpack(config) {
        config.resolve.alias['src'] = path.join(__dirname, 'src');
        return config;
    }
};

module.exports = withPlugins([
    [withSass, {}],
    [withCss, {}],

], nextConfig);
