import request from '@/utils/request';
import axios from 'axios';
import { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  const result = (
    await axios({
      method: 'get',
      url: 'http://127.0.0.1:5000/api/v1/role/',
      data: params,
    })
  ).data;

  return {
    data: result.roles,
    total: result.roles.length,
    success: true,
  };
}

export async function removeRule(params: { key: number[] }) {
  console.log(params);
  return {};
}

export async function addRule(params: TableListParams) {
  await axios({
    method: 'post',
    url: 'http://127.0.0.1:5000/api/v1/role/',
    data: params,
  });
  return {};
}

export async function updateRule(params: TableListParams) {
  await axios({
    method: 'put',
    url: 'http://127.0.0.1:5000/api/v1/role/',
    data: params,
  });

  return {};
}

export async function getPermissionList() {
  return axios({
    method: 'get',
    url: 'http://127.0.0.1:5000/api/v1/permission/',
    data: {},
  });
}
