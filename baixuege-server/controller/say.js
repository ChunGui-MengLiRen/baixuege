const jwt = require("jsonwebtoken");
const db = require("../db/index");
const dayjs = require("dayjs");

// 根据token获取当前登录的用户名
function getCurrentUser(auth) {
  auth = auth.replace("Bearer ", "");
  return jwt.verify(auth, "baixuege-token");
}

// 获取说说列表
const sayList = async (ctx, next) => {
  const {
    page,
    data: { author_name, time },
  } = ctx.request.body;

  try {
    const res = await db.query(
      `select count(*) as total from say where is_del='0'`
    );
    const total = res[0].total; // 总数
    const pageSize = page.pageSize; // 每页条数
    const current = page.current; //当前页数
    const pages = Math.ceil(total / pageSize); // 总页数

    console.log("total", res[0]);

    let sql = "";
    if (time.length) {
      sql = `select * from say where author_name like '%${author_name}%' and time between '${
        time[0]
      }' and '${time[1]}' and is_del='0' limit ${
        (current - 1) * pageSize
      },${pageSize}`;
    } else {
      sql = `select * from say where author_name like '%${author_name}%' and is_del='0' limit ${
        (current - 1) * pageSize
      },${pageSize}`;
    }
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

// 新增说说
const sayAdd = async (ctx, next) => {
  try {
    const { content } = ctx.request.body;
    const author_name = getCurrentUser(ctx.header.authorization).nickname;
    const author_id = getCurrentUser(ctx.header.authorization).id;

    const sql = `insert into say (content,author_name,author) values ('${content}','${dayjs().format(
      "YYYY-MM-DD HH:mm:ss"
    )}','${author_name}',${author_id});`;
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

// 获取说说详情
const sayDetail = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;

    const sql = `select * from say where id='${id}'`;

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

// 更新说说
const sayUpdate = async (ctx, next) => {
  try {
    const { id, content } = ctx.request.body;

    const sql = `update say set content='${content}' where id='${id}'`;

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

// 删除说说
const sayDel = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    console.log("id", id);

    const sql = `update say set is_del='1' where id='${id}'`;

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

module.exports = {
  sayList,
  sayAdd,
  sayDetail,
  sayUpdate,
  sayDel,
};
