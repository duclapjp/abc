import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Popover from "@iso/components/uielements/popover";
import IntlMessages from "@iso/components/utility/intlMessages";
// import userpic from "@iso/assets/images/user1.png";
import TopbarDropdownWrapper from "./TopbarDropdown.styles";
import TopbarLogout from "./TopbarLogout";

import NotifyList from "@iso/containers/NotifyList";
import notifyAction from "@iso/redux/notify/actions";
import { useDispatch } from "react-redux";
import paginationConfig from "@iso/config/pagination.config";

const TopbarUserMobile = ({ user = {}, dashboardRoute }) => {
  const dispatch = useDispatch();

  const [visible, setVisibility] = React.useState(false);
  const handleVisibleChange = () => {
    setVisibility((visible) => !visible);
  };

  const toggleModal = () => {
    dispatch(notifyAction.toggleModal());
    dispatch(
      notifyAction.getNotify({
        size: paginationConfig.pageSize,
        page: paginationConfig.current,
      })
    );
    setVisibility(false);
  };

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <Link
        className="isoDropdownLink"
        to={`${dashboardRoute}/account-setting`}
        onClick={() => setVisibility(false)}
      >
        {user && user.displayName}
      </Link>
      <div>
        <div onClick={toggleModal} className="isoDropdownLink">
          <IntlMessages id="topbar.notify" />
        </div>
        <NotifyList />
      </div>
      <div className="isoDropdownLink" onClick={() => setVisibility(false)}>
        <TopbarLogout view="MobileView" />
      </div>
    </TopbarDropdownWrapper>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      arrowPointAtCenter={true}
      placement="bottomLeft"
    >
      <div className="isoImgWrapper">
        {/* <img alt="user" src={userpic} />
        <span className="userActivity online" /> */}
        <i className="ion-android-settings" />
      </div>
    </Popover>
  );
};

TopbarUserMobile.propTypes = {
  user: PropTypes.object,
  view: PropTypes.string,
  dashboardRoute: PropTypes.string,
};

export default TopbarUserMobile;
