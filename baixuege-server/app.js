const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const koajwt = require("koa-jwt");
const koaBody = require("koa-body");
const cors = require("koa2-cors"); //跨域
const path = require("path");

// 导入路由
const users = require("./routes/users");
const article = require("./routes/article");
const home = require("./routes/home");
const say = require("./routes/say");
const upload = require("./routes/upload");
const about = require("./routes/about");
const page = require("./routes/page");
const type = require("./routes/type");
const tags = require("./routes/tags");
const dict = require("./routes/dict");
const menu = require("./routes/menu");

// error handler
onerror(app);

// 中间件
app.use(cors()); // 解决跨域
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());

// 静态资源目录
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

// token
app.use(
  koajwt({
    // 加密的密钥
    secret: "baixuege-token",
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

// routes 路由
app.use(users.routes(), users.allowedMethods());
app.use(article.routes(), article.allowedMethods());
app.use(home.routes(), home.allowedMethods());
app.use(say.routes(), say.allowedMethods());
app.use(about.routes(), about.allowedMethods());
app.use(page.routes(), page.allowedMethods());
app.use(type.routes(), type.allowedMethods());
app.use(tags.routes(), tags.allowedMethods());
app.use(dict.routes(), dict.allowedMethods());
app.use(menu.routes(), menu.allowedMethods());

// 文件上传
app.use(
  koaBody({
    multipart: true,
  })
);

app.use(upload.routes(), upload.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
