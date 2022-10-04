import axios from 'axios';
import { message } from 'ant-design-vue';
import router from '../router';

// import store from '@/store';

// let is302count = 0;

// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded';
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  withCredentials: true,
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('BAIXUEGE_TOKEN');
    if (token) {
      config.headers.authorization = 'Bearer ' + token; //将token放到请求头发送给服务器
    }

    // 如果是get请求 参数增加时间戳，否则ie可能会不走服务器从缓存拿数据
    const ua = navigator.userAgent;
    if (config.method.toLowerCase() === 'get' && ua.indexOf('MSIE') >= 1) {
      const t = new Date().getTime();
      if (config.params) {
        config.params['t'] = t;
      } else {
        config.url += `${config.url.indexOf('?') > -1 ? '&' : '?'}=${t}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    console.log(response);
    return response.data;
    // if (res.status !== '1') {
    //   let msg = res.msg;
    //   // if (
    //   //   res.hasOwnProperty('actionModel') &&
    //   //   res.actionModel.hasOwnProperty('descr')
    //   // ) {
    //   //   msg = res.actionModel.descr;
    //   // }
    //   // 这里需要做 404等页面跳转
    //   return res;
    // } else {
    //   return res;
    // }
  },
  (error) => {
    // let msg = error.message;
    // if (error.response) {
    //   if (error.response.status === 401) {
    //     message.warning('请登录');
    //     router.replace('/login');
    //   }
    //   // return Promise.reject(error);
    // }
    // console.log(error);
    return Promise.reject(error);
  }
);

export default service;
