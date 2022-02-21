/* eslint-disable react/display-name */
import React from "react";
import IntlMessages from "@iso/components/utility/intlMessages";
import { Button } from "antd";
// import moment from "moment";
import FormInputCell from "@iso/components/common/table-cell/FormInputCell";
import FormSelectCell from "@iso/components/common/table-cell/FormSelectCell";
import MemoCell from "@iso/components/common/table-cell/MemoCell";
// import { DATE_FORMAT } from "@iso/constants/common.constant";

export const columns = ({
  siteControllers = [],
  handleDataChange,
  size,
  editing,
  arrayHelpers,
  tableFieldName,
  isUser,
}) => {
  return [
    {
      title: <IntlMessages id="page.storeAddEditEmail.siteController" />,
      dataIndex: "siteControllerId",
      key: "siteControllerId",
      align: "center",
      width: 300,
      render: (value, row, index) => {
        return (
          <FormSelectCell
            inputValue={value}
            name={`${tableFieldName}[${index}].siteControllerId`}
            options={siteControllers}
            disabled={isUser || !editing}
          />
        );
      },
    },
    {
      title: <IntlMessages id="page.storeAddEditEmail.url" />,
      dataIndex: "url",
      key: "url",
      align: "center",
      width: 200,
      render: (value, row, index) => {
        return (
          <FormInputCell
            inputValue={value}
            name={`${tableFieldName}[${index}].url`}
            disabled={isUser || !editing}
          />
        );
      },
    },
    {
      title: <IntlMessages id="page.storeAddEditEmail.id" />,
      dataIndex: "storeCode",
      key: "storeCode",
      align: "center",
      width: 150,
      render: (value, row, index) => {
        return (
          <FormInputCell
            inputValue={value}
            name={`${tableFieldName}[${index}].storeCode`}
            disabled={isUser || !editing}
          />
        );
      },
    },
    {
      title: <IntlMessages id="page.storeAddEditEmail.username" />,
      dataIndex: "username",
      key: "username",
      align: "center",
      width: 150,
      render: (value, row, index) => {
        return (
          <FormInputCell
            inputValue={value}
            name={`${tableFieldName}[${index}].username`}
            disabled={isUser || !editing}
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
    // ...(editing
    //   ? [
    //       {
    //         title: <IntlMessages id="page.storeAddEditEmail.btnUpdateExpired" />,
    //         dataIndex: "btnUpdateExpired",
    //         key: "btnUpdateExpired",
    //         align: "center",
    //         width: 150,
    //         render: () => (
    //           <Button type="primary">
    //             <IntlMessages id="page.storeAddEditEmail.btnUpdateExpired" />
    //           </Button>
    //         ),
    //       },
    //     ]
    //   : []),
    // {
    //   title: <IntlMessages id="page.storeAddEditEmail.expiredDate" />,
    //   dataIndex: "expiredDate",
    //   key: "expiredDate",
    //   align: "center",
    //   width: 170,
    //   render: (cell, row, index) => {
    //     return (
    //       <DatePicker
    //         value={cell && moment(cell, DATE_FORMAT)}
    //         placeholder="yyyy/dd/mm"
    //         format={DATE_FORMAT}
    //         onChange={(valueChange) => {
    //           const formatValue = valueChange
    //             ? moment(valueChange).format(DATE_FORMAT)
    //             : null;
    //           handleDataChange(
    //             `${tableFieldName}[${index}].expiredDate`,
    //             formatValue
    //           );
    //         }}
    //         disabledDate={(current) => {
    //           return current && current < moment().endOf("day");
    //         }}
    //         disabled={!editing}
    //       />
    //     );
    //   },
    // },
    ...(editing
      ? [
          {
            title: <IntlMessages id="page.storeAddEditEmail.memo" />,
            dataIndex: "note",
            key: "note",
            align: "center",
            width: 150,
            render: (cell, row, index) => (
              <MemoCell
                inputValue={cell}
                disabled={isUser || !editing}
                onChange={(valueChange) =>
                  handleDataChange(`${tableFieldName}[${index}].note`, valueChange)
                }
              />
            ),
          },
          {
            title: "",
            dataIndex: "action",
            key: "action",
            align: "center",
            width: 150,
            render: (cell, row, index) => {
              return (
                <span className="btn-action-group">
                  <Button
                    onClick={() => arrayHelpers.push(initSiteData)}
                    disabled={isUser || !editing}
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
  ];
};

export const initSiteData = {
  siteControllerId: null,
  url: "",
  storeCode: "",
  username: "",
  password: "",
  // expiredDate: "",
  note: "",
};
