const jwt = require("jsonwebtoken");
const db = require("../db/index");

// 根据token获取当前登录的用户名
function getCurrentUser(auth) {
  auth = auth.replace("Bearer ", "");
  return jwt.verify(auth, "baixuege-token");
}

// 登录
const userLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (username == "" || password == "") {
    ctx.body = {
      status: "0",
      message: "请输入用户名或密码",
    };
    return;
  }
  console.log(username, password);
  try {
    const sql = `select * from users where username='${username}' and password='${password}'`;

    const res = await db.query(sql);
    console.log("res", res);

    if (res.length) {
      // 签发token
      const token = jwt.sign(
        {
          //返回的数据
          username: res[0].username,
          nickname: res[0].nickname,
          id: res[0].id,
        },
        //加密的字符
        "baixuege-token",
        //token 有效期
        {
          expiresIn: 3600 * 24 * 3,
        }
      );

      ctx.body = {
        status: "1",
        message: "登录成功",
        data: {
          token,
        },
      };
    } else {
      ctx.body = {
        status: "0",
        message: "账号或者密码不正确",
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
  userLogin,
};
