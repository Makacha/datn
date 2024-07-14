export interface IDataResponse<T> {
  code: string;
  message: string;
  data?: T;
  metadata?: any;
}

export interface IDateRange {
  year: number;
  month: number;
  day: number;
}

export interface IPagination {
  page: number;
  pageSize: number;
  total: number;
}