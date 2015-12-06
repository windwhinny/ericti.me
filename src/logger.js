'use strict';
const color = require('bash-color');
const fecha = require('fecha');

const stdOutput = {
  getHeader: function(log, type) {
    const time = fecha.format(log.date, 'YYYY-MM-DD HH:mm:ss');

    return `[${time}] [${type}] `;
  },
  log: function(log) {
    const header = this.getHeader(log, log.type || 'LOG');

    switch(log.type) {
      case 'ERR':
        const stack = color.red(header)+error.stack.split('\n').join('\n' + color.red(header));
        console.error(color.red(`${header}${error.message}`));
        console.error(stack);
        break;
      case 'WAR':
        console.log(color.yellow(`${header}${log.message}`));
        break;
      case 'INF':
        console.log(color.blue(`${header}${log.message}`));
        break;
      default:
        console.log(`${header}${log.message}`);
    }
  }
};

class Logger {
  constructor(output) {
    if (!output) {
      this.output = stdOutput;
    } else {
      this.output = output;
    }
  }

  error(error, code) {
    if (typeof error === 'string') {
      error = new Error(error);
    }

    error.code = error.code || code;
    error.date = error.date || new Date();
    error.type = 'ERR';

    this.output.log(error);
  }

  warning(log, code) {
    if (typeof log === 'string') {
      log = {
        message: log,
      };
    }

    log.code = log.code || code;
    log.date = log.date || new Date();
    log.type = 'WAR';

    this.output.log(log);
  }

  info(log, code) {
    if (typeof log === 'string') {
      log = {
        message: log,
      };
    }

    log.code = log.code || code;
    log.date = log.date || new Date();
    log.type = 'INF';

    this.output.log(log);
  }

  log(log, code) {
    if (typeof log === 'string') {
      log = {
        message: log,
      };
    }

    log.code = log.code || code;
    log.date = log.date || new Date();

    this.output.log(log);
  }

  req(req, spending) {
    const status = (req.response && req.response.status) || '000';

    this.log({
      method: req.method,
      body: req.body,
      url: req.url,
      query: req.query,
      cookies: req.cookies,
      headers: req.headers,
      message: `${req.method} ${status} ${req.url} ${spending}ms`,
      type: 'REQ',
    })
  }
}

module.exports = new Logger();
module.exports.Logger = Logger;
