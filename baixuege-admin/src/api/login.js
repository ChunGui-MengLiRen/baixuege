import request from '../request';

// 获取主页列表
export function login(data) {
  return request({
    url: `/users/login`,
    method: 'post',
    data,
  });
}



