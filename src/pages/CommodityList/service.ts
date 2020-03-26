import request from '@/utils/request';
import axios from '@/utils/axiosRequest';
import { CommodityTableListParams, CommodityTableListItem } from './data.d';
import { FormValueType } from '../ListPermission/components/UpdateForm';

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

export async function addRule(params: FormValueType) {
  // return request('/api/rule', {
  //   method: 'POST',
  //   data: {
  //     ...params,
  //     method: 'post',
  //   },
  // });

  await axios({
    method: 'post',
    url: 'commodity',
    data: params,
  })

  return {
    success: true,
  };
}

export async function updateRule(params: CommodityTableListItem) {
  await axios({
    method: 'put',
    url: 'commodity',
    data: params,
  });

  return {};
}
