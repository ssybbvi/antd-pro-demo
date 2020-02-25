import request from '@/utils/request';
import axios from 'axios';
import { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  const result = (
    await axios({
      method: 'get',
      url: 'http://test-xald-management.ixald.com/api/v1/appInfo/',
      data: params,
    })
  ).data;

  return {
    data: result.appInfos,
    total: result.appInfos.length,
    success: true,
  };

  // return request('/api/rule', {
  //   params,
  // });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  // axios

  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
