import request from '@/utils/request';
import axios from '@/utils/axiosRequest';

export async function query(params: any) {
  return axios({
    method: 'get',
    url: 'appInfo/${params}',
  });

  // return request('/api/users');
}

export async function edit(params: any) {
  return axios({
    method: 'put',
    url: 'appInfo/',
    data: params,
  });
}
