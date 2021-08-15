import React from "react";
import {
  alpha,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { connect, ConnectedProps } from "react-redux";
import { IRootState } from "../../redux";
import {
  Notifications as NotificationsIcon,
  AccountCircle,
  MoreVert as MoreIcon,
} from "@material-ui/icons";
import { themeBreakpointsDown } from "../theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionDesktop: {
      display: "flex",
      [themeBreakpointsDown["sm"]]: {
        display: "none",
      },
    },
    sectionMobile: {
      display: "none",
      [themeBreakpointsDown["sm"]]: {
        display: "flex",
      },
    },
  })
);

const mapStateToProps = (state: IRootState) => ({
  auth: state.auth.isFetching,
});
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps {
  a?: string;
}

const Header = (props: IProps & PropsFromRedux) => {
  const classes = useStyles();
  const {} = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <p>Đăng ký </p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <p>Đăng nhập</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <div className={classes.sectionDesktop}>
        <Typography style={{ marginRight: "15px" }}>Đăng ký</Typography>
        <Typography>Đăng nhập</Typography>
      </div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>

      {renderMobileMenu}
      {renderMenu}
    </>
  );
};

export default connector(Header);
