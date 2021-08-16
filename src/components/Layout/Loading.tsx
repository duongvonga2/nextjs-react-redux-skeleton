import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { IRootState } from "../../redux";
import { connect, ConnectedProps } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  LinearProgress: {
    position: "fixed",
    top: 0,
    zIndex: 10,
    width: "100%",
    left: 0,
    background: "rgba(0,0,0,0)",
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  hidden: { display: "none" },
  loading: {
    pointerEvents: "none",
    backgroundColor: "rgb(0,0,0,0.1)",
  },
  progressIcon: {
    margin: "auto",
    position: "absolute",
    top: "45%",
    left: "50%",
  },
}));

const mapStateToProps = (state: IRootState) => ({
  authFetchingFetching: state.auth.isFetching,
});
const mapDispatchToProps = {};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps {
  children: any;
}

function Spinning(props: PropsFromRedux & IProps) {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const { authFetchingFetching } = props;
  const loading = authFetchingFetching;

  useEffect(() => {
    let timer: any = 0;
    if (loading) {
      setIsHidden(false);
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            setTimeout(() => {
              setIsHidden(true);
            }, 700);
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 99);
        });
      }, 700);
    } else {
      setProgress(100);
      setIsHidden(true);
    }
    return () => {
      clearInterval(timer);
    };
  }, [loading]);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsHidden(true);
      }, 700);
    }
  }, [progress]);

  return (
    <div className={`${classes.root} ${loading && classes.loading}`}>
      <LinearProgress
        className={`${classes.LinearProgress} ${isHidden && classes.hidden}`}
        variant="determinate"
        value={progress}
      />
      {props.children}
    </div>
  );
}

export const Loading = connector(Spinning);
