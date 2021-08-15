import { SnackbarOrigin } from "@material-ui/core";
import { VariantType } from "notistack";

export interface IPageState {
  sidebar: {
    isShowDrawer?: boolean;
    activeKey?: string;
  };
  messageShowing: IShowMessage;
}

export interface IShowMessage {
  variant: VariantType;
  message: string | string[];
  anchorOrigin?: SnackbarOrigin | null;
}
