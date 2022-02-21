import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import siteConfig from "@iso/config/site.config";

import logo from "@iso/assets/images/favicon.png";
import { useSelector } from "react-redux";

const Logo = ({ collapsed }) => {
  const dashboardRoute = useSelector((state) => state.Auth.dashboardRoute);
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to={dashboardRoute}>
              <img src={logo} width={40} alt="logo" />
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link to={dashboardRoute}>{siteConfig.siteName}</Link>
        </h3>
      )}
    </div>
  );
};

Logo.propTypes = {
  collapsed: PropTypes.bool,
};

export default Logo;
