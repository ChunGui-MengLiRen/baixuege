const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const koajwt = require('koa-jwt');
const koaBody = require('koa-body');
const path = require('path');

const index = require('./routes/index');
const users = require('./routes/users');
const article = require('./routes/article');
const home = require('./routes/home');
const say = require('./routes/say');
const upload = require('./routes/upload');
const about = require('./routes/about');
const page = require('./routes/page');

// error handler
onerror(app);

// app.use((ctx, next) => {
//   return next().catch((err) => {
//     if (err.status == 401) {
//       ctx.status == 401;
//       ctx.body = {
//         status: '0',
//         code: 401,
//         message: '用户未登录',
//       };
//     } else {
//       throw err;
//     }
//   });
// });

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'pug',
  })
);

app.use(
  koajwt({
    // 加密的密钥
    secret: 'baixuege-token',
  }).unless({
    // 不需要验证的路由
    path: [
      /^\/users\/login/,
      /^\/users\/reg/,
      /^\/upload/,
      /^\/images/,
      /^\/page/,
    ],
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(article.routes(), article.allowedMethods());
app.use(home.routes(), home.allowedMethods());
app.use(say.routes(), say.allowedMethods());
app.use(about.routes(), about.allowedMethods());
app.use(page.routes(), page.allowedMethods());

app.use(
  koaBody({
    multipart: true,
    // formidable: {
    //   uploadDir: path.join(__dirname, 'public/images'), // 设置文件上传目录
    //   keepExtensions: true, // 保持文件的后缀
    //   maxFileSize: 1000 * 1024 * 1024, // 设置上传文件大小最大限制，默认10M
    // },
  })
);

app.use(upload.routes(), upload.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
