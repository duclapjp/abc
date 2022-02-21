import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TopbarLogout from "./TopbarLogout";
import NotifyList from "@iso/containers/NotifyList";
import notifyAction from "@iso/redux/notify/actions";
import { useDispatch, useSelector } from "react-redux";

const TopbarUser = ({ user = {}, dashboardRoute }) => {
  const {
    Notify: { showModal },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const toggleModal = useCallback(() => {
    dispatch(notifyAction.toggleModal());
  }, [dispatch]);

  return (
    <>
      <li>
        <Link
          className="isoDropdownLink"
          to={`${dashboardRoute}/account-setting`}
          style={{
            // maxWidth: 150,
            display: "block",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {user && user.displayName}
        </Link>
      </li>
      <li>
        <Link className="isoDropdownLink" to="#">
          <div className="isoIconWrapper">
            <i onClick={toggleModal} className="ion-android-notifications" />
          </div>
          {showModal && <NotifyList />}
        </Link>
      </li>

      <li>
        <TopbarLogout view="DesktopView" />
      </li>
    </>
  );
};

TopbarUser.propTypes = {
  user: PropTypes.object,
  dashboardRoute: PropTypes.string,
};

export default TopbarUser;
