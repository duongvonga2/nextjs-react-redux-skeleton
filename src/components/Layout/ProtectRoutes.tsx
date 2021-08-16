import React from "react";
import { Router, useRouter } from "next/router";
import { IRootState } from "../../redux";
import { connect, ConnectedProps } from "react-redux";
import Layout from "./Layout";
import { authRoutes, unAuthRoutes } from "../../modules/routes";
import { useEffect } from "react";

const mapStateToProps = (state: IRootState) => ({
  isLogin: state.auth.isLogin,
});
const mapDispatchToProps = {};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
const Protect = (
  props: PropsFromRedux & { children: React.ReactElement; router: Router }
) => {
  const router = useRouter();
  const { children, isLogin, router: propsRouter } = props;
  useEffect(() => {
    if (!isLogin) {
      const unAuthRouteList = Object.values(unAuthRoutes);
      if (!unAuthRouteList.includes(propsRouter.route)) {
        router.push(unAuthRoutes.login);
      }
    } else {
      const authRouteList = Object.values(authRoutes);
      if (!authRouteList.includes(propsRouter.route)) {
        router.push(authRoutes.index);
      }
    }
  }, [isLogin, router, propsRouter]);

  return <Layout>{children}</Layout>;
};

export const ProtectRoutes = connector(Protect);
