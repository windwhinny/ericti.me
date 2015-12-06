'use strict';

const fs = require('fs');

if (!process.env.PFX_PATH) {
    throw new Error('PFX_PATH not set in env');
}

if (!process.env.PFX_PASSWD) {
    throw new Error('PFX_PASSWD not set in env');
}

module.exports = {
  development: false,
  production: true,
  tls: {
    pfx:fs.readFileSync(),
    passphrase: process.env.PFX_PASSWD
  }
}
