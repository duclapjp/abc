import React from "react";
import PropTypes from "prop-types";
import { Col, DatePicker, Row } from "antd";
import { Form, Select, InputNumber } from "formik-antd";
import { useIntl } from "react-intl";
import { SELECT_TASK_STATUS_LIST } from "@iso/constants/select.constant";

import { DATE_FORMAT } from "@iso/constants/common.constant";
import {
  colRight,
  colLeft,
  itemHorizonFullLabel,
} from "@iso/assets/styles/form.style";
import moment from "moment";

const AdminCommentFields = ({
  values,
  setFieldValue,
  userAssigneeList,
  handleDateFieldChange,
}) => {
  const { messages } = useIntl();

  return (
    <Row span={24} gutter={8} className="admin-comment-field">
      <Col {...colLeft} className="gutter-row">
        <Form.Item
          {...itemHorizonFullLabel}
          label={messages["page.taskAddEdit.status"]}
          name="status"
        >
          <Select name="status">
            {SELECT_TASK_STATUS_LIST.OPTIONS.map((select, index) => (
              <Select.Option key={index} value={select}>
                {select}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col {...colRight} className="gutter-row">
        <Form.Item
          {...itemHorizonFullLabel}
          label={messages["page.taskAddEdit.assignee"]}
          name="assigneeId"
        >
          <Select
            showSearch
            name="assigneeId"
            optionLabelProp="label"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Select.Option value={""} />
            {userAssigneeList.map((select) => (
              <Select.Option
                key={select.accountId}
                value={select.accountId}
                label={select.displayName}
              >
                {select.displayName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col {...colLeft}>
        <Form.Item
          {...itemHorizonFullLabel}
          label={messages["page.taskAddEdit.startDate"]}
          name="startDate"
        >
          <DatePicker
            name="startDate"
            placeholder="yyyy/dd/mm"
            value={values.startDate && moment(values.startDate, DATE_FORMAT)}
            format={DATE_FORMAT}
            onChange={handleDateFieldChange(setFieldValue, "startDate")}
          />
        </Form.Item>
      </Col>

      <Col {...colRight}>
        <Form.Item
          {...itemHorizonFullLabel}
          label={messages["page.taskAddEdit.deadline"]}
          name="dueDate"
        >
          <DatePicker
            name="dueDate"
            placeholder="yyyy/dd/mm"
            value={values.dueDate && moment(values.dueDate, DATE_FORMAT)}
            format={DATE_FORMAT}
            onChange={handleDateFieldChange(setFieldValue, "dueDate")}
          />
        </Form.Item>
      </Col>

      <Col {...colLeft}>
        <Form.Item
          {...itemHorizonFullLabel}
          label={messages["page.taskAddEdit.estimateTime"]}
          name="estTime"
        >
          <InputNumber min={1} name="estTime" />
        </Form.Item>
      </Col>
      <Col {...colRight}>
        <Form.Item
          {...itemHorizonFullLabel}
          label={messages["page.taskAddEdit.estimatePoint"]}
          name="estPoint"
        >
          <InputNumber min={1} name="estPoint" />
        </Form.Item>
      </Col>
    </Row>
  );
};

AdminCommentFields.propTypes = {
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  userAssigneeList: PropTypes.array.isRequired,
  handleDateFieldChange: PropTypes.func.isRequired,
};

export default AdminCommentFields;
