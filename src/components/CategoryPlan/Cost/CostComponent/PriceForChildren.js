/* eslint-disable react/display-name  */
import React, { memo } from "react";
import { Table } from "antd";
import { Checkbox, Form, InputNumber, Select } from "formik-antd";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import { SELECT_TEMPLATE } from "@iso/constants/select.constant";
import {
  PlanItemLayout,
  ColRight,
  ColLeft,
  itemLeftLabel,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import Pattern2Style from "../../Pattern.styles";

const PriceChildren = ({ name, disable }) => {
  const { messages } = useIntl();

  return (
    <PlanItemLayout>
      <ColLeft title={messages["page.TemPlate.titlePriceChildren"]} />
      <ColRight>
        <Pattern2Style>
          <Table
            dataSource={titleTable}
            columns={columns(messages, name, disable)}
            scroll={{ x: "max-content" }}
            bordered
            pagination={false}
            rowKey={(r) => r}
          />
        </Pattern2Style>
      </ColRight>
    </PlanItemLayout>
  );
};

const columns = (messages, name, disable) => {
  return [
    {
      title: "",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: messages["page.TemPlate.take"],
      dataIndex: "",
      key: "",
      align: "center",
      render: (value, items, index) => {
        return (
          <Select
            disabled={disable}
            defaultValue="受入不可"
            name={`${name}.priceChildren[${index}].supplementary`}
            className={"margin-bottom-0 date-picker-width"}
          >
            {SELECT_TEMPLATE.RECEIVE.map((select, index) => (
              <Select.Option key={index} value={select}>
                {select}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: messages["page.TemPlate.feeAndRate"],
      dataIndex: "",
      key: "",
      align: "center",
      render: (value, items, index) => {
        return (
          <div className={"justify-center"}>
            <InputNumber
              disabled={disable}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              min={0}
              defaultValue={3}
              name={`${name}.priceChildren[${index}].feeRate`}
              className={"margin-bottom-0 input-width"}
            />
          </div>
        );
      },
    },
    {
      title: messages["page.TemPlate.unit"],
      dataIndex: "",
      key: "",
      align: "center",
      render: (value, items, index) => {
        return (
          <Select
            disabled={disable}
            className={"margin-bottom-0 date-picker-width"}
            defaultValue="%"
            name={`${name}.priceChildren[${index}].unit`}
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
      title: messages["page.TemPlate.amountGroupPeople"],
      dataIndex: "",
      key: "",
      align: "center",
      render: (value, items, index) => {
        return (
          <Form.Item
            {...itemLeftLabel}
            name={`${name}.priceChildren[${index}].adultRate`}
            className={"margin-bottom-0"}
          >
            <Checkbox
              disabled={disable}
              name={`${name}.priceChildren[${index}].adultRate`}
            >
              数える
            </Checkbox>
          </Form.Item>
        );
      },
    },
  ];
};

const titleTable = [
  { title: "小学生" },
  { title: "幼児（食事・寝具あり)" },
  { title: "幼児（食事のみ)" },
  { title: "幼児（寝具のみ)" },
  { title: "幼児（食事・寝具なし)" },
];

PriceChildren.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
};

export default memo(PriceChildren);
