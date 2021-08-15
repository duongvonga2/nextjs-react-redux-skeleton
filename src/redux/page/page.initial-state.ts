import { IPageState } from "./page.interface";

const state: IPageState = {
  sidebar: {
    isShowDrawer: false,
    activeKey: "0",
  },
  messageShowing: {
    message: "",
    variant: "default",
    anchorOrigin: null,
  },
};
export default state;
