const merge = require('lodash/merge');
const isDev = process.env.NODE_ENV !== 'production';

if (typeof document !== 'undefined' && !isJest) {
    throw new Error('Do not import `config.js` from inside the client-side code.');
}

let localConfig = {};
if (isDev) {
    try {
        localConfig = require('./config.local.js');
    } catch (ex) {
        console.log('ex', ex)
        console.log('config.local does not exist.');
    }
}

module.exports = merge(localConfig);