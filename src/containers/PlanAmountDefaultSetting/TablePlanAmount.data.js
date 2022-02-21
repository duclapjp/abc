/* eslint-disable react/display-name */
import React from "react";
import { AddRowButton, RemoveRowButton, Radio, Input, Form } from "formik-antd";
import { Space } from "antd";
import { Link } from "react-router-dom";
import moment from "moment-timezone";

import {
  OTA_STATUS,
  TIMEZONE_JAPAN,
  DATE_FORMAT,
} from "@iso/constants/common.constant";

import { tableNames } from "./TablePlanAmount";

const columns = ({ messages, tableName, initPlanAmount, url }) => {
  const typeDefault = tableName === tableNames.defaultPlans;
  const typeRank = tableName === tableNames.amountRanks;

  if (typeDefault) {
    return [
      {
        title: messages["page.planAmountDefaults.th.index"],
        dataIndex: "planId",
        key: "id",
        align: "center",
        width: 100,
        render: (value, row, index) => index + 1,
      },
      {
        title: messages["page.planAmountDefaults.th.templatePlanName"],
        dataIndex: "name",
        key: "name",
        align: "center",
        render: (value, row) => (
          <Link to={`${url}/edit/${row.planId}`}>{value}</Link>
        ),
      },
      {
        title: messages["page.Account.status"],
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (status, row, index) => (
          <Radio.Group
            name={`${tableName}[${index}].status`}
            defaultValue={OTA_STATUS.ENABLED}
          >
            <Radio name={`${tableName}[${index}].status`} value={OTA_STATUS.ENABLED}>
              {messages["page.AmountGroup.valid"]}
            </Radio>
            <Radio
              name={`${tableName}[${index}].status`}
              value={OTA_STATUS.DISABLED}
            >
              {messages["page.AmountGroup.inValid"]}
            </Radio>
          </Radio.Group>
        ),
      },
      {
        title: messages["page.planAmountDefaults.th.createdDate"],
        dataIndex: "createdDate",
        key: "createdDate",
        width: 150,
        align: "center",
        render: (value) => moment(value).tz(TIMEZONE_JAPAN).format(DATE_FORMAT),
      },
      {
        title: messages["page.planAmountDefaults.th.updatedDate"],
        dataIndex: "updatedDate",
        width: 150,
        key: "updatedDate",
        align: "center",
        render: (value) =>
          value ? moment(value).tz(TIMEZONE_JAPAN).format(DATE_FORMAT) : "-",
      },
      {
        title: messages["page.planAmountDefaults.th.createdBy"],
        dataIndex: "createdAccount",
        key: "createdAccount",
        align: "center",
      },
    ];
  } else {
    return [
      ...(typeRank
        ? [
            {
              title: messages["page.planAmountDefaults.th.index"],
              dataIndex: "amountRankId",
              key: "id",
              align: "center",
              width: 100,
              render: (value, row, index) => index + 1,
            },
          ]
        : [
            {
              title: messages["page.planAmountDefaults.th.index"],
              dataIndex: "amountGroupId",
              key: "id",
              align: "center",
              width: 100,
              render: (value, row, index) => index + 1,
            },
          ]),
      ...(typeRank
        ? [
            {
              title: messages["page.planAmountDefaults.th.amountRankName"],
              dataIndex: "amountRankName",
              key: "amountRankName",
              align: "center",
              render: (value, row, index) => (
                <Form.Item name={`${tableName}[${index}].amountRankName`} required>
                  <Input
                    className={`text-center ${value ? "border-none" : null}`}
                    name={`${tableName}[${index}].amountRankName`}
                  />
                </Form.Item>
              ),
            },
          ]
        : [
            {
              title: messages["page.planAmountDefaults.th.amountGroupName"],
              dataIndex: "amountGroupName",
              key: "amountGroupName",
              align: "center",
              render: (value, row) => (
                <Link to={`${url}/edit/${row.amountGroupId}`}>{value}</Link>
              ),
            },
          ]),
      {
        title: messages["page.Account.status"],
        dataIndex: "enable",
        key: "enable",
        align: "center",
        render: (status, row, index) => (
          <Radio.Group name={`${tableName}[${index}].enable`} defaultValue={true}>
            <Radio name={`${tableName}[${index}].enable`} value={true}>
              {messages["page.AmountGroup.valid"]}
            </Radio>
            <Radio name={`${tableName}[${index}].enable`} value={false}>
              {messages["page.AmountGroup.inValid"]}
            </Radio>
          </Radio.Group>
        ),
      },
      {
        title: messages["page.planAmountDefaults.th.createdDate"],
        dataIndex: "createdDate",
        key: "createdDate",
        width: 150,
        align: "center",
      },
      {
        title: messages["page.planAmountDefaults.th.updatedDate"],
        dataIndex: "updatedTime",
        key: "updatedTime",
        width: 150,
        align: "center",
      },
      {
        title: messages["page.planAmountDefaults.th.createdBy"],
        dataIndex: "displayName",
        key: "displayName",
        align: "center",
      },
      ...(typeRank
        ? [
            {
              title: "",
              dataIndex: "action",
              key: "action",
              align: "center",
              width: 150,
              render: (value, row, index) => {
                return (
                  <Space size={5}>
                    <AddRowButton
                      name={tableName}
                      createNewRow={() => initPlanAmount}
                    >
                      +
                    </AddRowButton>
                    <RemoveRowButton name={tableName} index={index}>
                      -
                    </RemoveRowButton>
                  </Space>
                );
              },
            },
          ]
        : []),
    ];
  }
};

export default columns;
