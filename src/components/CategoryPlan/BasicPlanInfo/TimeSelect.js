import React from "react";
import { Col, Row } from "antd";
import { FormItem, Select } from "formik-antd";
import PropsTypes from "prop-types";

const TimeSelectComponents = ({
  formItemName1,
  formItemName2,
  message,
  disable,
}) => {
  return (
    <Row gutter={[10, 0]}>
      {message && (
        <Col lg={6} xs={24} sm={24} className={"padding-0"}>
          <div className={"m-10"}>{message}</div>
        </Col>
      )}
      <Col lg={message ? 9 : 12} xs={12} sm={12} md={12}>
        <div className={"d-flex"}>
          <FormItem name={formItemName1}>
            <Select
              className={"select-full-width"}
              name={formItemName1}
              disabled={disable}
              size={"middle"}
            >
              {hours.map((select, index) => (
                <Select.Option key={index} value={select}>
                  {select}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <div className={"minutes-style"}>時</div>
        </div>
      </Col>
      <Col lg={message ? 9 : 12} xs={12} sm={12} md={12}>
        <div className={"d-flex"}>
          <FormItem name={formItemName2}>
            <Select
              className={"select-full-width"}
              name={formItemName2}
              disabled={disable}
              size={"middle"}
              placeholder={""}
            >
              <Select.Option value={0}>{0}</Select.Option>
              <Select.Option value={15}>{15}</Select.Option>
              <Select.Option value={30}>{30}</Select.Option>
              <Select.Option value={45}>{45}</Select.Option>
            </Select>
          </FormItem>
          <div className={"minutes-style"}>分</div>
        </div>
      </Col>
    </Row>
  );
};

const hours = [];
for (let i = 1; i <= 29; i++) {
  hours.push(i);
}

TimeSelectComponents.propTypes = {
  formItemName1: PropsTypes.any,
  formItemName2: PropsTypes.any,
  message: PropsTypes.any,
  disable: PropsTypes.bool,
};
export default TimeSelectComponents;
