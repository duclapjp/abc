import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import ModalConfirm from "@iso/components/Feedback/ModalConfirm";
import authAction from "@iso/redux/auth/actions";
import IntlMessages from "@iso/components/utility/intlMessages";
import { useIntl } from "react-intl";

const TopbarLogout = ({ view }) => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const { logout } = authAction;
  return (
    <ModalConfirm
      content={messages["feedback.modalconfirm.logoutContent"]}
      onOk={() => dispatch(logout())}
    >
      {view !== "MobileView" ? (
        <div className="isoIconWrapper">
          <i className="ion-log-out" />
        </div>
      ) : (
        <IntlMessages id="topbar.logout" />
      )}
    </ModalConfirm>
  );
};

TopbarLogout.propTypes = {
  view: PropTypes.string,
};

export default TopbarLogout;
