import React, { useState } from "react";
import PropTypes from "prop-types";
import IntlMessages from "@iso/components/utility/intlMessages";
import { Button, Modal, Input } from "antd";
import { useIntl } from "react-intl";

const MemoCell = ({ inputValue, onChange, disabled }) => {
  const { messages } = useIntl();
  const [value, setValue] = useState();
  const [visible, setVisible] = useState(false);
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClickButton = () => {
    setValue(inputValue);
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
    onChange(value);
  };
  const handleCancel = () => {
    setValue(inputValue);
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={handleClickButton} disabled={disabled}>
        <IntlMessages id="page.storeAddEditEmail.memo" />
      </Button>
      <Modal
        title={messages["page.storeAddEditEmail.memo"]}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <Input.TextArea value={value} onChange={handleChange} rows={4} />
      </Modal>
    </>
  );
};

MemoCell.propTypes = {
  name: PropTypes.string,
  inputValue: PropTypes.any,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.array,
};

export default MemoCell;
