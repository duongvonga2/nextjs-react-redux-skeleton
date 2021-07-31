import { ICategoryState } from "./category.interface";

const state: ICategoryState = {
  isFetching: false,
  message: "",
  query: {
    page: 1,
    pageSize: 10,
    sort: "",
    status: "active",
  },
  defaultList: [
    {
      _id: "0",
      title: "Tất cả bài viết",
      description: "",
      icon: "question_answer",
    },
    { title: "Theo dõi", description: "", icon: "star", _id: "1" },
  ],
  dataList: [],
  detail: null,
};

export const getDefaultCategoryList = () => state.defaultList;

export default state;
