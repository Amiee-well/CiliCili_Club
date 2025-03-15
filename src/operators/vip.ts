import { IVIPResponse } from '@/models/vip';
import { AxiosResponse } from 'axios';
import { httpClient } from './common';

class VIPOperator {
  key = 'vip';
  async getLevelList(): Promise<AxiosResponse<IVIPResponse>> {
    return await httpClient.get(`/vip/levels`);
  }
}

export const vipOperator = new VIPOperator();
