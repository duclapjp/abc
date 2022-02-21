/* eslint-disable react/display-name  */
import React from "react";
import { Input, Select } from "formik-antd";
import { Button } from "antd";

import { SELECT_TEMPLATE } from "@iso/constants/select.constant";

const renderColumns = ({ tableName, messages, showPreView }) => {
  return [
    {
      title: messages["page.AmountGroupSelect.groupName"],
      dataIndex: "",
      key: "",
      align: "center",
      render: (value, items, index) => {
        return <Input name={`${tableName}[${index}].amountGroupName`} />;
      },
    },
    {
      title: messages["page.AmountGroupSelect.countSurcharges"],
      dataIndex: "",
      key: "",
      align: "center",
      render: (value, items, index) => {
        return (
          <Input
            disabled={!items.checked}
            name={`${tableName}[${index}].discounts`}
          />
        );
      },
    },
    {
      title: messages["page.AmountGroupSelect.unit"],
      dataIndex: "",
      key: "",
      align: "center",
      render: (value, items, index) => {
        return (
          <Select
            className={"margin-bottom-0"}
            defaultValue={value}
            name={`${tableName}[${index}].unit`}
            disabled={!items.checked}
          >
            {SELECT_TEMPLATE.UNIT.map((select, index) => (
              <Select.Option key={index} value={select}>
                {select}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: messages["page.AmountGroupSelect.preview"],
      dataIndex: "amountId",
      key: "amountId",
      align: "center",
      render: (value, items) => {
        return (
          <>
            <Button
              disabled={!items.checked}
              onClick={() => showPreView(items)}
              type={"primary"}
            >
              {messages["page.AmountGroupSelect.preview"]}
            </Button>
          </>
        );
      },
    },
  ];
};

export default renderColumns;
