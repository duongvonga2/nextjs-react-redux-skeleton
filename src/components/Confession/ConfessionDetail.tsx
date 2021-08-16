import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IRootState } from "../../redux";
import { connect, ConnectedProps } from "react-redux";
import { CustomizedButton, CustomizedTextField } from "../commons";
import confessionAction from "../../redux/confession/confession.action";
import { useEffect } from "react";
import {
  AppBar,
  Dialog,
  DialogTitle,
  Icon,
  ListItemText,
  Popover,
  Typography,
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& > div > div": {
      minWidth: "400px",
    },
  },
  approveBtn: {
    background: green[500],
    color: "#fff",
    margin: "0px 3px",
    "&:hover": {
      background: green[900],
    },
  },

  deleteBtn: {
    background: red[500],
    color: "#fff",
    "&:hover": {
      background: red[900],
    },
  },
  cancelledBtn: {
    background: deepOrange[500],
    color: "#fff",
    "&:hover": {
      background: deepOrange[900],
    },
  },
  buttonControl: {
    borderTop: "solid 1px #ccc",
    padding: "10px",
  },
}));

const mapStateToProps = (state: IRootState) => ({
  dataList: state.confession.dataList,
  total: state.confession.total,
  query: state.confession.query,
  detailVisible: state.confession.detailVisible,
  detail: state.confession.detail,
});
const mapDispatchToProps = {
  getConfessionList: confessionAction.getList,
  resetState: confessionAction.resetState,
  setState: confessionAction.setState,
  confirm: confessionAction.confirm,
  deleteConfession: confessionAction.deleteConfession,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps {}
const statusProperties = {
  approved: { text: "Đã duyệt", color: green[500] },
  cancelled: { text: "Đã từ chối", color: red[500] },
  pending: { text: "Đang chờ", color: deepPurple[500] },
};
function Spinning(props: PropsFromRedux & IProps) {
  const classes = useStyles();
  const { detailVisible, detail, setState, confirm, deleteConfession } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<any>({});

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    if (!detailVisible) {
      setState({ detail: null });
    }
  }, [setState, detailVisible]);

  if (!detail) {
    return null;
  }

  const onConfirm = (status: "approved" | "cancelled" | "delete") => {
    if (status === "delete") {
      deleteConfession(detail._id);
    } else {
      const data: any = { status };
      if (status === "cancelled") {
        if (!reason) {
          setErrors({ reason: "Lý do không được để trống " });
          return;
        }
        data.reason = reason;
      }
      confirm(detail._id, data).then((success) => {
        if (success) {
          setAnchorEl(null);
          setReason("");
        }
      });
    }
  };
  const { title, description, email, status, createdAt } = detail;
  const statusProperty = statusProperties[status];

  return (
    <Dialog
      onClose={() => setState({ detailVisible: false })}
      open={detailVisible}
      className={classes.dialog}
    >
      <AppBar position="static" style={{ background: statusProperty.color }}>
        <ListItemText
          primary={
            <DialogTitle style={{ paddingBottom: "0px" }}>{title}</DialogTitle>
          }
          secondary={
            <DialogTitle
              style={{
                margin: 0,
                paddingTop: "0px",
                display: "flex",
                color: "#fff",
              }}
            >
              <Typography
                // variant="h2"
                style={{ display: "flex", color: "#fff" }}
              >
                <Icon
                  style={{
                    margin: "auto",
                    marginLeft: "0px",
                    marginRight: "3px",
                  }}
                >
                  mail
                </Icon>{" "}
                {email}
              </Typography>
              <span
                style={{
                  color: statusProperty.color,
                  // color: "#fff",
                  background: "#fff",
                  width: "auto",
                  // padding: "5px",
                }}
              >
                {statusProperty.text}
              </span>
            </DialogTitle>
          }
        />
        {/* <DialogTitle>{title}</DialogTitle> */}
      </AppBar>
      <DialogContent style={{ paddingTop: "10px " }}>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </DialogContent>
      {status === "pending" && (
        <div
          className={classes.buttonControl}
          style={{ background: "#fff", textAlign: "right" }}
        >
          <Button
            aria-describedby={id}
            variant="contained"
            color="primary"
            onClick={handleClick}
            className={classes.cancelledBtn}
          >
            Từ chối
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            style={{ padding: "20px" }}
          >
            <CustomizedTextField
              value={reason}
              onChange={(event) => {
                setErrors({});
                setReason(event.target.value);
              }}
              label="Lý do"
              variant="outlined"
              error={!!errors.reason}
              helperText={errors.reason}
            />
            <div style={{ textAlign: "right" }}>
              <CustomizedButton
                onClick={() => {
                  onConfirm("cancelled");
                }}
                style={{ marginRight: "0px" }}
              >
                Gửi
              </CustomizedButton>
            </div>
          </Popover>

          <Button
            onClick={() => onConfirm("approved")}
            className={classes.approveBtn}
          >
            Duyệt
          </Button>
          <Button
            onClick={() => onConfirm("delete")}
            className={classes.deleteBtn}
          >
            Xóa
          </Button>
        </div>
      )}
    </Dialog>
  );
}

export const ConfessionDetail = connector(Spinning);
