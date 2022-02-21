import React, { memo, useEffect, useState } from "react";
import { Row, Button, Col, Table, Space } from "antd";
import { Form, Input, Select } from "formik-antd";
import { Formik } from "formik";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import LayoutContent from "@iso/components/utility/layoutContent";
import PageHeader from "@iso/components/utility/pageHeader";
import ChainsStyleWrapper from "./Chains.styles";
import chainActions from "@iso/redux/chain/actions";
import paginationConfig from "@iso/config/pagination.config";
import { SELECT_CONTRACT_STATUS } from "@iso/constants/select.constant";
import {
  itemLeftLabel,
  itemRightLabel,
  colRight,
  colLeft,
  colFull,
  itemFullLabel,
} from "@iso/assets/styles/form.style";
import { Helmet } from "react-helmet";

const Chains = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(initialValues);
  const [currentPage, setCurrentPage] = useState(paginationConfig.current);
  const { chainOptions, total, chains, loading } = useSelector(
    (state) => state.Chain
  );
  const dashboardRoute = useSelector((state) => state.Auth.dashboardRoute);
  const { url } = useRouteMatch();
  const { messages } = useIntl();

  useEffect(() => {
    dispatch(chainActions.getChainOptions());
    dispatch(
      chainActions.getChains({
        size: paginationConfig.pageSize,
        page: paginationConfig.current,
      })
    );
  }, [dispatch]);

  const onSubmit = (data) => {
    setFilter({ ...data });
    setCurrentPage(1);
    dispatch(
      chainActions.getChains({
        ...data,
      })
    );
  };

  const onChange = (pagination) => {
    setCurrentPage(pagination.current);
    dispatch(
      chainActions.getChains({
        ...filter,
        size: paginationConfig.pageSize,
        page: pagination.current,
      })
    );
  };

  return (
    <LayoutWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{messages["sidebar.chains"]} | HLS</title>
      </Helmet>
      <PageHeader>{messages["sidebar.chains"]}</PageHeader>
      <LayoutContent>
        <ChainsStyleWrapper>
          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ values, handleReset }) => (
              <Form colon={false} labelAlign="left">
                <Row justify="start" className="mb-5">
                  <Col xs={24} lg={{ span: 17, offset: 1 }}>
                    <Row>
                      <Col {...colLeft}>
                        <Form.Item
                          {...itemLeftLabel}
                          label={messages["page.chains.contractStatus"]}
                          name="contractStatus"
                        >
                          <Select
                            className="select"
                            name="contractStatus"
                            value={values.contractStatus}
                          >
                            <Select.Option value={null}>
                              {messages["input.select.all"]}
                            </Select.Option>
                            {SELECT_CONTRACT_STATUS.map((status, index) => (
                              <Select.Option value={status} key={index}>
                                {status}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col {...colRight}>
                        <Form.Item
                          {...itemRightLabel}
                          label={messages["page.chains.chainName"]}
                          name="chainId"
                        >
                          <Select
                            value={values.chainId}
                            className="select"
                            name="chainId"
                            showSearch
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            <Select.Option value={null}>
                              {messages["input.select.all"]}
                            </Select.Option>
                            {chainOptions.map((chain) => (
                              <Select.Option
                                value={chain.chainId}
                                key={chain.chainId}
                              >
                                {chain["name"]}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col {...colFull}>
                        <Form.Item
                          {...itemFullLabel}
                          label={messages["page.chains.keywords"]}
                          name="searchKeyword"
                        >
                          <Input
                            name="searchKeyword"
                            placeholder={
                              messages["page.chains.searchKeywordPlaceholder"]
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
                        type="primary"
                        className="button"
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
          />
          <Table
            bordered
            dataSource={chains}
            columns={columns(messages, dashboardRoute)}
            pagination={{
              ...paginationConfig,
              current: currentPage,
              responsive: true,
              pageSize: paginationConfig.pageSize,
              total,
            }}
            onChange={onChange}
            loading={loading}
            scroll={{ x: "max-content" }}
            rowKey={(record, index) => index.toString()}
          />
        </ChainsStyleWrapper>
      </LayoutContent>
    </LayoutWrapper>
  );
};

const initialValues = {
  contractStatus: null,
  chainId: null,
  searchKeyword: "",
};

const columns = (message, dashboardRoute) => [
  {
    title: "ID",
    dataIndex: "chainId",
    key: "chainId",
    align: "center",
    render: (id) => <Link to={`${dashboardRoute}/chains/${id}`}>{id}</Link>,
  },
  {
    title: message["page.chains.table.status"],
    dataIndex: "contractStatus",
    key: "contractStatus",
    align: "center",
  },
  {
    title: message["page.chains.table.name"],
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: message["page.chains.table.directorCharge1"],
    dataIndex: "directorName1",
    key: "directorName1",
    align: "center",
  },
  {
    title: message["page.chains.table.directorCharge2"],
    dataIndex: "directorName2",
    key: "directorName2",
    align: "center",
  },
  {
    title: message["page.chains.table.directorCharge3"],
    dataIndex: "directorName3",
    key: "directorName3",
    align: "center",
  },
];

export default memo(Chains);
