import { IBaseQuery } from "../../commons";

export interface IConfessionState {
  isFetching: boolean;
  message?: string;
  dataList: IConfession[];
  total: number;
  query: Required<IConfessionQuery>;
  detail: IConfession | null;
  detailVisible: boolean;
}
export interface IConfessionQuery extends IBaseQuery {
  email?: string;
  status?: TConfessionStatus | "";
}

export interface IConfession {
  _id: string;
  email: string;
  title: string;
  description: string;
  status: TConfessionStatus;
  reason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IConfessionConfirm {
  status: string;
  reason?: string;
}
export type TConfessionStatus = "pending" | "approved" | "cancelled";
