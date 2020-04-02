import request from '@/utils/request';
import axios from '@/utils/axiosRequest';
import { ShippedParams } from './data';


export async function getOrderDetails(orderId: string) {
  const result = (
    await axios({
      method: 'get',
      url: `order/${orderId}`,
    })
  ).data;

  return {
    data: result,
    success: true,
  };
}



export async function shipped(shipped: ShippedParams) {
  const result = (
    await axios({
      method: 'put',
      url: `order/shipped`,
      data: shipped
    })
  ).data;

  return {
    data: result,
    success: true,
  };
}



export async function received(orderId: string) {
  const result = (
    await axios({
      method: 'put',
      url: `order/received`,
      data: { orderId }
    })
  ).data;

  return {
    data: result,
    success: true,
  };
}
