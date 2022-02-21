import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Form, Select } from "formik-antd";
import { find, some } from "lodash";
import moment from "moment-timezone";

import { OtaContext } from "@iso/containers/StoreAddAndEdit/StoreAddAndEdit";
import { TIMEZONE_JAPAN, DATE_FORMAT } from "@iso/constants/common.constant";

const FormSelectCell = ({
  required,
  name,
  inputValue,
  options = [],
  disabled,
  handleDataChange,
  tableFieldName,
  otaTypeId,
}) => {
  const otas = useContext(OtaContext);
  return (
    <Form.Item required={required} name={name}>
      <Select
        name={name}
        value={inputValue}
        disabled={disabled}
        onChange={(value) => {
          const data = find(options, { otaId: value });
          return handleDataChange(tableFieldName, {
            ...data,
            displayStoreId: data.displayStoreId,
            url: `${data.loginUrlFixed1}${data.loginUrlFixed2}`,
            expiredDate: expiredDate(data.passwordUpdateDeadline),
            customStoreId: data.storeId,
          });
        }}
      >
        {options.map((select, index) => {
          return (
            <Select.Option
              key={index}
              value={select.value}
              disabled={
                some(otas[otaTypeId], { otaId: select.value }) &&
                select.value !== inputValue
              }
            >
              {select.name}
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};

FormSelectCell.propTypes = {
  name: PropTypes.string,
  inputValue: PropTypes.any,
  required: PropTypes.bool,
  options: PropTypes.array,
  disabled: PropTypes.bool,
  handleDataChange: PropTypes.func,
  tableFieldName: PropTypes.string,
  otaTypeId: PropTypes.number,
};

const expiredDate = (passwordUpdateDeadline) =>
  moment.tz(TIMEZONE_JAPAN).add(passwordUpdateDeadline, "hours").format(DATE_FORMAT);

export default FormSelectCell;
