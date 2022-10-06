import request from '../request';

// 获取说说列表
export function getTagsList(data) {
  return request({
    url: `/tags/list`,
    method: 'post',
    data
  });
}

// 新增说说
export function addTags(data) {
  return request({
    url: `/tags/add`,
    method: 'post',
    data
  });
}

// 获取说说详情
export function getDetail(id) {
  return request({
    url: `/tags/detail?id=` + id,
    method: 'get'
  });
}

// 更新说说
export function updateTags(data) {
  return request({
    url: `/tags/update`,
    method: 'post',
    data
  });
}

// 删除说说
export function delTags(id) {
  return request({
    url: `/tags/delete?id=` + id,
    method: 'get'
  });
}
