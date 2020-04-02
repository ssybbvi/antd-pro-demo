import request from '@/utils/request';
import axios from '@/utils/axiosRequest';


export async function queryBasicProfile(orderId: string) {
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
