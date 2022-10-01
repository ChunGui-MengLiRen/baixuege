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
    const res = await db.query(`select count(*) as total from article`);
    const total = res[0].total; // 总数
    const pageSize = page.pageSize; // 每页条数
    const current = page.current; //当前页数
    const pages = Math.ceil(total / pageSize); // 总页数

    console.log('total', res[0]);

    let search = [];
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        search.push(`${key}='${data[key]}'`);
      }
    });
    const str = search.join(' and ');

    console.log(str);

    const result = await db.query(
      `select *  from article where ${str} limit ${current - 1},${pageSize}`
    );

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
          data: result,
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

    const updateField = [...Object.keys(data), 'time'].join(',');
    const updateValue = [
      ...Object.values(data).map((item) => `'${item}'`),
      `'${dayjs().format('YYYY-MM-DD HH:mm:ss')}'`,
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
      if (key !== 'id') field.push(`${key}='${data[key]}'`);
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

module.exports = {
  articleList,
  addArticle,
  articleDetail,
  updateArticle,
  delArticle,
};
