const jwt = require('jsonwebtoken');
const db = require('../db/index');
const dayjs = require('dayjs');

// 根据token获取当前登录的用户名
function getCurrentUser(auth) {
  auth = auth.replace('Bearer ', '');
  return jwt.verify(auth, 'baixuege-token');
}

// 获取类型列表
const typeList = async (ctx, next) => {
  const { page, data } = ctx.request.body;
  try {
    const res = await db.query(
      `select count(*) as total from type where is_del='0'`
    );
    const total = res[0].total; // 总数
    const pageSize = page.pageSize; // 每页条数
    const current = page.current; //当前页数
    const pages = Math.ceil(total / pageSize); // 总页数

    console.log('total', res[0]);

    const sql = `select * from type where label like '%${
      data.label ? data.label : ''
    }%' and is_del='0' limit ${(current - 1) * pageSize},${pageSize}`;

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

// 新增类型
const typeAdd = async (ctx, next) => {
  try {
    const { label, value } = ctx.request.body;

    if (!label || !value) {
      return (ctx.body = {
        status: '0',
        message: '类型名称或类型数值不存在',
      });
    }

    const querySQL = `select * from type where label='${label}' or value='${value}' and is_del='0'`;

    const queryResult = await db.query(querySQL);

    if (queryResult.length) {
      return (ctx.body = {
        status: '0',
        message: '类型名称或类型数值已经存在',
      });
    }

    const sql = `insert into type (label,value) values ('${label}','${value}');`;

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

// 获取类型详情
const typeDetail = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    const sql = `select * from type where id='${id}' and is_del='0'`;
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

// 更新类型
const typeUpdate = async (ctx, next) => {
  try {
    const { id, label, value } = ctx.request.body;

    if (!id) {
      return (ctx.body = {
        status: '0',
        message: 'id不存在',
      });
    } else if (!label || !value) {
      return (ctx.body = {
        status: '0',
        message: '类型标签或类型数值不存在',
      });
    }

    const sql = `update type set label='${label}',value='${value}' where id='${id}'`;

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

// 删除类型
const typeDel = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    const sql = `update type set is_del='1' where id='${id}'`;
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
  typeList,
  typeAdd,
  typeDetail,
  typeUpdate,
  typeDel,
};
