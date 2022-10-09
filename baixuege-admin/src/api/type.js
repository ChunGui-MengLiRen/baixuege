import request from "../request";

// 获取类型列表
export function getTypeList(data) {
  return request({
    url: `/type/list`,
    method: "post",
    data,
  });
}

// 新增类型
export function addType(data) {
  return request({
    url: `/type/add`,
    method: "post",
    data,
  });
}

// 获取类型详情
export function getDetail(id) {
  return request({
    url: `/type/detail?id=` + id,
    method: "get",
  });
}

// 更新类型
export function updateType(data) {
  return request({
    url: `/type/update`,
    method: "post",
    data,
  });
}

// 删除类型
export function delType(id) {
  return request({
    url: `/type/delete?id=` + id,
    method: "get",
  });
}
