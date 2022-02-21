/* eslint-disable react/display-name  */
import React, { memo } from "react";
import { Row, Col, Table } from "antd";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Form, Input, Checkbox, Select, InputNumber } from "formik-antd";

import Pattern2Style from "../Pattern.styles";

import {
  ColLeft,
  ColRight,
  PlanItemLayout,
  itemLeftLabel,
  itemFullLabel,
  colFull,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import PriceChildren from "./CostComponent/PriceForChildren";
import CancellationPolicy from "./CostComponent/CancellationPolicy";
import { SELECT_TEMPLATE } from "@iso/constants/select.constant";

const PriceDefault = ({ name, disable }) => {
  const { messages } = useIntl();
  return (
    <>
      <PlanItemLayout>
        <ColLeft title={messages["page.TemPlate.titlePriceDefault"]} />
        <ColRight>
          <Pattern2Style>
            <Row className="mt-20">
              <Col {...colFull}>
                <Form.Item
                  label={messages["page.TemPlate.originPlanAndGroupName"]}
                  {...itemFullLabel}
                  name={`${name}.planName`}
                >
                  <Input.TextArea
                    disabled={disable}
                    rows={4}
                    name={`${name}.planName`}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Table
              dataSource={titleTable}
              columns={columns(name, messages, disable)}
              scroll={{ x: "max-content" }}
              bordered
              pagination={false}
              rowKey={(r) => r.title}
              className={"mb-20"}
            />
            <Row>
              <Col {...colFull}>
                <Form.Item
                  label={messages["page.TemPlate.information"]}
                  {...itemFullLabel}
                  name={`${name}.note`}
                >
                  <Input.TextArea
                    disabled={disable}
                    rows={4}
                    name={`${name}.note`}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Pattern2Style>
        </ColRight>
      </PlanItemLayout>
      <PriceChildren name={name} disable={disable} />
      <CancellationPolicy name={name} disable={disable} />
    </>
  );
};

const columns = (name, messages, disable) => {
  return [
    {
      title: messages["page.TemPlate.changPlanAndGroup"],
      dataIndex: "title",
      key: "title",
      align: "center",
      render: (value, row, index) => {
        return (
          <Form.Item
            {...itemLeftLabel}
            name={`${name}.amountGroup[${index}].selected`}
            className={"margin-bottom-0"}
          >
            <Checkbox
              disabled={disable}
              name={`${name}.amountGroup[${index}].selected`}
            >
              {value}
            </Checkbox>
          </Form.Item>
        );
      },
    },
    {
      title: messages["page.TemPlate.increaseAndDecrease"],
      dataIndex: "",
      key: "",
      align: "center",
      render: (value, row, index) => {
        return (
          <div className={"justify-center"}>
            <Form.Item
              name={`${name}.amountGroup[${index}].increaseDecrease`}
              className={"margin-bottom-0 select-width"}
            >
              <Select
                disabled={disable}
                defaultValue="+"
                name={`${name}.amountGroup[${index}].increaseDecrease`}
              >
                {SELECT_TEMPLATE.INCREASE_DECREASE.map((select, index) => (
                  <Select.Option key={index} value={select}>
                    {select}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        );
      },
    },
    {
      title: messages["page.TemPlate.feeAndRate"],
      dataIndex: "",
      key: "",
      align: "center",
      render: (value, row, index) => {
        return (
          <div className={"justify-center"}>
            <Form.Item
              name={`${name}.amountGroup[${index}].feeRate`}
              className={"margin-bottom-0 input-width"}
            >
              <InputNumber
                disabled={disable}
                min={1}
                name={`${name}.amountGroup[${index}].feeRate`}
              />
            </Form.Item>
          </div>
        );
      },
    },
    {
      title: messages["page.TemPlate.percent"],
      dataIndex: "",
      key: "",
      align: "center",
      render: (value, row, index) => {
        return (
          <div className={"justify-center"}>
            <Form.Item
              name={`${name}.amountGroup[${index}].unit`}
              className={"margin-bottom-0 select-width"}
            >
              <Select
                disabled={disable}
                defaultValue="%"
                name={`${name}.amountGroup[${index}].unit`}
              >
                {SELECT_TEMPLATE.UNIT.map((select, index) => (
                  <Select.Option key={index} value={select}>
                    {select}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        );
      },
    },
  ];
};

const titleTable = [{ title: "1名あたり" }, { title: "1室あたり" }];

PriceDefault.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
};

export default memo(PriceDefault);
