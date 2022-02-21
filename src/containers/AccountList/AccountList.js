/* eslint-disable react/display-name */
import React, { useState, useEffect, memo } from "react";
import { Formik } from "formik";
import { useIntl } from "react-intl";
import { Form, Input, Select } from "formik-antd";
import { Row, Button, Modal, Col, Table, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

import { ROLES } from "@iso/constants/common.constant";
import accountActions from "@iso/redux/account/actions";
import PageHeader from "@iso/components/utility/pageHeader";
import paginationConfig from "@iso/config/pagination.config";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import LayoutContent from "@iso/components/utility/layoutContent";
import {
  itemLeftLabel,
  itemRightLabel,
  colRight,
  colLeft,
  colFull,
  itemFullLabel,
} from "@iso/assets/styles/form.style";

import AccountListStyles from "./AccountList.styles";
import { Helmet } from "react-helmet";

const AccountList = () => {
  const [cacheForm, setCacheForm] = useState(initialValues);
  const [currentPage, setCurrentPage] = useState(paginationConfig.current);
  const history = useHistory();
  const { url } = useRouteMatch();
  const { messages } = useIntl();
  const {
    Auth: {
      user: { role },
      dashboardRoute,
    },
    Account: { accounts, total, loading },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const isAdmin = role === ROLES.ADMIN;
  const isChain = role === ROLES.CHAIN;

  useEffect(() => {
    dispatch(
      accountActions.getAccounts({
        size: paginationConfig.pageSize,
        page: paginationConfig.current,
      })
    );
  }, [dispatch, role]);

  const handleSearch = (data) => {
    setCacheForm({
      role: data.role,
      mail: data.mail,
      searchKeyword: data.searchKeyword,
    });
    setCurrentPage(1);
    dispatch(
      accountActions.getAccounts({
        role: data.role,
        mail: data.mail,
        searchKeyword: data.searchKeyword,
      })
    );
  };

  const handleChangePage = (pagination) => {
    setCurrentPage(pagination.current);
    dispatch(
      accountActions.getAccounts({
        role: cacheForm.role,
        mail: cacheForm.mail,
        searchKeyword: cacheForm.searchKeyword,
        size: paginationConfig.pageSize,
        page: pagination.current,
      })
    );
  };

  return (
    <LayoutWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{messages["sidebar.accountList"]} | HLS</title>
      </Helmet>
      <PageHeader>{messages["sidebar.accountList"]}</PageHeader>
      <LayoutContent>
        <AccountListStyles>
          <Formik
            enableReinitialize
            onSubmit={handleSearch}
            initialValues={initialValues}
          >
            {({ values, handleReset }) => (
              <Form colon={false} className="mb-5" labelAlign="left">
                <Row justify="start">
                  <Col xs={24} lg={{ span: 17, offset: 1 }}>
                    <Row>
                      <Col {...colLeft}>
                        <Form.Item
                          {...itemLeftLabel}
                          label={messages["page.Account.role"]}
                          name="role"
                        >
                          <Select value={values.role} className="select" name="role">
                            <Select.Option value={null}>
                              {messages["input.select.all"]}
                            </Select.Option>
                            {isAdmin && (
                              <>
                                <Select.Option value={ROLES.ADMIN}>
                                  {messages["page.Account.admin"]}
                                </Select.Option>
                                <Select.Option value={ROLES.SUBADMIN}>
                                  {messages["page.Account.role_subadmin"]}
                                </Select.Option>
                              </>
                            )}
                            {(isAdmin || isChain) && (
                              <Select.Option value={ROLES.CHAIN}>
                                {messages["page.Account.chain"]}
                              </Select.Option>
                            )}
                            <Select.Option value={ROLES.STORE}>
                              {messages["page.Account.store"]}
                            </Select.Option>
                            {isAdmin && (
                              <Select.Option value={ROLES.USER}>
                                {messages["page.Account.user"]}
                              </Select.Option>
                            )}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col {...colRight}>
                        <Form.Item
                          {...itemRightLabel}
                          label={messages["page.Account.email"]}
                          name="mail"
                        >
                          <Input className="input" name="mail" />
                        </Form.Item>
                      </Col>
                      <Col {...colFull}>
                        <Form.Item
                          {...itemFullLabel}
                          label={messages["page.Account.searchKeyword"]}
                          name="searchKeyword"
                        >
                          <Input
                            name="searchKeyword"
                            placeholder={
                              messages["page.Account.searchKeywordPlaceholder"]
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} lg={{ span: 5 }}>
                    <Space
                      direction="vertical"
                      className="space-btn"
                      align="end"
                      size={24}
                    >
                      <Button
                        htmlType="button"
                        className="button"
                        type="default"
                        block
                        onClick={handleReset}
                      >
                        {messages["page.btn.resetField"]}
                      </Button>
                      <Button
                        htmlType="submit"
                        className="button"
                        type="primary"
                        block
                      >
                        {messages["page.Account.buttonSearch"]}
                      </Button>
                      <Button
                        className="button btn-add"
                        block
                        onClick={() => history.push(`${url}/new`)}
                      >
                        {messages["page.Account.buttonAdd"]}
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
          <Row justify="center">
            <Col xs={24} md={24} xl={24}>
              <Table
                bordered
                rowKey="accountId"
                loading={loading}
                dataSource={accounts}
                columns={generateColumns(messages, role, dashboardRoute)}
                pagination={{
                  ...paginationConfig,
                  current: currentPage,
                  responsive: true,
                  pageSize: paginationConfig.pageSize,
                  total,
                }}
                onChange={handleChangePage}
                scroll={{ x: "max-content" }}
              />
            </Col>
          </Row>
        </AccountListStyles>
      </LayoutContent>
    </LayoutWrapper>
  );
};

const generateColumns = (messages, role, dashboardRoute) => {
  switch (role) {
    case ROLES.ADMIN:
      return [
        {
          title: "ID",
          dataIndex: "accountId",
          key: "id",
          align: "center",
          render: (id) => (
            <Link to={`${dashboardRoute}/account-list/${id}`}>{id}</Link>
          ),
        },
        {
          title: messages["page.Account.role"],
          dataIndex: "role",
          key: "role",
          align: "center",
          render: (value) => messages[`page.Account.${getKeyRole(value)}`],
        },
        {
          title: messages["page.Account.chain"],
          dataIndex: "chainName",
          key: "chainName",
          align: "center",
        },
        {
          title: messages["page.Account.store"],
          dataIndex: "storeName",
          key: "storeName",
          align: "center",
        },
        {
          title: messages["page.Account.email"],
          dataIndex: "mail",
          key: "mail",
          align: "center",
        },
        {
          title: messages["page.Account.username"],
          dataIndex: "displayName",
          key: "displayName",
          align: "center",
        },
        {
          title: messages["page.Account.phoneNumber"],
          dataIndex: "phone",
          key: "phone",
          align: "center",
        },
        {
          title: messages["page.Account.status"],
          dataIndex: "status",
          key: "status",
          align: "center",
        },
        {
          title: messages["page.Account.memo"],
          dataIndex: "note",
          key: "note",
          align: "center",
          render: (text) => {
            const handleClick = () => {
              Modal.info({
                title: messages["page.Account.memo"],
                content: (
                  <div>
                    <p>{text}</p>
                  </div>
                ),
                onOk() {},
              });
            };
            return (
              <Button type="primary" onClick={handleClick} disabled={!text}>
                {messages["page.Account.memo"]}
              </Button>
            );
          },
        },
      ];
    case ROLES.CHAIN:
      return [
        {
          title: "ID",
          dataIndex: "accountId",
          key: "id",
          align: "center",
          render: (id) => (
            <Link to={`${dashboardRoute}/account-list/${id}`}>{id}</Link>
          ),
        },
        {
          title: messages["page.Account.role"],
          dataIndex: "role",
          key: "role",
          align: "center",
          render: (value) => messages[`page.Account.${getKeyRole(value)}`],
        },
        {
          title: messages["page.Account.store"],
          dataIndex: "storeName",
          key: "storeName",
          align: "center",
        },
        {
          title: messages["page.Account.email"],
          dataIndex: "mail",
          key: "mail",
          align: "center",
        },
        {
          title: messages["page.Account.username"],
          dataIndex: "displayName",
          key: "displayName",
          align: "center",
        },
        {
          title: messages["page.Account.phoneNumber"],
          dataIndex: "phone",
          key: "phone",
          align: "center",
        },
      ];
    case ROLES.STORE:
      return [
        {
          title: "ID",
          dataIndex: "accountId",
          key: "id",
          align: "center",
          render: (id) => (
            <Link to={`${dashboardRoute}/account-list/${id}`}>{id}</Link>
          ),
        },
        {
          title: messages["page.Account.role"],
          dataIndex: "role",
          key: "role",
          align: "center",
          render: (value) => messages[`page.Account.${getKeyRole(value)}`],
        },
        {
          title: messages["page.Account.email"],
          dataIndex: "mail",
          key: "mail",
          align: "center",
        },
        {
          title: messages["page.Account.username"],
          dataIndex: "displayName",
          key: "displayName",
          align: "center",
        },
        {
          title: messages["page.Account.phoneNumber"],
          dataIndex: "phone",
          key: "phone",
          align: "center",
        },
      ];
    default:
      return [];
  }
};

const getKeyRole = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return "admin";

    case ROLES.STORE:
      return "store";

    case ROLES.CHAIN:
      return "chain";

    case ROLES.USER:
      return "user";

    case ROLES.SUBADMIN:
      return "subadmin";

    default:
      return null;
  }
};

const initialValues = {
  role: null,
  mail: "",
  searchKeyword: "",
};

export default memo(AccountList);
