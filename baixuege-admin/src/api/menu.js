import request from "../request";

// 获取菜单列表
export function getMenuList(data) {
  return request({
    url: `/menu/list`,
    method: "post",
    data,
  });
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: `/menu/add`,
    method: "post",
    data,
  });
}

// 获取菜单详情
export function getDetail(id) {
  return request({
    url: `/menu/detail?id=` + id,
    method: "get",
  });
}

// 更新菜单
export function updateMenu(data) {
  return request({
    url: `/menu/update`,
    method: "post",
    data,
  });
}

// 删除菜单
export function delMenu(id) {
  return request({
    url: `/menu/delete?id=` + id,
    method: "get",
  });
}

// 更改状态
export function changeStatus(data) {
  return request({
    url: `/menu/change`,
    method: "post",
    data,
  });
}
