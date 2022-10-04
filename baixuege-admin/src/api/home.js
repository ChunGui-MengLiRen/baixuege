import request from '../request';

// 获取主页列表
export function getHomeList(data) {
  return request({
    url: `/home/list`,
    method: 'post',
    data
  });
}

// 新增主页
export function addHome(data) {
  return request({
    url: `/home/add`,
    method: 'post',
    data
  });
}

// 获取主页详情
export function getDetail(id) {
  return request({
    url: `/home/detail?id=` + id,
    method: 'get'
  });
}

// 更新主页
export function updateHome(data) {
  return request({
    url: `/home/update`,
    method: 'post',
    data
  });
}

// 删除主页
export function delHome(id) {
  return request({
    url: `/home/delete?id=` + id,
    method: 'get'
  });
}

// 更改状态
export function changeStatus(id) {
  return request({
    url: `/home/change?id=` + id,
    method: 'get'
  });
}
