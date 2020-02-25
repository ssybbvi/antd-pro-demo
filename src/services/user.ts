import request from '@/utils/request';
import axios from 'axios';
import { getTokenForClent } from '@/utils/authority';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  // const token = getTokenForClent();
  // return axios({
  //   method: 'get',
  //   url: '127.0.0.1:5000/api/v1/users/me',
  //   data: {},
  //   headers: {
  //     authorization: token,
  //   },
  // });
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
