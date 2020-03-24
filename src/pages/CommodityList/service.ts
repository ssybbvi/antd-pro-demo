import request from '@/utils/request';
import axios from '@/utils/axiosRequest';
import { CommodityTableListParams, CommodityTableListItem } from './data.d';

export async function queryRule(params?: CommodityTableListParams) {
  const result = (
    await axios({
      method: 'get',
      url: 'commodity',
      data: params,
    })
  ).data;

  return {
    data: result.commoditys,
    total: result.commoditys.length,
    success: true,
  };
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

export async function addRule(params: CommodityTableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: CommodityTableListItem) {
  await axios({
    method: 'put',
    url: 'commodity',
    data: params,
  });

  return {};
}
