import request from '../request';

// 获取主页
export function getHome() {
  return request({
    url: `/page/home`,
    method: 'get'
  });
}

// 获取文章列表
export function getArticleList(data) {
  return request({
    url: `/page/articleList`,
    method: 'post',
    data
  });
}

// 获取文章详情
export function getArticleDetail(id) {
  return request({
    url: `/page/articleDetail?id=` + id,
    method: 'get'
  });
}

// 获取说说列表
export function getSayList(data) {
  return request({
    url: `/page/sayList`,
    method: 'post',
    data
  });
}

// 获取关于详情
export function getAboutDetail() {
  return request({
    url: `/page/aboutDetail`,
    method: 'get'
  });
}

// 获取字典
export function getDict() {
  return request({
    url: `/page/dict`,
    method: 'get'
  });
}
