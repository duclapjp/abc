import React, { memo, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ROLES } from "@iso/constants/common.constant";
import {
  SELECT_TASK_STATUS_LIST,
  SELECT_TASK_PRIORITY_LIST,
} from "@iso/constants/select.constant";
import { Row, Button, Col, Table, Space, Form, Input, Select, Modal } from "antd";
import {
  itemLeftLabel,
  itemRightLabel,
  colRight,
  colLeft,
  colFull,
  itemFullLabel,
} from "@iso/assets/styles/form.style";

import taskActions from "@iso/redux/task/actions";
import PageHeader from "@iso/components/utility/pageHeader";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import { LayoutTasksWrapper } from "@iso/containers/Tasks/Tasks.styles";
import paginationConfig from "@iso/config/pagination.config";
import { tableColumnData } from "@iso/containers/Tasks/tableColumnData";
import { Helmet } from "react-helmet";

const Tasks = () => {
  const { messages } = useIntl();
  const history = useHistory();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const [cacheForm, setCacheForm] = useState(initialValues);
  const [currentPage, setCurrentPage] = useState(paginationConfig.current);
  const [expandedRowsChange, setExpandedRowsChange] = useState([]);
  const {
    Auth: {
      user: { role, chainId },
      dashboardRoute,
    },
    Task: { tasks, directors, assignees, registerPersons, stores, total, loading },
  } = useSelector((state) => state);
  const [form] = Form.useForm();

  const isAdmin = role === ROLES.ADMIN || role === ROLES.SUBADMIN;
  const isChain = role === ROLES.CHAIN;
  const isStore = role === ROLES.STORE;
  const isUser = role === ROLES.USER;
  const isAUC = isAdmin || isUser || isChain;
  const isACS = isAdmin || isChain || isStore;
  const isAU = isAdmin || isUser;

  useEffect(() => {
    dispatch(
      taskActions.getTasks({
        size: paginationConfig.pageSize,
        page: paginationConfig.current,
        status: SELECT_TASK_STATUS_LIST.NOT_CLOSED,
      })
    );
    dispatch(
      taskActions.getTasksMetaData({
        chainId: isChain ? chainId : "",
      })
    );
  }, [dispatch, chainId, isChain]);

  useEffect(() => {
    if (isChain && !chainId) {
      Modal.error({
        title: messages["page.Account.Error"],
        content: messages["page.tasks.notFound"],
        okText: messages["page.Account.Ok"],
        cancelText: messages["page.Account.Cancel"],
      });
    }
  }, [chainId, isChain, messages]);

  const handleSearch = (data) => {
    setExpandedRowsChange([]);
    setCacheForm({
      searchKeyword: data.searchKeyword,
      storeId: data.storeId,
      status: data.status,
      priority: data.priority,
      directorId: data.directorId,
      assigneeId: data.assigneeId,
      registerPersonId: data.registerPersonId,
    });
    setCurrentPage(1);
    dispatch(
      taskActions.getTasks({
        searchKeyword: data.searchKeyword,
        storeId: data.storeId,
        status: data.status,
        priority: data.priority,
        directorId: data.directorId,
        assigneeId: data.assigneeId,
        registerPersonId: data.registerPersonId,
      })
    );
  };

  const handleChangePage = (pagination) => {
    setExpandedRowsChange([]);
    setCurrentPage(pagination.current);
    dispatch(
      taskActions.getTasks({
        searchKeyword: cacheForm.searchKeyword,
        storeId: cacheForm.storeId,
        status: cacheForm.status,
        priority: cacheForm.priority,
        directorId: cacheForm.directorId,
        assigneeId: cacheForm.assigneeId,
        registerPersonId: cacheForm.registerPersonId,
        size: pagination.pageSize,
        page: pagination.current,
      })
    );
  };

  const onExpandTable = (expanded, { taskId }) => {
    if (expanded) {
      dispatch(taskActions.getChildTasks({ taskId }));
    }
  };

  const onResetField = () => {
    form.resetFields();
  };

  const onExpandedRowsChange = (expandedRows) => {
    setExpandedRowsChange(expandedRows);
  };

  return (
    <LayoutWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{messages["sidebar.tasks"]} | HLS</title>
      </Helmet>
      <PageHeader>{messages["sidebar.tasks"]}</PageHeader>
      <LayoutContent>
        <LayoutTasksWrapper>
          <Form
            onFinish={handleSearch}
            colon={false}
            form={form}
            labelAlign="left"
            initialValues={initialValues}
          >
            <Row justify="start" className="mb-5">
              <Col xs={24} lg={{ span: 17, offset: 1 }}>
                <Row>
                  <Col {...colLeft}>
                    <Form.Item
                      name="status"
                      label={messages["page.tasks.status"]}
                      {...itemLeftLabel}
                    >
                      <Select name="status" listHeight={320}>
                        <Select.Option value={null}>
                          {messages["input.select.all"]}
                        </Select.Option>
                        <Select.Option value={SELECT_TASK_STATUS_LIST.NOT_CLOSED}>
                          {SELECT_TASK_STATUS_LIST.NOT_CLOSED}
                        </Select.Option>
                        {SELECT_TASK_STATUS_LIST.OPTIONS.map((select, index) => (
                          <Select.Option key={index} value={select}>
                            {messages[`page.tasks.status.${select}`]}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  {isChain && <Col {...colRight} />}
                  {isAU && (
                    <Col {...colRight}>
                      <Form.Item
                        name="priority"
                        label={messages["page.tasks.priority"]}
                        {...itemRightLabel}
                      >
                        <Select name="priority">
                          <Select.Option value={null}>
                            {messages["input.select.all"]}
                          </Select.Option>
                          {SELECT_TASK_PRIORITY_LIST.OPTIONS.map((select, index) => (
                            <Select.Option key={index} value={select}>
                              {messages[`page.tasks.priority.${select}`]}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  )}
                  {isAUC && (
                    <Col {...colLeft}>
                      <Form.Item
                        name="storeId"
                        label={messages["page.tasks.store"]}
                        {...itemLeftLabel}
                      >
                        <Select name="storeId" {...searchSelect}>
                          <Select.Option value={null}>
                            {messages["input.select.all"]}
                          </Select.Option>
                          {stores.map((select) => (
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
                  )}
                  {isAU && (
                    <>
                      <Col {...colRight}>
                        <Form.Item
                          name="assigneeId"
                          label={messages["page.tasks.assignee"]}
                          {...itemRightLabel}
                        >
                          <Select name="assigneeId" {...searchSelect}>
                            <Select.Option value={null}>
                              {messages["input.select.all"]}
                            </Select.Option>
                            {assignees.map((select) => (
                              <Select.Option
                                key={select.accountId}
                                value={select.accountId}
                              >
                                {select.displayName}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col {...colLeft}>
                        <Form.Item
                          name="directorId"
                          label={messages["page.tasks.director"]}
                          {...itemLeftLabel}
                        >
                          <Select name="directorId" {...searchSelect}>
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
                    </>
                  )}
                  <Col {...colRight}>
                    <Form.Item
                      name="registerPersonId"
                      label={messages["page.tasks.registerPerson"]}
                      {...itemRightLabel}
                    >
                      <Select name="registerPersonId" {...searchSelect}>
                        <Select.Option value={null}>
                          {messages["input.select.all"]}
                        </Select.Option>
                        {registerPersons.map((select) => (
                          <Select.Option
                            key={select.accountId}
                            value={select.accountId}
                          >
                            {select.displayName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col {...colFull}>
                    <Form.Item
                      name="searchKeyword"
                      label={messages["page.tasks.searchKeyword"]}
                      {...itemFullLabel}
                    >
                      <Input
                        placeholder={
                          isStore
                            ? messages[`page.tasks.searchKeywordPlaceholderStore`]
                            : messages[`page.tasks.searchKeywordPlaceholder`]
                        }
                        name="searchKeyword"
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
                    onClick={onResetField}
                  >
                    {messages["page.btn.resetField"]}
                  </Button>
                  <Button htmlType="submit" className="button" type="primary" block>
                    {messages["page.Account.buttonSearch"]}
                  </Button>
                  {isACS && (
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
          <Row justify="center">
            <Col md={24}>
              <Table
                bordered
                rowKey="taskId"
                loading={loading}
                dataSource={tasks}
                columns={tableColumnData({ messages, role, dashboardRoute })}
                pagination={{
                  ...paginationConfig,
                  current: currentPage,
                  responsive: true,
                  total,
                }}
                expandable={{
                  indentSize: 30,
                  onExpand: onExpandTable,
                  onExpandedRowsChange: onExpandedRowsChange,
                  expandedRowKeys: expandedRowsChange,
                }}
                onChange={handleChangePage}
                scroll={{ x: "max-content" }}
              />
            </Col>
          </Row>
        </LayoutTasksWrapper>
      </LayoutContent>
    </LayoutWrapper>
  );
};

const initialValues = {
  searchKeyword: null,
  storeId: null,
  status: SELECT_TASK_STATUS_LIST.NOT_CLOSED,
  priority: null,
  directorId: null,
  assigneeId: null,
  registerPersonId: null,
};

const searchSelect = {
  showSearch: true,
  optionFilterProp: "children",
};

export default memo(Tasks);
