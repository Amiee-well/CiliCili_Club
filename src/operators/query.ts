import { AxiosResponse } from 'axios';
import { httpClient } from './common';

// 定义查询参数接口
export interface IQueryParams {
  offset?: number;
  limit?: number;
  service_id?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  ordering?: string;
}

export interface IQueryResponse {
  count: number;
  results: Array<{
    id: string;
    title: string;
    price: number;
    file_url: string;
    status: string;
    created_at: string;
  }>;
}

class QueryOperator {
  key = 'queries';

  // 获取查询列表
  async getList(params: IQueryParams): Promise<AxiosResponse<IQueryResponse>> {
    return await httpClient.get(`/${this.key}/`, {
      params: params
    });
  }

  // 获取单个查询详情
  async getDetail(id: string): Promise<AxiosResponse<IQueryResponse>> {
    return await httpClient.get(`/${this.key}/${id}`);
  }

  // 创建新的查询
  async create(data: any): Promise<AxiosResponse<IQueryResponse>> {
    return await httpClient.post(`/${this.key}/`, data);
  }

  // 取消查询
  async cancel(id: string): Promise<AxiosResponse<null>> {
    return await httpClient.post(`/${this.key}/${id}/cancel/`);
  }

  // 重试查询
  async retry(id: string): Promise<AxiosResponse<IQueryResponse>> {
    return await httpClient.post(`/${this.key}/${id}/retry/`);
  }
}

export const queryOperator = new QueryOperator();
