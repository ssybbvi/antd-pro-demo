import request from '@/utils/request';
import axios from '@/utils/axiosRequest';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return (
    await axios({
      method: 'post',
      url: 'up/authorization',
      data: params,
    })
  ).data;

  // return request('users/login', {
  //   method: 'POST',
  //   data: params,
  // });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
