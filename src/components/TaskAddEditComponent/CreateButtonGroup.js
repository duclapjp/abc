import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { useIntl } from "react-intl";
import { ControlButtonGroup } from "@iso/components/common/ControlButtonGroup.style";

const CreateButtonGroup = ({
  isSubmitting,
  backClick,
  previewClick,
  cancelPreviewClick,
  previewMode,
}) => {
  const { messages } = useIntl();
  return (
    <ControlButtonGroup>
      <Button
        type="default"
        htmlType="button"
        onClick={previewMode ? cancelPreviewClick : backClick}
      >
        {messages["page.taskAddEdit.backButton"]}
      </Button>
      {!previewMode && (
        <Button
          htmlType="button"
          onClick={previewClick}
          style={{
            backgroundColor: "#5cb85c",
            borderColor: "#5cb85c",
            color: "#FFFFFF",
          }}
        >
          {messages["page.taskAddEdit.preview"]}
        </Button>
      )}
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

CreateButtonGroup.propTypes = {
  isSubmitting: PropTypes.bool,
  previewClick: PropTypes.func,
  backClick: PropTypes.func,
  cancelPreviewClick: PropTypes.func,
  previewMode: PropTypes.bool,
};

export default CreateButtonGroup;
