/* eslint-disable no-param-reassign */
import axios from 'axios'; // 引用axios
import { notification } from 'antd';
import defaultSettings from '../../config/defaultSettings';
import { getTokenForClent } from './authority';

// axios 配置
axios.defaults.timeout = 5000; // 设置超时时间

axios.defaults.baseURL = defaultSettings.apiUrl; // 这是调用数据接口
// 'http://127.0.0.1:5000/api/v1/';
// http request 拦截器（所有发送的请求都要从这儿过一次），通过这个，我们就可以把token传到后台，我这里是使用sessionStorage来存储token等权限信息和用户信息，若要使用cookie可以自己封装一个函数并import便可使用
axios.interceptors.request.use(
  (config: any) => {
    const token = getTokenForClent(); // 获取存储在本地的token
    // config.data = JSON.stringify(config.data);
    // config.headers = {
    //   'Content-Type': 'application/json', // 设置跨域头部,虽然很多浏览器默认都是使用json传数据，但咱要考虑IE浏览器。
    // };
    if (token) {
      config.headers.authorization = token; // 携带权限参数
    }
    return config;
  },
  err => Promise.reject(err),
);

// http response 拦截器（所有接收到的请求都要从这儿过一次）
axios.interceptors.response.use(
  response => {
    if (response.data && response.data.message) {
      notification.error({
        message: `请求错误`,
        description: response.data.message,
      });
    }
    return response;
  },
  // response.status===401是我和后台约定的权限丢失或者权限不够返回的状态码，这个可以自己和后台约定，约定返回某个自定义字段也是可以的
  // if (response.status === 401) {
  //   router.push({
  //     // push后面是一个参数对象，可以携带很多参数，具体可以去vue-router上查看，例如query字段表示携带的参数
  //     path: '/login',
  //   });
  // }
  error => Promise.reject(error.response.data),
);

export default axios;
