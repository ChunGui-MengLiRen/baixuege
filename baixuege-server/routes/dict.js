const router = require("koa-router")();
const db = require("../db/index");

// router.prefix("/dict");

// 获取字典
const list = async (ctx, next) => {
  try {
    const sql1 = `select * from type where is_del='0'`;
    const sql2 = `select * from tags where is_del='0'`;

    const result1 = await db.query(sql1);
    const result2 = await db.query(sql2);

    if (result1 || result2) {
      ctx.body = {
        status: "1",
        message: "获取成功",
        data: [result1, result2],
      };
    } else {
      ctx.body = {
        status: "0",
        message: "获取失败",
      };
    }
  } catch (error) {
    ctx.body = {
      status: "0",
      message: error.message,
    };
  }
};

router.get("/dict", list);

module.exports = router;
