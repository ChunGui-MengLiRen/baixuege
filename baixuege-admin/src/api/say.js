import request from '../request';

// 获取说说列表
export function getSayList(data) {
  return request({
    url: `/say/list`,
    method: 'post',
    data
  });
}

// 新增说说
export function addSay(data) {
  return request({
    url: `/say/add`,
    method: 'post',
    data
  });
}

// 获取说说详情
export function getDetail(id) {
  return request({
    url: `/say/detail?id=` + id,
    method: 'get'
  });
}

// 更新说说
export function updateSay(data) {
  return request({
    url: `/say/update`,
    method: 'post',
    data
  });
}

// 删除说说
export function delSay(id) {
  return request({
    url: `/say/delete?id=` + id,
    method: 'get'
  });
}
