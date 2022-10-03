import request from '../request';

// 获取文章列表
export function getArticleList(data) {
  return request({
    url: `/article/list`,
    method: 'post',
    data,
  });
}

// 新增文章
export function addArticle(data) {
  return request({
    url: `/article/add`,
    method: 'post',
    data,
  });
}

// 获取文章详情
export function getDetail(id) {
  return request({
    url: `/article/detail?id=` + id,
    method: 'get',
  });
}

// 更新文章
export function updateArticle(data) {
  return request({
    url: `/article/update`,
    method: 'post',
    data,
  });
}

// 删除文章
export function delArticle(id) {
  return request({
    url: `/article/delete?id=` + id,
    method: 'get',
  });
}

// 更改状态
export function changeStatus(id, status) {
  return request({
    url: `/article/change?id=${id}&status=${status}`,
    method: 'get',
  });
}
