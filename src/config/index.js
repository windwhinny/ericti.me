'use strict';

const caches = {};
const defaultConfig = require('./default.js');
const _ = require('lodash');
const logger = require('../logger');

function getConfig(env) {
  let config = null;

  try {
    config = require(`./${env}.js`);
  } catch (e) {
    logger.warning(`Faild to load config: '${env}', fallback to default config`);
    return defaultConfig;
  }

  if (!config) return defaultConfig;

  return _.merge({}, defaultConfig, config);
}

function getByEnv(env) {
  let cache = caches[env];

  if (!cache) {
    cache = caches[env] = getConfig(env);
  }

  return cache;
};

module.exports = getByEnv(process.env.NODE_ENV);
module.exports.getByEnv = getByEnv;
