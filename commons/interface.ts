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
  method: "GET" | "POST" | "DELETE" | "PUT";
  body?: any;
  query?: any;
}
