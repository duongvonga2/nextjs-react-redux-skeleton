import { IBaseQuery } from "../../commons";

export interface ICategoryState {
  isFetching: boolean;
  message?: string;
  dataList: ICategory[];
  defaultList: ICategory[];
  detail: ICategory | null;
  query: ICategoryQuery;
}

export interface ICategory {
  _id: string;
  title: string;
  description: string;
  image?: string;
  latestDiscussAt?: string;
  latestDiscussionId?: string;
  parentId?: string;
  status?: string;
  icon?: string;
}

export interface ICategoryQuery extends IBaseQuery {
  status?: TCategoryStatus;
}
export type TCategoryStatus = "active" | "disabled" | "";
