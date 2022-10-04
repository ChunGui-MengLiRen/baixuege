const jwt = require('jsonwebtoken');
const db = require('../db/index');
const dayjs = require('dayjs');

// 根据token获取当前登录的用户名
function getCurrentUser(auth) {
  auth = auth.replace('Bearer ', '');
  return jwt.verify(auth, 'baixuege-token');
}

// 获取文章列表
const articleList = async (ctx, next) => {
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

    console.log('total', res[0]);

    let search = [];
    Object.keys(data).forEach((key) => {
      if (key == 'title') {
        search.push(`${key} like '%${data[key]}%'`);
      } else if (key == 'time') {
        if (data[key].length) {
          search.push(`${key} between '${data[key][0]}' and '${data[key][1]}'`);
        }
      } else {
        search.push(`${key}='${data[key]}'`);
      }
    });
    const sql = `select * from article where ${[...search, "is_del='0'"].join(
      ' and '
    )} limit ${(current - 1) * pageSize},${pageSize}`;
    console.log(sql);

    const result = await db.query(sql);

    console.log(result);

    if (result) {
      ctx.body = {
        status: '1',
        message: '获取成功',
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
              time: dayjs(item.time).format('YYYY-MM-DD HH:mm:ss'),
            };
          }),
        },
      };
    } else {
      ctx.body = {
        status: '0',
        message: '获取失败',
      };
    }
  } catch (error) {
    ctx.body = {
      status: '0',
      message: error.message,
    };
  }
};

// 新增文章
const addArticle = async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const currentUser = getCurrentUser(ctx.header.authorization).nickname;

    const updateField = [...Object.keys(data), 'time', 'author_name'].join(',');
    const updateValue = [
      ...Object.values(data).map((item) => {
        if (typeof item == 'number') {
          return item;
        } else {
          return `'${item}'`;
        }
      }),
      `'${dayjs().format('YYYY-MM-DD HH:mm:ss')}'`,
      `'${currentUser}'`,
    ].join(',');

    const sql = `insert into article (${updateField}) values (${updateValue});`;

    console.log(sql);

    const res = await db.query(sql);
    console.log(res);

    if (res) {
      ctx.body = {
        status: '1',
        message: '新增成功',
      };
    } else {
      ctx.body = {
        status: '0',
        message: '新增失败',
      };
    }
  } catch (error) {
    ctx.body = {
      status: '0',
      message: error.message,
    };
  }
};

// 获取文章详情
const articleDetail = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    const sql = `select * from article where id='${id}'`;
    const res = await db.query(sql);

    console.log('id', id);

    if (res) {
      ctx.body = {
        status: '1',
        message: '获取成功',
        data: res,
      };
    } else {
      ctx.body = {
        status: '0',
        message: '获取失败',
      };
    }
  } catch (error) {
    ctx.body = {
      status: '0',
      message: error.message,
    };
  }
};

// 更新文章
const updateArticle = async (ctx, next) => {
  try {
    const data = ctx.request.body;

    const field = [];
    Object.keys(data).forEach((key) => {
      if (key !== 'id') {
        field.push(`${key}='${data[key]}'`);
      }
    });

    const sql = `update article set ${field.join()} where id='${data.id}'`;

    console.log(sql);

    const res = await db.query(sql);
    console.log(res);

    if (res) {
      ctx.body = {
        status: '1',
        message: '更新成功',
      };
    } else {
      ctx.body = {
        status: '0',
        message: '更新失败',
      };
    }
  } catch (error) {
    ctx.body = {
      status: '0',
      message: error.message,
    };
  }
};

// 删除文章
const delArticle = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    const sql = `update article set is_del='1' where id='${id}'`;
    const res = await db.query(sql);

    console.log('id', id);

    if (res) {
      ctx.body = {
        status: '1',
        message: '删除成功',
      };
    } else {
      ctx.body = {
        status: '0',
        message: '删除失败',
      };
    }
  } catch (error) {
    ctx.body = {
      status: '0',
      message: error.message,
    };
  }
};

// 更改文章状态
const changeStatus = async (ctx, next) => {
  try {
    const { id, status } = ctx.request.query;
    const sql = `update article set status='${status}' where id='${id}'`;
    const res = await db.query(sql);
    console.log('id', id);

    if (res) {
      ctx.body = {
        status: '1',
        message: '更新成功',
      };
    } else {
      ctx.body = {
        status: '0',
        message: '更新失败',
      };
    }
  } catch (error) {
    ctx.body = {
      status: '0',
      message: error.message,
    };
  }
};

module.exports = {
  articleList,
  addArticle,
  articleDetail,
  updateArticle,
  delArticle,
  changeStatus,
};
