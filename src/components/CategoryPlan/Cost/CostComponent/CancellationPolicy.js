/* eslint-disable react/display-name  */
import React, { memo } from "react";
import { Row, Table } from "antd";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Select, InputNumber, Radio, Input } from "formik-antd";

import Pattern2Style from "../../Pattern.styles";
import {
  ColLeft,
  ColRight,
  PlanItemLayout,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import { SELECT_TEMPLATE } from "@iso/constants/select.constant";

const CancellationPolicy = ({ name, disable }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft title={messages["page.TemPlate.cancellationPolicy"]} />
      <ColRight>
        <Pattern2Style>
          <Row className="mb-20">
            <Radio.Group
              disabled={disable}
              name={`${name}.cancellationPolicy.priceSetting`}
              defaultValue={true}
            >
              <Radio
                name={`${name}.cancellationPolicy.priceSetting`}
                className={"radio-style"}
                value={true}
              >
                {messages["page.TemPlate.useBasicPolicy"]}
              </Radio>
              <Radio
                name={`${name}.cancellationPolicy.priceSetting`}
                className={"radio-style"}
                value={false}
              >
                {messages["page.TemPlate.notUseBasicPolicy"]}
              </Radio>
            </Radio.Group>
          </Row>
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
      title: messages["page.TemPlate.dayAgo"],
      dataIndex: "",
      key: "title",
      align: "center",
      render: (value, items, index) => {
        return (
          <div className={"justify-center"}>
            <Input
              name={`${name}.cancellationPolicy.groupsCancellation[${index}].datePicker`}
              className={"margin-bottom-0 date-picker-width"}
            />
          </div>
        );
      },
    },
    {
      title: messages["page.TemPlate.received"],
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
              name={`${name}.cancellationPolicy.groupsCancellation[${index}].policy`}
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
          <div className={"justify-center"}>
            <Select
              disabled={disable}
              defaultValue="%"
              name={`${name}.cancellationPolicy.groupsCancellation[${index}].unit`}
              className={"margin-bottom-0 date-picker-width"}
            >
              {SELECT_TEMPLATE.UNIT.map((select, index) => (
                <Select.Option key={index} value={select}>
                  {select}
                </Select.Option>
              ))}
            </Select>
          </div>
        );
      },
    },
  ];
};

const titleTable = [
  { title: "小学生（高学年)" },
  { title: "幼児（食事・寝具あり)" },
  { title: "幼児（食事のみ)" },
  { title: "幼児（寝具のみ)" },
  { title: "幼児（食事・寝具なし)" },
  { title: "幼児（食事・寝具なし)" },
];

CancellationPolicy.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
};

export default memo(CancellationPolicy);
