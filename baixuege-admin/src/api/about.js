import request from '../request';

// 获取关于详情
export function getDetail() {
  return request({
    url: `/about/detail`,
    method: 'get',
  });
}

// 更新关于
export function updateAbout(data) {
  return request({
    url: `/about/update`,
    method: 'post',
    data,
  });
}
