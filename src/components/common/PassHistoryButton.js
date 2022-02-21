import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { useDispatch } from "react-redux";

import passwordHistoryActions from "@iso/redux/passwordHistory/actions";

const PassHistoryButton = ({ children, ...props }) => {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => dispatch(passwordHistoryActions.togglePasswordHistory())}
      style={{
        backgroundColor: "#39cf7f",
        borderColor: "#39cf7f",
        color: "#FFFFFF",
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

PassHistoryButton.propTypes = {
  children: PropTypes.node,
};

export default PassHistoryButton;
