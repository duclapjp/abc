import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Layout } from "antd";
import useWindowSize from "@iso/lib/hooks/useWindowSize";
import appActions from "@iso/redux/app/actions";
import ThemeSwitcher from "@iso/containers/template-containers/ThemeSwitcher/ThemeSwitcher";
import siteConfig from "@iso/config/site.config";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import DashboardRoutes from "./DashboardRoutes";

import PasswordHistory from "@iso/containers/PasswordHistory/PasswordHistory";
import { DashboardContainer, DashboardGlobalStyles } from "./Dashboard.styles";

const { Content, Footer } = Layout;
const { toggleAll } = appActions;
const styles = {
  layout: { flexDirection: "row", overflowX: "hidden" },
  content: {
    padding: "70px 0 0",
    flexShrink: "0",
    background: "#f1f3f6",
    position: "relative",
  },
  footer: {
    background: "#ffffff",
    textAlign: "center",
    borderTop: "1px solid #ededed",
  },
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const appHeight = useSelector((state) => state.App.height);
  const { user, dashboardRoute } = useSelector((state) => state.Auth);
  const { width, height } = useWindowSize();

  useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);

  useEffect(() => {
    if (user.firstLogin) {
      history.push(`${dashboardRoute}/account-setting`);
    }
  }, [dashboardRoute, history, user.firstLogin]);

  return (
    <DashboardContainer>
      <DashboardGlobalStyles />
      <Layout style={{ height: height }}>
        <Topbar />
        <Layout style={styles.layout}>
          <Sidebar />
          <Layout className="isoContentMainLayout" style={{ height: appHeight }}>
            <Content className="isomorphicContent" style={styles.content}>
              <DashboardRoutes />
            </Content>
            <Footer style={styles.footer}>{siteConfig.footerText}</Footer>
          </Layout>
        </Layout>
        <PasswordHistory />
        {process.env.NODE_ENV === "development" && <ThemeSwitcher />}
      </Layout>
    </DashboardContainer>
  );
}
