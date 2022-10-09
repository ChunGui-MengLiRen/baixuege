const jwt = require("jsonwebtoken");
const db = require("../db/index");
const dayjs = require("dayjs");

// 根据token获取当前登录的用户名
function getCurrentUser(auth) {
  auth = auth.replace("Bearer ", "");
  return jwt.verify(auth, "baixuege-token");
}

// 获取首页详情 - 页面
const pageHomeDetail = async (ctx, next) => {
  try {
    const sql = `select * from home where status=1`;
    const res = await db.query(sql);

    if (res) {
      ctx.body = {
        status: "1",
        message: "获取成功",
        data: res,
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

// 获取文章列表
const pageArticleList = async (ctx, next) => {
  const { page, data } = ctx.request.body;

  console.log(page, data);
  try {
    const res = await db.query(
      `select count(*) as total from article where is_del='0'`
    );
    const total = res[0].total; // 总数
    const pageSize = page.pageSize; // 每页条数
    const current = page.current; //当前页数
    const pages = Math.ceil(total / pageSize); // 总页数

    console.log("total", res[0]);

    const sql = `select * from article where status=1 and is_del=0 limit ${
      (current - 1) * pageSize
    },${pageSize}`;

    console.log(sql);

    const result = await db.query(sql);

    console.log(result);

    if (result) {
      ctx.body = {
        status: "1",
        message: "获取成功",
        data: {
          page: {
            current,
            pageSize,
            pages,
            total,
          },
          data: result.map((item) => {
            return {
              ...item,
              time: dayjs(item.time).format("YYYY-MM-DD HH:mm:ss"),
            };
          }),
        },
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

// 获取文章详情
const pageArticleDetail = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    const sql = `select * from article where id='${id}'`;
    const res = await db.query(sql);

    console.log("id", id);

    if (res) {
      ctx.body = {
        status: "1",
        message: "获取成功",
        data: res,
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

// 获取说说列表
const pageSayList = async (ctx, next) => {
  const { page, data } = ctx.request.body;

  console.log(page, data);
  try {
    const res = await db.query(
      `select count(*) as total from say where is_del='0'`
    );
    const total = res[0].total; // 总数
    const pageSize = page.pageSize; // 每页条数
    const current = page.current; //当前页数
    const pages = Math.ceil(total / pageSize); // 总页数

    console.log("total", res[0]);

    const sql = `select * from say where is_del=0 limit ${
      (current - 1) * pageSize
    },${pageSize}`;

    console.log(sql);

    const result = await db.query(sql);

    if (result) {
      ctx.body = {
        status: "1",
        message: "获取成功",
        data: {
          page: {
            current,
            pageSize,
            pages,
            total,
          },
          data: result.map((item) => {
            return {
              ...item,
              time: dayjs(item.time).format("YYYY-MM-DD HH:mm:ss"),
            };
          }),
        },
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

// 获取首页详情
const pageAboutDetail = async (ctx, next) => {
  try {
    const sql = `select * from about`;
    const res = await db.query(sql);

    if (res) {
      ctx.body = {
        status: "1",
        message: "获取成功",
        data: res,
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

// 获取字典
const pageDict = async (ctx, next) => {
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

module.exports = {
  pageHomeDetail,
  pageArticleList,
  pageArticleDetail,
  pageSayList,
  pageAboutDetail,
  pageDict,
};
