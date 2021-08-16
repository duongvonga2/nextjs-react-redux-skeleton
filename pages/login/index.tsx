import { AppBar, Grid, TextField, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { IRootState } from "../../src/redux";
import Image from "next/image";
import path from "path";
import authAction from "../../src/redux/auth/auth.action";
import { ILoginForm } from "../../src/redux/auth";
import { CustomizedButton } from "../../src/components/commons";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
  },
  container: {
    margin: "auto",
    maxWidth: "800px",
    height: "500px",
    border: "solid 1px #ccc",
    background: "#fff",
  },
  leftSide: {
    background: "#f8f8f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  textField: {
    // position: "static",
    "& input": {
      width: "100%",
      background: "#f8f8f8",
      boxShadow:
        "inset -8px -8px 16px rgba(255, 255, 255, 0.25), inset 8px 8px 16px #E8E8E8",
      borderRadius: "20px",
      // flex: "none",
    },
    width: "100%",
    order: 1,
    flexGrow: 0,
    margin: "10px 0px",
    "& fieldset": {
      border: "none",
      display: "none",
    },
    // "& label:active": {
    //   display: "none",
    // },
  },
  active: {
    // "& label": {
    //   display: "none",
    // },
  },
}));

const mapStateToProps = (state: IRootState) => ({
  isLogin: state.auth.isLogin,
  loginForm: state.auth.loginForm,
});
const mapDispatchToProps = {
  setAuthState: authAction.setState,
  login: authAction.adminLogin,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Login = (props: PropsFromRedux) => {
  const classes = useStyles();
  const { loginForm, setAuthState, login } = props;
  const { email, password, errors } = loginForm;

  const onInput = (key: keyof ILoginForm, value: string) => {
    const newErrors: any = { ...errors };
    if (newErrors[key]) {
      delete newErrors[key];
      setAuthState({ "loginForm.errors": { ...newErrors } });
    }
    setAuthState({ ["loginForm." + key]: value });
  };

  const onLogin = (event: any) => {
    event.preventDefault();
    login({ email, password }).then((success) => {
      if (success) {
        setAuthState({ "loginForm.email": "", "loginForm.password": "" });
      }
    });
  };

  return (
    <div className={classes.root}>
      {" "}
      <AppBar position="static" className={classes.container}>
        <Grid container style={{ height: "100%" }}>
          <Grid item xl={6} lg={6} md={6} sm={6} className={classes.leftSide}>
            <Image
              width={150}
              height={150}
              src={path.resolve(__dirname, "../../images/logos/main.png")}
              alt="logo"
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} className={classes.rightSide}>
            <form onSubmit={onLogin}>
              <Typography
                style={{
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "#6c7279",
                  textAlign: "center",
                  paddingBottom: "20px",
                }}
              >
                ĐĂNG NHẬP
              </Typography>
              <TextField
                className={`${classes.textField} ${
                  email ? classes.active : ""
                }`}
                label="Email"
                placeholder="Email"
                variant="outlined"
                onChange={(event) => onInput("email", event.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                className={`${classes.textField} ${
                  password ? classes.active : ""
                }`}
                label="Mật khẩu"
                placeholder="Mật khẩu"
                variant="outlined"
                type="password"
                onChange={(event) => onInput("password", event.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />

              <Typography
                style={{
                  fontStyle: "normal",
                  fontWeight: "bold",

                  color: "#219653",
                  textAlign: "center",
                  paddingBottom: "20px",
                }}
              >
                Quên mật khẩu
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CustomizedButton type="submit">Đăng nhập</CustomizedButton>
              </div>
            </form>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
};
export default connector(Login);
