import request from '@/utils/request';
import axios from 'axios';

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
      url: 'http://localhost:5000/api/v1/users/login',
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
