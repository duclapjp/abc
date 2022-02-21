import React from "react";
import { Button } from "antd";
import IntlMessages from "@iso/components/utility/intlMessages";
import { ROLES } from "@iso/constants/common.constant";

export const columns = {
  [ROLES.ADMIN]: [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: <IntlMessages id="page.Account.role" />,
      dataIndex: "role",
      key: "role",
      align: "center",
      render: (value) => <IntlMessages id={`page.Account.${value}`} />,
    },
    {
      title: <IntlMessages id="page.Account.chain" />,
      dataIndex: "chain",
      key: "chain",
      align: "center",
    },
    {
      title: <IntlMessages id="page.Account.store" />,
      dataIndex: "store",
      key: "store",
      align: "center",
    },
    {
      title: <IntlMessages id="page.Account.email" />,
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: <IntlMessages id="page.Account.username" />,
      dataIndex: "username",
      key: "username",
      align: "center",
    },
    {
      title: <IntlMessages id="page.Account.phoneNumber" />,
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: <IntlMessages id="page.Account.memo" />,
      dataIndex: "note",
      key: "note",
      align: "center",
      render: (text) => <Button type="primary"> {text} </Button>,
    },
  ],
  [ROLES.CHAIN]: [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: <IntlMessages id="page.Account.role" />,
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: <IntlMessages id="page.Account.store" />,
      dataIndex: "store",
      key: "store",
      align: "center",
    },
    {
      title: <IntlMessages id="page.Account.email" />,
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: <IntlMessages id="page.Account.username" />,
      dataIndex: "username",
      key: "username",
      align: "center",
    },
    {
      title: <IntlMessages id="page.Account.phoneNumber" />,
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
  ],
  [ROLES.STORE]: [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: <IntlMessages id="page.Account.role" />,
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: <IntlMessages id="page.Account.email" />,
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: <IntlMessages id="page.Account.username" />,
      dataIndex: "username",
      key: "username",
      align: "center",
    },
    {
      title: <IntlMessages id="page.Account.phoneNumber" />,
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
  ],
};

export const apiDataSource = {
  [ROLES.ADMIN]: [
    {
      key: "1",
      id: 1,
      role: "admin",
      chain: "-",
      store: "-",
      mail: "",
      username: "",
      phone: "",
      note: "メモ",
    },
    {
      key: "2",
      id: 2,
      role: "chain",
      chain: "Chain AAA",
      store: "-",
      mail: "",
      username: "",
      phone: "",
      note: "メモ",
    },
    {
      key: "3",
      id: 3,
      role: "store",
      chain: "Chain AAA",
      store: "Store BBB",
      mail: "",
      username: "",
      phone: "",
      note: "メモ",
    },
    {
      key: "4",
      id: 4,
      role: "user",
      chain: "-",
      store: "-",
      mail: "",
      username: "",
      phone: "",
      note: "メモ",
    },
  ],
  [ROLES.CHAIN]: [
    {
      key: "1",
      id: 1,
      role: "チェーン",
      store: "-",
      mail: "",
      username: "",
      phone: "",
    },
    {
      key: "2",
      id: 2,
      role: "施設",
      store: "Store BBB",
      mail: "",
      username: "",
      phone: "",
    },
  ],
  [ROLES.STORE]: [
    {
      key: "1",
      id: 1,
      role: "施設",
      mail: "",
      username: "",
      phone: "",
    },
    {
      key: "2",
      id: 2,
      role: "施設",
      mail: "",
      username: "",
      phone: "",
    },
  ],
};
