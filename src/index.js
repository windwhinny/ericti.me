'use strict';

const Koa = require('koa');
const app = new Koa();
const http2 = require('http2');
const http = require('http');
const logger = require('./logger');

const config = require('./config');

app.use((ctx, next)=>{
  const start = new Date;
  return next().then(() => {
    const ms = new Date - start;
    logger.req(ctx, ms);
  });
});

if (config.development) {
    http.createServer(app.callback()).listen(config.port);
} else {
    http.createServer((req, res) => {
      res.writeHead(301, {
        Location: `https://${req.getHeader('host')}${req.url}`
      });

      res.end();
    }).listen(config.port);

    http2.createServer({
      pfx: config.tls.pfx,
      passphrase: config.tls.passphrase
    }, app.callback()).listen(config.tlsPort);
}


logger.info(`server start at ${config.port}`);
