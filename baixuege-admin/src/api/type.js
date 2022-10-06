import request from '../request';

// 获取说说列表
export function getTypeList(data) {
  return request({
    url: `/type/list`,
    method: 'post',
    data
  });
}

// 新增说说
export function addType(data) {
  return request({
    url: `/type/add`,
    method: 'post',
    data
  });
}

// 获取说说详情
export function getDetail(id) {
  return request({
    url: `/type/detail?id=` + id,
    method: 'get'
  });
}

// 更新说说
export function updateType(data) {
  return request({
    url: `/type/update`,
    method: 'post',
    data
  });
}

// 删除说说
export function delType(id) {
  return request({
    url: `/type/delete?id=` + id,
    method: 'get'
  });
}
