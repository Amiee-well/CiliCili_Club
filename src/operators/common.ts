/*
 * @Author: morijiu
 * @Date: 2024-07-12 18:40:52
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-24 14:53:46
 * @Description:
 * @FilePath: \Nexior-main\src\operators\common.ts
 */
import store from '@/store';
import { getBaseUrlPlatform } from '@/utils';
import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

const httpClient: AxiosInstance = axios.create({
  baseURL: `${getBaseUrlPlatform()}/api/v1`,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json'
  },
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  }
});

httpClient.interceptors.request.use((config) => {
  const accessToken = store.getters.token?.access;
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const code = [444, 401, 406];
    if (code.indexOf(error?.response?.status) > -1) {
      // 如果当前页面是/auth/login，就不跳转，保持现状即可
      const whiteList = ['/auth/login', '/intro'];
      const pathname = window.location.pathname;
      let flag = true;
      whiteList.forEach((item) => {
        if (pathname.indexOf(item) !== -1) {
          flag = false;
        }
      });
      if (flag) {
        store.dispatch('login');
      }
    }
    return Promise.reject(error);
  }
);

export { httpClient };
