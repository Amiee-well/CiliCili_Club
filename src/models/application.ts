import { ICredential } from './credential';
import { IService } from './service';

export enum IApplicationType {
  API = 'Api'
}

export interface IApplication {
  id?: string;
  type?: IApplicationType;
  service_id?: string;
  service?: IService;
  user_id?: string;
  remaining_amount?: number;
  used_amount?: number;
  credentials?: ICredential[];
  created_at?: string;
  updated_at?: string;
  daily_amount?: string;
}

export interface IApplicationListResponse {
  count: number;
  items: IApplication[];
}

export type IApplicationDetailResponse = IApplication;
