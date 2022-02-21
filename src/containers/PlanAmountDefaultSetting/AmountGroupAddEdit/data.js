/* eslint-disable react/display-name  */
import React from "react";
import { Form, InputNumber } from "formik-antd";

import { AmountGroupsPeopleStyles } from "../AmountGroupAddEdit/AmountGroupAddEdit.styles";

export const renderColumn = (tableName, index, inputName, editing, isSubmitting) => {
  return (
    <Form.Item className={"mg-0"} name={inputName}>
      <AmountGroupsPeopleStyles>
        <InputNumber
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/\\s?|(,*)/g, "")}
          disabled={!editing || isSubmitting}
          name={inputName}
        />
      </AmountGroupsPeopleStyles>
    </Form.Item>
  );
};

const renderPeople = (length, messages, tableName, editing, isSubmitting) => {
  const arr = [];
  for (let i = 1; i <= length; i++) {
    arr.push({
      title: `${i} ${messages["page.AmountGroup.people"]}`,
      dataIndex: "",
      key: "",
      align: "center",
      render: (value, row, index) =>
        renderColumn(
          tableName,
          index,
          `${tableName}[${index}].amounts[${i - 1}]`,
          editing,
          isSubmitting
        ),
    });
  }
  return arr;
};

export const columns = ({ messages, tableName, length, editing, isSubmitting }) => {
  return [
    {
      title: "",
      dataIndex: "amountRankName",
      key: "amountRankName",
      align: "center",
    },
    ...renderPeople(length, messages, tableName, editing, isSubmitting),
  ];
};
