import type { ApiErrorCode } from '../enums/ApiErrorCode';

export interface ApiError {
  error: {
    code: ApiErrorCode;
    message: string;
  };
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
