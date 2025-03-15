export interface IVIPLevel {
  levelName: string;
  levelDesc: string;
  isActive: boolean;
  isFree: boolean;
  details: string[];
}

export interface IVIPResponse {
  results: IVIPLevel[];
}
