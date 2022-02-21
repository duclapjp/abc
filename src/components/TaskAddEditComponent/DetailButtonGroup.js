import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { useIntl } from "react-intl";
import { ControlButtonGroup } from "@iso/components/common/ControlButtonGroup.style";

const DetailButtonGroup = ({ backClick, showEdit, editClick, loading }) => {
  const { messages } = useIntl();
  return (
    <ControlButtonGroup>
      <Button
        type="default"
        htmlType="button"
        disabled={loading}
        onClick={backClick}
      >
        {messages["page.taskAddEdit.backButton"]}
      </Button>
      {showEdit && (
        <Button
          type="primary"
          htmlType="button"
          onClick={editClick}
          loading={loading}
        >
          {messages["page.taskAddEdit.buttonEdit"]}
        </Button>
      )}
    </ControlButtonGroup>
  );
};

DetailButtonGroup.propTypes = {
  loading: PropTypes.bool,
  showEdit: PropTypes.bool,
  backClick: PropTypes.func,
  editClick: PropTypes.func,
};

export default DetailButtonGroup;
