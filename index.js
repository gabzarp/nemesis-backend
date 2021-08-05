require('dotenv').config()
const logger = require('koa-logger');
const Koa = require("koa")
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require('./services/Router');

const app = new Koa();

app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  });

app.use(cors());

app.use(bodyParser());

app.use(logger());

app.use(router)

app.listen(3001);
//app.listen(process.env.PORT, () => console.log("Server Running on port " + process.env.PORT));
