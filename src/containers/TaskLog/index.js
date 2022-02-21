import React, { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import { useIntl } from "react-intl";
import { Form, Input } from "formik-antd";
import { Row, Button, Col, Space, Table, DatePicker } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { useHistory, useLocation } from "react-router-dom";
import { KEYS } from "@iso/constants/common.constant";
import { DATE_FORMAT } from "@iso/constants/common.constant";
import taskActions from "@iso/redux/task/actions";
import queryString from "query-string";
import moment from "moment-timezone";
import { tableColumnData } from "@iso/containers/TaskLog/tableColumnData";

import PageHeader from "@iso/components/utility/pageHeader";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import LayoutContent from "@iso/components/utility/layoutContent";
import TaskLogStyle from "./TaskLog.styles";
import { Helmet } from "react-helmet";

const TaskLog = () => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const { taskLogs, loading } = useSelector((state) => state.Task);
  const { dashboardRoute } = useSelector((state) => state.Auth);
  const [status, setStatus] = useState(KEYS.TODAY);
  const [initialValues, setInitialValue] = useState(initialValueDefault);
  const todayMoment = moment();
  const todayDate = todayMoment.format(DATE_FORMAT);
  const yesterdayDate = todayMoment.subtract(1, "days").format(DATE_FORMAT);
  const location = queryString.parse(search);

  useEffect(() => {
    if (search === "") {
      dispatch(
        taskActions.getTaskLog({
          params: `?startDate=${todayDate}`,
        })
      );
      setInitialValue({
        startDate: todayDate,
        endDate: todayDate,
      });
    } else {
      dispatch(
        taskActions.getTaskLog({
          params: search,
        })
      );
      setInitialValue({
        username: location.username,
        startDate: location.startDate,
        endDate: location.endDate,
      });
      setStatus(KEYS.MORE);
    }
  }, [
    dispatch,
    history,
    location.endDate,
    location.startDate,
    location.username,
    search,
    todayDate,
  ]);

  const handleDateFieldChange = useCallback(
    (setFieldValue, name) => (value) => {
      const formatValue = value ? moment(value).format(DATE_FORMAT) : null;
      setFieldValue(name, formatValue);
      setStatus(KEYS.MORE);
    },
    []
  );

  const getTaskDate = (date, dashboardRoute) => {
    if (date === KEYS.TODAY) {
      history.push(
        `${dashboardRoute}/tasklogs?startDate=${todayDate}&endDate=${todayDate}`
      );
    } else {
      history.push(
        `${dashboardRoute}/tasklogs?startDate=${yesterdayDate}&endDate=${yesterdayDate}`
      );
      setStatus(KEYS.YESTERDAY);
    }
  };

  const onFinish = (fieldsValue) => {
    const { startDate, endDate, username } = fieldsValue;
    if (status === KEYS.TODAY) {
      history.push(
        `${dashboardRoute}/tasklogs?startDate=${todayDate}&endDate=${todayDate}`
      );
    } else if (status === KEYS.YESTERDAY) {
      history.push(
        `${dashboardRoute}/tasklogs?startDate=${yesterdayDate}&endDate=${yesterdayDate}`
      );
    } else {
      const paramStartDate = !isEmpty(startDate) ? `startDate=${startDate}` : "";
      const paramEndDate = !isEmpty(endDate) ? `&endDate=${endDate}` : "";
      const paramUsername = !isEmpty(username) ? `&username=${username}` : "";
      history.push(
        `${dashboardRoute}/tasklogs?${paramStartDate}${paramEndDate}${paramUsername}`
      );
    }
  };

  return (
    <LayoutWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{messages["page.TaskLog.title"]} | HLS</title>
      </Helmet>
      <PageHeader>{messages["page.TaskLog.title"]}</PageHeader>
      <LayoutContent>
        <TaskLogStyle>
          <Formik
            onSubmit={onFinish}
            initialValues={initialValues}
            enableReinitialize={true}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form colon={false} className="mb-5 hls-form" labelAlign="left">
                  <Row justify="start">
                    <Col xs={24} lg={{ span: 17, offset: 1 }}>
                      <Row>
                        <Col {...colLeft}>
                          <Form.Item
                            {...itemLeftLabel}
                            label={messages["page.taskLog.date"]}
                            name="startDate"
                          >
                            <DatePicker
                              name="startDate"
                              placeholder="YYYY/MM/DD"
                              value={
                                values.startDate &&
                                moment(values.startDate, DATE_FORMAT)
                              }
                              format={DATE_FORMAT}
                              onChange={handleDateFieldChange(
                                setFieldValue,
                                "startDate"
                              )}
                              disabledDate={(current) => {
                                const maxDate = !isEmpty(values.endDate)
                                  ? moment(values.endDate, DATE_FORMAT).endOf("day")
                                  : null;
                                return current && maxDate && current > maxDate;
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col {...colRight}>
                          <Form.Item
                            {...itemRightLabel}
                            label={messages["page.taskLog.date"]}
                            name="endDate"
                          >
                            <DatePicker
                              name="endDate"
                              placeholder="YYYY/MM/DD"
                              value={
                                values.endDate && moment(values.endDate, DATE_FORMAT)
                              }
                              format={DATE_FORMAT}
                              onChange={handleDateFieldChange(
                                setFieldValue,
                                "endDate"
                              )}
                              disabledDate={(current) => {
                                const minDate = !isEmpty(values.startDate)
                                  ? moment(values.startDate, DATE_FORMAT).startOf(
                                      "day"
                                    )
                                  : null;
                                return current && minDate && current < minDate;
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col {...colCenter}>
                          <Space
                            direction="vertical"
                            className="space-btn"
                            align="end"
                            size={24}
                          >
                            <Button
                              className="button"
                              type="primary"
                              block
                              onClick={() => getTaskDate(KEYS.TODAY, dashboardRoute)}
                            >
                              {messages["page.taskLog.today"]}
                            </Button>
                          </Space>
                        </Col>
                        <Col {...colFull}>
                          <Form.Item
                            {...itemFullLabel}
                            label={messages["page.taskLog.user"]}
                            name="username"
                          >
                            <Input
                              name="username"
                              placeholder={messages["page.Account.username"]}
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
                          className="button"
                          type="primary"
                          block
                          onClick={() => getTaskDate(KEYS.YESTERDAY, dashboardRoute)}
                        >
                          {messages["page.taskLog.yesterday"]}
                        </Button>
                        <Button
                          className="button"
                          type={"primary"}
                          htmlType="submit"
                          block
                        >
                          {messages["page.taskLog.url"]}
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
          <Row justify="center">
            <Col xs={24} md={24} xl={22}>
              <Table
                bordered
                loading={loading}
                rowKey={(record, idx) => idx}
                columns={tableColumnData(
                  messages,
                  search ? location : { startDate: todayDate },
                  dashboardRoute
                )}
                dataSource={taskLogs}
                scroll={{ x: "max-content" }}
                pagination={false}
              />
            </Col>
          </Row>
        </TaskLogStyle>
      </LayoutContent>
    </LayoutWrapper>
  );
};

export const colLeft = {
  xs: { span: 24, offset: 0 },
  lg: { span: 8, offset: 0 },
};

export const colRight = {
  xs: { span: 24, offset: 0 },
  lg: { span: 8, offset: 0 },
};

export const colCenter = {
  xs: { span: 24, offset: 0 },
  lg: { span: 8, offset: 0 },
};

export const colFull = {
  xs: { span: 24, offset: 0 },
  lg: { span: 24, offset: 0 },
};

export const itemFullLabel = {
  labelCol: { lg: 2, xs: 24 },
  wrapperCol: { lg: 22, xs: 24 },
};

export const itemLeftLabel = {
  labelCol: { lg: 6, xs: 24 },
  wrapperCol: { lg: 12, xs: 24 },
};

export const itemRightLabel = {
  labelCol: { lg: { span: 8, offset: 4 }, xs: 24 },
  wrapperCol: { lg: 12, xs: 24 },
};

const initialValueDefault = {
  username: "",
  startDate: "",
  endDate: "",
};

export default TaskLog;
