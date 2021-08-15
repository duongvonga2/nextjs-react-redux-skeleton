import React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { IRootState } from "../../redux";
import pageAction from "../../redux/page/page.action";
import { connect, ConnectedProps } from "react-redux";
import { useEffect } from "react";

const mapStateToProps = (state: IRootState) => ({
  messageShowing: state.page.messageShowing,
});
const mapDispatchToProps = {
  setPageState: pageAction.setState,
  resetPageState: pageAction.resetState,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function MyApp(props: PropsFromRedux) {
  const { enqueueSnackbar } = useSnackbar();
  const { messageShowing, resetPageState } = props;
  const { message, variant, anchorOrigin: propsAnchor } = messageShowing;

  useEffect(() => {
    if (message instanceof Array) {
      message.forEach((item) => {
        enqueueSnackbar(item, {
          variant,
          anchorOrigin: propsAnchor || { vertical: "top", horizontal: "right" },
          autoHideDuration: 2000,
        });
      });
    } else if (message) {
      enqueueSnackbar(message, {
        variant,
        anchorOrigin: propsAnchor || { vertical: "top", horizontal: "right" },
        autoHideDuration: 2000,
      });
    }

    resetPageState("messageShowing");
  }, [message, variant, propsAnchor, enqueueSnackbar, resetPageState]);

  return <React.Fragment></React.Fragment>;
}

const Message = connector(MyApp);

export const ShowMessage = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Message />
    </SnackbarProvider>
  );
};
