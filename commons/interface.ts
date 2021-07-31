export interface IResponseInterface<T> {
  success: boolean;
  statusCode?: number;
  data?: T;
  total_page?: number;
  totalPage?: number;
  error?: number;
  errors?: any;
  total?: number;
}
export interface IFetchData {
  api: string;
  method?: "GET" | "POST" | "DELETE" | "PUT";
  body?: Record<string, any> | FormData;
  query?: Record<string, any>;
}

export interface IApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  code: number;
  statusCode?: number;
  total?: number;
  errors?: any;
}

export interface IBaseQuery {
  pageSize?: number;
  page?: number;
  sort?: string;
}
