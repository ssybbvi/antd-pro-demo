import request from '@/utils/request';
import axios from 'axios';

export async function query(params: any) {
  return axios({
    method: 'get',
    url: `http://127.0.0.1:5000/api/v1/appInfo/${params}`,
  });

  // return request('/api/users');
}

export async function edit(params: any) {
  return axios({
    method: 'put',
    url: `http://127.0.0.1:5000/api/v1/appInfo/`,
    data: params,
  });
}
