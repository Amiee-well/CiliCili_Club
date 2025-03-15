/*
 * @Author: zhengduo
 * @Date: 2024-09-13 11:20:30
 * @LastEditors: zhengduo
 * @LastEditTime: 2024-11-26 15:43:59
 * @Description: file content
 */
import { AxiosResponse } from 'axios';
import { httpClient } from './common';
import { ITokenResponse, IToken, IOAuthTokenRequest, IOAuthTokenResponse } from '@/models';
import { getBaseUrlAuth } from '@/utils';

class AuthOperator {
  async refreshToken(payload: IToken): Promise<AxiosResponse<ITokenResponse>> {
    return httpClient.post('/auth/refresh/', payload);
  }
}

class OAuthOperator {
  async token(payload: IOAuthTokenRequest): Promise<AxiosResponse<IOAuthTokenResponse>> {
    return httpClient.post('/token', payload, {
      baseURL: `${getBaseUrlAuth()}/oauth2/v1`
    });
  }
  async captcha(): Promise<AxiosResponse<IOAuthTokenResponse>> {
    return httpClient.get('/Login/get_captcha/', {
      baseURL: `${getBaseUrlAuth()}/api/v1`
    });
  }
  async sendCode(payload: any): Promise<AxiosResponse> {
    return httpClient.post('/Login/get_code/', payload, {
      baseURL: `${getBaseUrlAuth()}/api/v1`
    });
  }
  async verifyCode(payload: any, inviter_id: any): Promise<AxiosResponse> {
    return httpClient.post(`/Login/verify_code/?inviter_id=${inviter_id || ''}`, payload, {
      baseURL: `${getBaseUrlAuth()}/api/v1`
    });
  }
  async verifyPassword(payload: any, inviter_id: any): Promise<AxiosResponse> {
    return httpClient.post(`/Login/verify_code/?inviter_id=${inviter_id || ''}`, payload, {
      baseURL: `${getBaseUrlAuth()}/api/v1`
    });
  }
  async generateSession(payload: any): Promise<AxiosResponse> {
    return httpClient.post(`/generate-session`, payload, {
      baseURL: `${getBaseUrlAuth()}/api/v1`
    });
  }
  async getToken(): Promise<AxiosResponse> {
    return httpClient.post(`/AI_PPT_token`, {
      baseURL: `${getBaseUrlAuth()}/api/v1`
    });
  }
  async verify_token(token: any): Promise<AxiosResponse> {
    return httpClient.post(`/AI_PPT_verify/?token=${token || ''}`, {
      baseURL: `${getBaseUrlAuth()}/api/v1`
    });
  }
}

export const authOperator = new AuthOperator();
export const oauthOperator = new OAuthOperator();
