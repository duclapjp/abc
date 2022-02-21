/* eslint-disable react/display-name */
import React from "react";
import { Button, DatePicker, Tooltip } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import moment from "moment-timezone";

import IntlMessages from "@iso/components/utility/intlMessages";
import FormInputCell from "@iso/components/common/table-cell/FormInputCell";
import FormSelectCell from "@iso/components/common/table-cell/FormSelectCell";
import MemoCell from "@iso/components/common/table-cell/MemoCell";
import { DATE_FORMAT } from "@iso/constants/common.constant";

export const columns = ({
  otaOptions,
  handleDataChange,
  size,
  editing,
  arrayHelpers,
  tableFieldName,
  isUser,
  handleUpdateExpired,
  otaTypeId,
}) => {
  return [
    ...(editing
      ? [
          {
            title: <IntlMessages id="page.storeAddEdit.action" />,
            dataIndex: "action",
            key: "action",
            align: "center",
            width: 150,
            render: (cell, row, index) => {
              return (
                <span className="btn-action-group">
                  <Button
                    onClick={() => arrayHelpers.push(initOtaData)}
                    disabled={!editing || isUser}
                  >
                    +
                  </Button>
                  <Button
                    disabled={size <= 1 || !editing || isUser}
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    -
                  </Button>
                </span>
              );
            },
          },
        ]
      : []),
    {
      title: <IntlMessages id="page.otaList.th.serviceName" />,
      dataIndex: "otaId",
      key: "otaId",
      align: "center",
      width: 300,
      render: (value, row, index) => {
        return (
          <FormSelectCell
            inputValue={value}
            name={`${tableFieldName}[${index}].otaId`}
            options={otaOptions}
            disabled={!editing || isUser}
            handleDataChange={handleDataChange}
            tableFieldName={`${tableFieldName}[${index}]`}
            otaTypeId={otaTypeId}
          />
        );
      },
    },
    {
      title: <IntlMessages id="page.otaDetail.loginUrl" />,
      dataIndex: "url",
      key: "url",
      align: "center",
      width: 200,
      render: (value, row, index) => {
        return (
          <div className="url-wrapper">
            <FormInputCell
              inputValue={value}
              name={`${tableFieldName}[${index}].url`}
              disabled={!editing || isUser}
            />
            <Tooltip
              title={"新しいタブでリンクを開く。"}
              onClick={() => window.open(value, "_blank")}
              className="hyper-link"
            >
              <LinkOutlined />
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: <IntlMessages id="page.storeAddEditEmail.id" />,
      dataIndex: "customStoreId",
      key: "customStoreId",
      align: "center",
      width: 150,
      render: (value, row, index) => {
        return (
          <FormInputCell
            inputValue={value}
            name={`${tableFieldName}[${index}].customStoreId`}
            disabled={isUser || !editing || !row.displayStoreId}
          />
        );
      },
    },
    {
      title: <IntlMessages id="page.otaDetail.loginID" />,
      dataIndex: "username",
      key: "username",
      align: "center",
      width: 150,
      render: (value, row, index) => {
        return (
          <FormInputCell
            inputValue={value}
            name={`${tableFieldName}[${index}].username`}
            disabled={!editing || isUser}
          />
        );
      },
    },
    {
      title: <IntlMessages id="page.storeAddEditEmail.password" />,
      dataIndex: "password",
      key: "password",
      align: "center",
      width: 150,
      render: (value, row, index) => {
        return (
          <FormInputCell
            inputValue={value}
            name={`${tableFieldName}[${index}].password`}
            disabled={!editing}
          />
        );
      },
    },
    ...(editing
      ? [
          {
            title: <IntlMessages id="page.storeAddEditEmail.btnUpdateExpired" />,
            dataIndex: "username",
            key: "username",
            align: "center",
            width: 150,
            render: (cell, row) => {
              const { customStoreId, username, password, note, url, otaId } = row;
              return (
                <Button
                  type="primary"
                  disabled={!otaId}
                  onClick={() =>
                    handleUpdateExpired({
                      customStoreId,
                      username,
                      password,
                      note,
                      url,
                      otaId,
                    })
                  }
                >
                  <IntlMessages id="page.storeAddEditEmail.btnUpdateExpired" />
                </Button>
              );
            },
          },
        ]
      : []),
    {
      title: <IntlMessages id="page.storeAddEditEmail.expiredDate" />,
      dataIndex: "expiredDate",
      key: "expiredDate",
      align: "center",
      width: 170,
      render: (cell) => {
        return (
          <DatePicker
            value={cell && moment(cell, DATE_FORMAT)}
            placeholder="yyyy/dd/mm"
            format={DATE_FORMAT}
            // onChange={(valueChange) => {
            //   const formatValue = valueChange
            //     ? moment(valueChange).format(DATE_FORMAT)
            //     : null;
            //   handleDataChange(
            //     `${tableFieldName}[${index}].expiredDate`,
            //     formatValue
            //   );
            // }}
            // disabledDate={(current) => {
            //   return current && current < moment().endOf("day");
            // }}
            disabled
          />
        );
      },
    },
    ...(editing
      ? [
          {
            title: <IntlMessages id="page.storeAddEditEmail.memo" />,
            dataIndex: "note",
            key: "note",
            align: "center",
            width: 150,
            render: (cell, row, index) => {
              return (
                <MemoCell
                  inputValue={cell}
                  disabled={!editing || isUser}
                  onChange={(valueChange) =>
                    handleDataChange(`${tableFieldName}[${index}].note`, valueChange)
                  }
                />
              );
            },
          },
        ]
      : []),
  ];
};

export const initOtaData = {};
