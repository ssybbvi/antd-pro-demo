import request from '@/utils/request';
import { BasicListItemDataType } from './data.d';
import axios from '@/utils/axiosRequest';

interface ParamsType extends Partial<BasicListItemDataType> {
  count?: number;
}

export async function queryFakeList(params: ParamsType) {
  const result = (
    await axios({
      method: 'get',
      url: 'order/temp',
      data: params,
    })
  ).data;

  return {
    data: result,
    total: result.length,
    success: true,
  };
}

export async function removeFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'update',
    },
  });
}
