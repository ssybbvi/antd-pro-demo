import request from '@/utils/request';
import axios from 'axios';
import { TableListParams, TableListItem } from './data.d';

export async function queryRule(params?: TableListParams) {
  const result = (
    await axios({
      method: 'get',
      url: 'http://test-xald-management.ixald.com/api/v1/users/',
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
    url: 'http://test-xald-management.ixald.com/api/v1/users/',
    data: params,
  });
  return {};
}

export async function updateRule(params: TableListParams) {
  await axios({
    method: 'put',
    url: 'http://test-xald-management.ixald.com/api/v1/users/',
    data: params,
  });

  return {};
}

export async function getRoleList() {
  return axios({
    method: 'get',
    url: 'http://test-xald-management.ixald.com/api/v1/role/',
    data: {},
  });
}

export async function assignRole(params: any) {
  await axios({
    method: 'put',
    url: 'http://test-xald-management.ixald.com/api/v1/users/assignrole',
    data: params,
  });

  return {};
}
