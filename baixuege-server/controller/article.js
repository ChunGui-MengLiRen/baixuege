const jwt = require("jsonwebtoken");
const db = require("../db/index");
const dayjs = require("dayjs");

// 根据token获取当前登录的用户名
function getCurrentUser(auth) {
  auth = auth.replace("Bearer ", "");
  return jwt.verify(auth, "baixuege-token");
}

// 获取文章列表
const articleList = async (ctx, next) => {
  const {
    page,
    data: { title, time, status },
  } = ctx.request.body;

  try {
    const res = await db.query(
      `select count(*) as total from article where is_del=0`
    );
    const total = res[0].total; // 总数
    const pageSize = page.pageSize; // 每页条数
    const current = page.current; //当前页数
    const pages = Math.ceil(total / pageSize); // 总页数

    console.log("total", res[0]);

    let sql = "";
    if (time.length) {
      sql = `select * from article where name like '%${title}%' and time between '${
        time[0]
      }' and '${time[1]}' ${
        typeof status == "number" ? "and status=" + status : ""
      } and is_del='0' order by time desc limit ${
        (current - 1) * pageSize
      },${pageSize}`;
    } else {
      sql = `select * from article where title like '%${title}%' ${
        typeof status == "number" ? "and status=" + status : ""
      } and is_del='0' order by time desc limit ${
        (current - 1) * pageSize
      },${pageSize}`;
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

// 新增文章
const articleAdd = async (ctx, next) => {
  try {
    const {
      title,
      image,
      info,
      content,
      status,
      type,
      tag,
      type_name,
      tag_name,
    } = ctx.request.body;

    const author_name = getCurrentUser(ctx.header.authorization).nickname;
    const author = getCurrentUser(ctx.header.authorization).id;

    const sql = `insert into article (title,image,info,content,status,type,tag,type_name,tag_name,time,author_name,author) values ('${title}','${image}','${info}','${content}',${status},'${type}','${tag}','${type_name}','${tag_name}','${dayjs().format(
      "YYYY-MM-DD HH:mm:ss"
    )}','${author_name}',${author});`;
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

// 获取文章详情
const articleDetail = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    console.log("id", id);

    const sql = `select * from article where id='${id}'`;

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

// 更新文章
const articleUpdate = async (ctx, next) => {
  try {
    const {
      id,
      title,
      image,
      info,
      content,
      status,
      type,
      tag,
      type_name,
      tag_name,
    } = ctx.request.body;

    const sql = `update article set title='${title}',image='${image}',info='${info}',content='${content}',status=${status},type='${type}',tag='${tag}' ,type_name='${type_name}',tag_name='${tag_name}' where id='${id}'`;
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

// 删除文章
const articleDel = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    console.log("id", id);

    const sql = `update article set is_del='1' where id='${id}'`;

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

// 更改文章状态
const articleChangeStatus = async (ctx, next) => {
  try {
    const { id, status } = ctx.request.query;
    console.log("id", id);

    const sql = `update article set status=${status} where id='${id}'`;

    const res = await db.query(sql);

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
  articleList,
  articleAdd,
  articleDetail,
  articleUpdate,
  articleDel,
  articleChangeStatus,
};
