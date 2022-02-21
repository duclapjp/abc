import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { useIntl } from "react-intl";
import { ControlButtonGroup } from "@iso/components/common/ControlButtonGroup.style";
import PassHistoryButton from "@iso/components/common/PassHistoryButton";

const DetailButtonGroup = ({ isSubmitting, editClick, backClick }) => {
  const { messages } = useIntl();
  return (
    <ControlButtonGroup>
      <Button type="default" htmlType="button" onClick={backClick}>
        {messages["page.storeAddEditEmail.backButton"]}
      </Button>
      <PassHistoryButton>
        {messages["page.storeAddEditEmail.passHistoryButton"]}
      </PassHistoryButton>
      <Button
        type="primary"
        htmlType="submit"
        loading={isSubmitting}
        disabled={isSubmitting}
        onClick={editClick}
      >
        {messages["page.storeAddEditEmail.editButton"]}
      </Button>
    </ControlButtonGroup>
  );
};

DetailButtonGroup.propTypes = {
  isSubmitting: PropTypes.bool,
  editClick: PropTypes.func,
  backClick: PropTypes.func,
};

export default DetailButtonGroup;
