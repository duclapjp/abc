import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { useIntl } from "react-intl";
import { ControlButtonGroup } from "@iso/components/common/ControlButtonGroup.style";

const EditButtonGroup = ({ isSubmitting, cancelClick, dirty }) => {
  const { messages } = useIntl();
  return (
    <ControlButtonGroup>
      <Button
        type="default"
        htmlType="button"
        disabled={isSubmitting}
        onClick={cancelClick}
      >
        {messages["page.Account.buttonCancel"]}
      </Button>
      <Button
        type="primary"
        htmlType="submit"
        loading={isSubmitting}
        disabled={!dirty}
      >
        {messages["page.Account.buttonSave"]}
      </Button>
    </ControlButtonGroup>
  );
};

EditButtonGroup.propTypes = {
  isSubmitting: PropTypes.bool,
  dirty: PropTypes.bool,
  cancelClick: PropTypes.func,
};

export default EditButtonGroup;
