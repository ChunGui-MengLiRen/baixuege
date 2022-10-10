const jwt = require("jsonwebtoken");
const db = require("../db/index");
const dayjs = require("dayjs");

// 根据token获取当前登录的用户名
function getCurrentUser(auth) {
  auth = auth.replace("Bearer ", "");
  return jwt.verify(auth, "baixuege-token");
}

// 获取菜单列表
const menuList = async (ctx, next) => {
  const {
    page,
    data: { menu_name, menu_router, status },
  } = ctx.request.body;

  try {
    const res = await db.query(
      `select count(*) as total from menu where is_del='0'`
    );
    const total = res[0].total; // 总数
    const pageSize = page.pageSize; // 每页条数
    const current = page.current; //当前页数
    const pages = Math.ceil(total / pageSize); // 总页数

    console.log("total", res[0]);

    let sql = `select * from menu where menu_name like '%${menu_name}%' and menu_router like '%${menu_router}%' ${
      typeof status == "number" ? "and status=" + status : ""
    } and is_del='0' order by sn limit ${(current - 1) * pageSize},${pageSize}`;

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

// 新增菜单
const menuAdd = async (ctx, next) => {
  try {
    const { menu_name, menu_router, sn, status = 1 } = ctx.request.body;

    const querySQL = `select * from menu where (menu_name='${menu_name}' or menu_router='${menu_router}' or sn=${sn}) and is_del='0'`;

    const queryResult = await db.query(querySQL);

    if (queryResult.length) {
      const {
        menu_name: data_name,
        menu_router: data_router,
        sn: data_sn,
      } = queryResult[0];
      let message = `${data_name == menu_name ? "菜单名称已存在！" : ""}${
        menu_router == data_router ? "菜单路由已存在！" : ""
      }${sn == data_sn ? "排序已存在！" : ""}`;
      return (ctx.body = {
        status: "0",
        message,
      });
    }

    const sql = `insert into menu (menu_name,menu_router,sn,status,time) values ('${menu_name}','${menu_router}',${sn},${status},'${dayjs().format(
      "YYYY-MM-DD HH:mm:ss"
    )}');`;
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

// 获取菜单详情
const menuDetail = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    console.log("id", id);

    const sql = `select * from menu where id='${id}' and is_del='0'`;

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

// 更新菜单
const menuUpdate = async (ctx, next) => {
  try {
    const { id, menu_name, menu_router, sn, status } = ctx.request.body;

    const querySQL = `select * from menu where (menu_name='${menu_name}' or menu_router='${menu_router}' or sn=${sn}) and is_del='0' and id!=${id}`;

    console.log(querySQL);

    const queryResult = await db.query(querySQL);

    if (queryResult.length) {
      const {
        menu_name: data_name,
        menu_router: data_router,
        sn: data_sn,
      } = queryResult[0];
      let message = `${data_name == menu_name ? "菜单名称已存在！" : ""}${
        menu_router == data_router ? "菜单路由已存在！" : ""
      }${sn == data_sn ? "排序已存在！" : ""}`;
      return (ctx.body = {
        status: "0",
        message,
      });
    }

    const sql = `update menu set menu_name='${menu_name}',menu_router='${menu_router}',sn=${sn},status=${status} where id='${id}'`;
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

// 删除菜单
const menuDel = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    console.log("id", id);

    const sql = `update menu set is_del='1' where id='${id}'`;

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

// 更改菜单状态
const menuChangeStatus = async (ctx, next) => {
  try {
    const { id, status } = ctx.request.body;

    const sql = `update menu set status=${status} where id=${id} and is_del=0`;
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
  menuList,
  menuAdd,
  menuDetail,
  menuUpdate,
  menuDel,
  menuChangeStatus,
};
