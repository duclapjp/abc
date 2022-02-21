import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "formik-antd";

const FormInputCell = ({ name, inputValue, required, disabled }) => {
  return (
    <Form.Item required={required} name={name}>
      <Input name={name} value={inputValue} disabled={disabled} />
    </Form.Item>
  );
};

FormInputCell.propTypes = {
  name: PropTypes.string,
  inputValue: PropTypes.any,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default FormInputCell;
