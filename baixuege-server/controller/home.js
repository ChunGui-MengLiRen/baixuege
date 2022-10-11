const jwt = require("jsonwebtoken");
const db = require("../db/index");
const dayjs = require("dayjs");

// 根据token获取当前登录的用户名
function getCurrentUser(auth) {
  auth = auth.replace("Bearer ", "");
  return jwt.verify(auth, "baixuege-token");
}

// 获取首页列表
const homeList = async (ctx, next) => {
  const {
    page,
    data: { name, text, time, status },
  } = ctx.request.body;

  try {
    const res = await db.query(
      `select count(*) as total from home where is_del='0'`
    );
    const total = res[0].total; // 总数
    const pageSize = page.pageSize; // 每页条数
    const current = page.current; //当前页数
    const pages = Math.ceil(total / pageSize); // 总页数

    console.log("total", res[0]);

    let sql = "";
    if (time.length) {
      sql = `select * from home where name like '%${name}%' and text like '%${text}%' and time between '${
        time[0]
      }' and '${time[1]}' ${
        typeof status == "number" ? "and status=" + status : ""
      } and is_del='0' limit ${(current - 1) * pageSize},${pageSize}`;
    } else {
      sql = `select * from home where name like '%${name}%' and text like '%${text}%' ${
        typeof status == "number" ? "and status=" + status : ""
      } and is_del='0' limit ${(current - 1) * pageSize},${pageSize}`;
    }
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

// 新增首页
const homeAdd = async (ctx, next) => {
  try {
    const { name, text, back_image, is_shici } = ctx.request.body;

    const sql = `insert into home (name,text,back_image,time,is_shici) values ('${name}','${text}','${back_image},${
      is_shici ? 1 : 0
    }','${dayjs().format("YYYY-MM-DD HH:mm:ss")}');`;
    console.log(sql);

    const res = await db.query(sql);
    console.log(res);

    if (res) {
      ctx.body = {
        status: "1",
        message: "新增成功",
      };
    } else {
      ctx.body = {
        status: "0",
        message: "新增失败",
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
const homeDetail = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    console.log("id", id);

    const sql = `select * from home where id='${id}'`;

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

// 更新首页
const homeUpdate = async (ctx, next) => {
  try {
    const { id, name, text, back_image, is_shici } = ctx.request.body;

    const sql = `update home set name='${name}',text='${text}',back_image='${back_image}',is_shici=${
      is_shici ? 1 : 0
    } where id='${id}'`;
    console.log(sql);

    const res = await db.query(sql);
    console.log(res);

    if (res) {
      ctx.body = {
        status: "1",
        message: "更新成功",
      };
    } else {
      ctx.body = {
        status: "0",
        message: "更新失败",
      };
    }
  } catch (error) {
    ctx.body = {
      status: "0",
      message: error.message,
    };
  }
};

// 删除首页
const homeDel = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    console.log("id", id);

    const sql = `update home set is_del='1' where id='${id}'`;

    const res = await db.query(sql);

    if (res) {
      ctx.body = {
        status: "1",
        message: "删除成功",
      };
    } else {
      ctx.body = {
        status: "0",
        message: "删除失败",
      };
    }
  } catch (error) {
    ctx.body = {
      status: "0",
      message: error.message,
    };
  }
};

// 更改首页状态
const homeChangeStatus = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    console.log("id", id);

    const sql1 = `update home set status=0 where is_del='0'`;
    const sql2 = `update home set status=1 where id='${id}'`;
    await db.query(sql1);
    const res = await db.query(sql2);
    if (res) {
      ctx.body = {
        status: "1",
        message: "更新成功",
      };
    } else {
      ctx.body = {
        status: "0",
        message: "更新失败",
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
  homeList,
  homeAdd,
  homeDetail,
  homeUpdate,
  homeDel,
  homeChangeStatus,
};
