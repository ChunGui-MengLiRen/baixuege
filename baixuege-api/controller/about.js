const jwt = require('jsonwebtoken');
const db = require('../db/index');
const dayjs = require('dayjs');

// 根据token获取当前登录的用户名
function getCurrentUser(auth) {
  auth = auth.replace('Bearer ', '');
  return jwt.verify(auth, 'baixuege-token');
}

// 获取首页详情
const aboutDetail = async (ctx, next) => {
  try {
    const sql = `select * from about`;
    const res = await db.query(sql);

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

// 更新首页
const updateAbout = async (ctx, next) => {
  try {
    const { text, type } = ctx.request.body;

    const sql = `update about set ${type}='${text}'`;

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

module.exports = {
  aboutDetail,
  updateAbout,
};
