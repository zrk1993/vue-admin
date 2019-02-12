import axios from 'axios';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';
import { ENV } from '../userAgent';

const baseURL = ENV === 'production' ? 'http://193.112.47.114:3000' : 'http://localhost:3000';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const request = axios.create({
  baseURL,
  timeout: 180000, // request timeout
});

request.defaults.withCredentials = true;

// 添加请求拦截器
request.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  NProgress.start();
  return config;
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use((response) => {
  NProgress.done();
  if (response.data.code !== 200) {
    Message({
      message: response.data.message,
      type: 'error',
      showClose: true,
      duration: 5 * 1000,
    });
    return Promise.reject(new Error(response.data.message));
  }
  return response.data;
}, (error) => {
  NProgress.done();
  let msg = error.message;
  if (error.response && error.response.data) {
    msg = error.response.data.message || error.response.data.result || error.message;
  }
  Message({
    message: msg,
    type: 'error',
    showClose: true,
    duration: 5 * 1000,
  });
  return Promise.reject(error);
});

request.install = function install(Vue) {
  Vue.axios = axios;

  Object.defineProperties(Vue.prototype, {
    axios: {
      get: function get() {
        return request;
      },
    },
    $http: {
      get: function get() {
        return request;
      },
    },
  });
};

export { request as default, axios, baseURL };
