import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
import appActions from "@iso/redux/app/actions";
import TopbarUser from "./TopbarUser";
import TopbarWrapper from "./Topbar.styles";
import TopbarUserMobile from "./TopbarUserMobile";

const { Header } = Layout;
const { toggleCollapsed } = appActions;

export default function Topbar() {
  const customizedTheme = useSelector((state) => state.ThemeSwitcher.topbarTheme);
  const { collapsed, openDrawer, view } = useSelector((state) => state.App);
  const auth = useSelector((state) => state.Auth);
  const { user = {}, dashboardRoute } = auth;
  const dispatch = useDispatch();
  const handleToggle = React.useCallback(() => dispatch(toggleCollapsed()), [
    dispatch,
  ]);
  const isCollapsed = collapsed && !openDrawer;
  const styling = {
    background: customizedTheme.backgroundColor,
    position: "fixed",
    width: "100%",
    height: 70,
  };
  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={isCollapsed ? "isomorphicTopbar collapsed" : "isomorphicTopbar"}
      >
        <div className="isoLeft">
          <button
            className={
              isCollapsed ? "triggerBtn menuCollapsed" : "triggerBtn menuOpen"
            }
            style={{ color: customizedTheme.textColor }}
            onClick={handleToggle}
          />
        </div>

        <ul className="isoRight">
          {view !== "MobileView" ? (
            <TopbarUser user={user} dashboardRoute={dashboardRoute} />
          ) : (
            <li>
              <TopbarUserMobile user={user} dashboardRoute={dashboardRoute} />
            </li>
          )}
        </ul>
      </Header>
    </TopbarWrapper>
  );
}
