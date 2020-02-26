import request from '@/utils/request';
import axios from '@/utils/axiosRequest';
import { getTokenForClent } from '@/utils/authority';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  const token = getTokenForClent();
  const result = await axios({
    method: 'get',
    url: 'users/me', // 'url: '/api/v1/users/me',
    data: {},
    headers: {
      authorization: token,
    },
  });

  return (result.data && result.data.user) || {};

  // return request('/api/currentUser');

  // return new Promise(res => {
  //   res({
  //     timestamp: 1513932555104,
  //     status: 401,
  //     error: 'Unauthorized',
  //     message: 'Unauthorized',
  //     path: '/base/category/list',
  //   });
  // });
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
