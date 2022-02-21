/* eslint-disable react/display-name */
import React, { useEffect, useState, memo } from "react";
import { Formik } from "formik";
import { useIntl } from "react-intl";
import { Form, Input, Select } from "formik-antd";
import { Row, Button, Col, Table, Space } from "antd";
import { ROLES } from "@iso/constants/common.constant";
import { SELECT_CONTRACT_STATUS } from "@iso/constants/select.constant";
import { pick } from "lodash";

import storeActions from "@iso/redux/store/actions";
import { LayoutStoresWrapper } from "@iso/containers/Stores/Stores.styles";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import PageHeader from "@iso/components/utility/pageHeader";
import LayoutContent from "@iso/components/utility/layoutContent";
import { useSelector, useDispatch } from "react-redux";
import paginationConfig from "@iso/config/pagination.config";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import {
  itemLeftLabel,
  itemRightLabel,
  colRight,
  colLeft,
  colFull,
  itemFullLabel,
} from "@iso/assets/styles/form.style";
import { Helmet } from "react-helmet";

const Stores = () => {
  const { messages } = useIntl();
  const history = useHistory();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const [cacheForm, setCacheForm] = useState(initialValues);
  const [currentPage, setCurrentPage] = useState(paginationConfig.current);
  const {
    Auth: {
      user: { role },
      dashboardRoute,
    },
    Store: { stores, directors, total, loading, selectStores },
  } = useSelector((state) => state);

  const isChain = role === ROLES.CHAIN;

  useEffect(() => {
    dispatch(
      storeActions.getStoresData({
        data: {
          size: paginationConfig.pageSize,
          page: paginationConfig.current,
        },
      })
    );
    dispatch(storeActions.getStoresMetaData());
  }, [dispatch, role]);

  const handleSearch = (data) => {
    setCurrentPage(1);
    if (!isChain) {
      const searchData = pick(data, [
        "directorId",
        "chainId",
        "contractStatus",
        "searchKeyword",
      ]);
      setCacheForm({ ...searchData });
      dispatch(storeActions.getStoresData({ data: searchData }));
    } else {
      setCacheForm({ ...data });
      dispatch(storeActions.getStoresData({ data }));
    }
  };

  const handleChangePage = (pagination) => {
    setCurrentPage(pagination.current);
    dispatch(
      storeActions.getStoresData({
        data: {
          ...cacheForm,
          size: paginationConfig.pageSize,
          page: pagination.current,
        },
      })
    );
  };

  const colDirector = role === ROLES.CHAIN ? colLeft : colRight;
  const itemDirector = role === ROLES.CHAIN ? itemLeftLabel : itemRightLabel;

  return (
    <LayoutWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{messages["sidebar.storeList"]} | HLS</title>
      </Helmet>
      <PageHeader>{messages["sidebar.storeList"]}</PageHeader>
      <LayoutContent>
        <LayoutStoresWrapper>
          <Formik onSubmit={handleSearch} initialValues={initialValues}>
            {({ values, handleReset }) => (
              <Form colon={false} labelAlign="left">
                <Row justify="start" className="mb-5">
                  <Col xs={24} lg={{ span: 17, offset: 1 }}>
                    <Row>
                      {[ROLES.ADMIN, ROLES.USER, ROLES.SUBADMIN].includes(role) && (
                        <Col {...colLeft}>
                          <Form.Item
                            name="contractStatus"
                            label={messages["page.storeList.contractStatus"]}
                            {...itemLeftLabel}
                          >
                            <Select
                              name="contractStatus"
                              value={values.contractStatus}
                            >
                              <Select.Option value={null}>
                                {messages["input.select.all"]}
                              </Select.Option>
                              {SELECT_CONTRACT_STATUS.map((select, index) => (
                                <Select.Option key={index} value={select}>
                                  {messages[`page.storeList.${select}`]}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      )}
                      <Col {...colDirector}>
                        <Form.Item
                          name="directorId"
                          label={messages["page.storeList.director"]}
                          {...itemDirector}
                        >
                          <Select
                            name="directorId"
                            value={values.directorId}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            <Select.Option value={null}>
                              {messages["input.select.all"]}
                            </Select.Option>
                            {directors.map((select) => (
                              <Select.Option
                                key={select.directorId}
                                value={select.directorId}
                              >
                                {select.displayName}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      {isChain ? (
                        <Col {...colRight}>
                          <Form.Item
                            label={messages["page.storeList.storeName"]}
                            name="storeId"
                            {...itemRightLabel}
                          >
                            <Select
                              {...searchSelect}
                              name="storeId"
                              value={values.storeId}
                            >
                              <Select.Option value={null}>
                                {messages["input.select.all"]}
                              </Select.Option>
                              {selectStores.map((select) => (
                                <Select.Option
                                  key={select.storeId}
                                  value={select.storeId}
                                >
                                  {select.name}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      ) : (
                        <Col {...colFull}>
                          <Form.Item
                            label={messages["page.Account.searchKeyword"]}
                            name="searchKeyword"
                            {...itemFullLabel}
                          >
                            <Input
                              allowClear
                              name="searchKeyword"
                              placeholder={
                                messages["page.storeList.searchKeywordPlaceholder"]
                              }
                            />
                          </Form.Item>
                        </Col>
                      )}
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
                      {(role === ROLES.ADMIN || role === ROLES.SUBADMIN) && (
                        <Button
                          className="button btn-add"
                          block
                          onClick={() => history.push(`${url}/new`)}
                        >
                          {messages["page.Account.buttonAdd"]}
                        </Button>
                      )}
                    </Space>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
          <Row justify="center">
            <Col md={24}>
              <Table
                bordered
                rowKey="storeId"
                loading={loading}
                dataSource={stores}
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
        </LayoutStoresWrapper>
      </LayoutContent>
    </LayoutWrapper>
  );
};

const generateColumns = (messages, role, dashboardRoute) => {
  switch (role) {
    case ROLES.ADMIN:
    case ROLES.SUBADMIN:
    case ROLES.USER:
      return [
        {
          title: "ID",
          dataIndex: "storeId",
          key: "id",
          align: "center",
          render: (id) => (
            <Link to={`${dashboardRoute}/stores/edit/${id}`}>{id}</Link>
          ),
        },
        {
          title: messages["page.storeList.contractStatus"],
          dataIndex: "contractStatus",
          key: "contractStatus",
          align: "center",
          render: (contractStatus) => (
            <div>{messages[`page.storeList.${contractStatus}`]}</div>
          ),
        },
        {
          title: messages["page.storeList.director"],
          dataIndex: "directorName",
          key: "directorName",
          align: "center",
        },
        {
          title: messages["page.storeList.storeName"],
          dataIndex: "name",
          key: "name",
          align: "center",
        },
        {
          title: messages["page.Account.chain"],
          dataIndex: "chainName",
          key: "chainName",
          align: "center",
        },
        {
          title: messages["page.storeList.siteController"],
          dataIndex: "otas",
          key: "otas",
          align: "center",
          render: (otas) => (
            <>
              {otas.map((ota, index) => (
                <span key={index} className="d-block">
                  - {ota.otaTypeName}
                </span>
              ))}
            </>
          ),
        },
      ];
    case ROLES.CHAIN:
      return [
        {
          title: "ID",
          dataIndex: "storeId",
          key: "id",
          align: "center",
          render: (id) => (
            <Link to={`${dashboardRoute}/stores/edit/${id}`}>{id}</Link>
          ),
        },
        {
          title: messages["page.storeList.director"],
          dataIndex: "directorName",
          key: "directorName",
          align: "center",
        },
        {
          title: messages["page.storeList.storeName"],
          dataIndex: "name",
          key: "name",
          align: "center",
        },
        {
          title: messages["page.storeList.logIn"],
          dataIndex: "logIn",
          key: "logIn",
          align: "center",
          // eslint-disable-next-line react/display-name
          render: (cell, row) => {
            return (
              <Button
                type="primary"
                href={`${dashboardRoute}/login-store/${row.storeId}`}
                target="_blank"
              >
                {messages["page.storeList.logIn"]}
              </Button>
            );
          },
        },
      ];
    default:
      return [];
  }
};

const searchSelect = {
  showSearch: true,
  optionFilterProp: "children",
};

const initialValues = {
  directorId: null,
  chainId: null,
  contractStatus: null,
  searchKeyword: "",
  storeId: null,
};

export default memo(Stores);
