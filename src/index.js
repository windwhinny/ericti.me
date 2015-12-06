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
})

function createServer(){
  if (config.development) {
      return http.createServer({}, app.callback());
  } else {
      return http2.createServer({}, app.callback());
  }
}

createServer()
  .listen(config.port);

logger.info(`server start at ${config.port}`);
