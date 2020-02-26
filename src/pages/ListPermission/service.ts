import request from '@/utils/request';
import axios from '@/utils/axiosRequest';
import { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  const result = (
    await axios({
      method: 'get',
      url: 'permission/',
      data: params,
    })
  ).data;

  return {
    data: result.permissions,
    total: result.permissions.length,
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
    url: 'permission/',
    data: params,
  });
  return {};
}

export async function updateRule(params: TableListParams) {
  await axios({
    method: 'put',
    url: 'permission/',
    data: params,
  });

  return {};
}
