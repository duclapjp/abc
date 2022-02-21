import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { useIntl } from "react-intl";
import { ControlButtonGroup } from "@iso/components/common/ControlButtonGroup.style";

const EditButtonGroup = ({ isSubmitting, cancelClick }) => {
  const { messages } = useIntl();
  return (
    <ControlButtonGroup>
      <Button
        type="default"
        htmlType="button"
        disabled={isSubmitting}
        onClick={cancelClick}
      >
        {messages["page.taskAddEdit.buttonCancel"]}
      </Button>
      <Button
        type="primary"
        htmlType="submit"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {messages["page.taskAddEdit.buttonSave"]}
      </Button>
    </ControlButtonGroup>
  );
};

EditButtonGroup.propTypes = {
  isSubmitting: PropTypes.bool,
  cancelClick: PropTypes.func,
};

export default EditButtonGroup;
