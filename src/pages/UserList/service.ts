import request from '@/utils/request';
import axios from '@/utils/axiosRequest';
import { TableListParams, TableListItem } from './data.d';

export async function queryRule(params?: TableListParams) {
  const result = (
    await axios({
      method: 'get',
      url: 'users/',
      data: params,
    })
  ).data;

  return {
    data: result.users,
    total: result.users.length,
    success: true,
  };
}

export async function removeRule(params: { key: number[] }) {
  console.log(params);
  return {};
}

export async function addRule(params: TableListItem) {
  await axios({
    method: 'post',
    url: 'users/',
    data: params,
  });
  return {};
}

export async function updateRule(params: TableListParams) {
  await axios({
    method: 'put',
    url: 'users/',
    data: params,
  });

  return {};
}

export async function getRoleList() {
  return axios({
    method: 'get',
    url: 'role/',
    data: {},
  });
}

export async function assignRole(params: any) {
  await axios({
    method: 'put',
    url: 'users/assignrole',
    data: params,
  });

  return {};
}

export async function updatePassword(params: any) {
  await axios({
    method: 'put',
    url: 'users/updatepassword',
    data: params,
  });

  return {};
}
