import React, { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import notifyAction from "@iso/redux/notify/actions";

const TitleNotify = ({ title, linkTo, actionId }) => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => dispatch(notifyAction.toggleModal()), [
    dispatch,
  ]);
  const location = {
    pathname: linkTo,
    state: {
      scrollNotify: true,
    },
  };

  return (
    <Link to={location} onClick={onClick}>
      タスクNO.{actionId}&nbsp;{title}
    </Link>
  );
};

TitleNotify.propTypes = {
  title: PropTypes.string,
  linkTo: PropTypes.string,
  actionId: PropTypes.number,
};

export default memo(TitleNotify);
