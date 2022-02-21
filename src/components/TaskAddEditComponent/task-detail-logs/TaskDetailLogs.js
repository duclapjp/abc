import React, { useEffect, useState, useCallback } from "react";
import { useIntl } from "react-intl";
import { Row, Col, Tabs, Table, Button, Modal, message } from "antd";
import { Formik } from "formik";
import { Form, DatePicker, TimePicker, SubmitButton } from "formik-antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";
import * as Yup from "yup";

import {
  TIME_JAPAN_FORMAT,
  TIMEZONE_JAPAN,
  DATE_TIME_FORMAT,
  TIME_FORMAT,
  DATE_FORMAT,
} from "@iso/constants/common.constant";
import { TASK_DETAIL_LOG_TABLE_TYPE } from "@iso/constants/select.constant";
import taskActions from "@iso/redux/taskAddEdit/actions";
import paginationConfig from "@iso/config/pagination.config";

import { TaskDetailLogsWrapper } from "./TaskDetailLogs.style";

export const layoutConfig = {
  row: { xs: 24 },
  labelCol: { lg: 4, xs: 24 },
  wrapperCol: { lg: 20, xs: 24 },
};

const TaskDetailLogs = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [dateEdit, setDateEdit] = useState("");
  const [timeEdit, setTimeEdit] = useState("");
  const [taskLogIdEdit, setTaskLogIdEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState({
    [TASK_DETAIL_LOG_TABLE_TYPE.SUMMARY]: 1,
    [TASK_DETAIL_LOG_TABLE_TYPE.DETAIL]: 1,
  });
  const dispatch = useDispatch();
  const { messages } = useIntl();
  const { taskId } = useParams();
  const {
    taskLogs,
    taskLogsTotal,
    loadingTaskLog,
    summaries,
    summariesTotal,
    loadingSummaries,
  } = useSelector((state) => state.TaskAddEdit);

  useEffect(() => {
    dispatch(
      taskActions.getSummaries({ taskId, size: paginationConfig.pageSize, page: 1 })
    );
  }, [dispatch, taskId]);

  const handleChangePage = useCallback(
    (pagination, key) => {
      setCurrentPage((prevState) => ({
        ...prevState,
        [key]: pagination.current,
      }));
      key === TASK_DETAIL_LOG_TABLE_TYPE.SUMMARY
        ? dispatch(
            taskActions.getSummaries({
              taskId,
              size: paginationConfig.pageSize,
              page: pagination.current,
            })
          )
        : dispatch(
            taskActions.getTaskLogs({
              taskId,
              size: paginationConfig.pageSize,
              page: pagination.current,
            })
          );
    },
    [dispatch, taskId]
  );

  const handleChangeTabs = useCallback(
    (activeKey) => {
      setCurrentPage((prevState) => ({
        ...prevState,
        [activeKey]: 1,
      }));
      activeKey === TASK_DETAIL_LOG_TABLE_TYPE.SUMMARY
        ? dispatch(
            taskActions.getSummaries({
              taskId,
              size: paginationConfig.pageSize,
              page: 1,
            })
          )
        : dispatch(
            taskActions.getTaskLogs({
              taskId,
              size: paginationConfig.pageSize,
              page: 1,
            })
          );
    },
    [dispatch, taskId]
  );

  const handleSave = ({ date, time }, { setSubmitting }) => {
    const datetime = `${date} ${moment(time).format("HH:mm:ss")}`;
    new Promise((resolve, reject) => {
      dispatch(
        taskActions.editTaskLog({
          resolve,
          reject,
          taskLogId: taskLogIdEdit,
          taskId,
          datetime,
        })
      );
    })
      .then(() => {
        setShowEdit(false);
        message.success(messages["page.taskList.taskLog.editSuccess"]);
        dispatch(taskActions.getTaskLogs({ taskId }));
      })
      .catch(() => {
        message.error(messages["page.taskList.taskLog.editError"]);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <TaskDetailLogsWrapper>
      <Row {...layoutConfig.row}>
        <Col {...layoutConfig.labelCol}>
          <span>{messages["page.taskAddEdit.taskDetailLogs"]}</span>
        </Col>
        <Col {...layoutConfig.wrapperCol}>
          <Tabs
            defaultActiveKey={TASK_DETAIL_LOG_TABLE_TYPE.SUMMARY}
            onChange={handleChangeTabs}
          >
            {tabs.map((tab) => (
              <Tabs.TabPane
                tab={messages[`page.taskList.taskLog.${tab.key}`]}
                key={tab.key}
              >
                <Table
                  bordered
                  loading={
                    tab.key === TASK_DETAIL_LOG_TABLE_TYPE.SUMMARY
                      ? loadingSummaries
                      : loadingTaskLog
                  }
                  rowKey={(record, idx) => idx}
                  scroll={{ x: "max-content" }}
                  pagination={{
                    ...paginationConfig,
                    current: currentPage[tab.key],
                    responsive: true,
                    pageSize: paginationConfig.pageSize,
                    total:
                      tab.key === TASK_DETAIL_LOG_TABLE_TYPE.SUMMARY
                        ? summariesTotal
                        : taskLogsTotal,
                  }}
                  onChange={(pagination) => handleChangePage(pagination, tab.key)}
                  columns={generateColumns(
                    messages,
                    tab.key,
                    setShowEdit,
                    setTimeEdit,
                    setDateEdit,
                    setTaskLogIdEdit
                  )}
                  dataSource={
                    tab.key === TASK_DETAIL_LOG_TABLE_TYPE.SUMMARY
                      ? summaries
                      : taskLogs
                  }
                />
              </Tabs.TabPane>
            ))}
          </Tabs>
        </Col>
      </Row>
      <Modal
        visible={showEdit}
        closable={false}
        title="作業時間の編集画面"
        onCancel={() => setShowEdit(false)}
        footer={null}
        width={400}
      >
        {showEdit && (
          <Formik
            initialValues={initialValues(dateEdit, timeEdit)}
            onSubmit={handleSave}
            validationSchema={validationSchema}
          >
            {({ setFieldValue, dirty }) => (
              <Form colon={false}>
                <Form.Item name="date" label="日付">
                  <DatePicker
                    name="date"
                    format={DATE_FORMAT}
                    onChange={(date, dateString) => {
                      setFieldValue("date", dateString);
                    }}
                  />
                </Form.Item>
                <Form.Item name="time" label="時間">
                  <TimePicker name="time" />
                </Form.Item>
                <div style={{ textAlign: "right" }}>
                  <Button
                    style={{ marginRight: 10 }}
                    onClick={() => setShowEdit(false)}
                  >
                    {messages["page.Account.buttonCancel"]}
                  </Button>
                  <SubmitButton type="primary" disabled={!dirty}>
                    {messages["page.Account.buttonSave"]}
                  </SubmitButton>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Modal>
    </TaskDetailLogsWrapper>
  );
};

const generateColumns = (
  messages,
  type,
  setShowEdit,
  setTimeEdit,
  setDateEdit,
  setTaskLogIdEdit
) => {
  return [
    ...(type === TASK_DETAIL_LOG_TABLE_TYPE.DETAIL
      ? [
          {
            title: messages["page.passwordHistory.updateTime"],
            dataIndex: "taskLogDate",
            key: "taskLogDate",
            align: "center",
            render: (milliseconds) => parseDate(milliseconds),
          },
        ]
      : []),
    {
      title: messages["page.taskList.taskLog.user"],
      dataIndex: "displayName",
      key: "displayName",
      align: "center",
      render: (text) => text || "-",
    },
    ...(type === TASK_DETAIL_LOG_TABLE_TYPE.DETAIL
      ? [
          {
            title: messages["page.taskList.taskLog.action"],
            dataIndex: "action",
            key: "action",
            align: "center",
            render: (action) => messages[`page.taskList.taskLog.${action}`] || "-",
          },
          {
            title: messages["page.taskList.taskLog.executeTime"],
            dataIndex: "executeTime",
            key: "executeTime",
            align: "center",
            render: (minutes) => (minutes ? parseHour(minutes) : "-"),
          },
          {
            title: messages["page.taskList.taskLog.confirmTime"],
            dataIndex: "confirmTime",
            key: "confirmTime",
            align: "center",
            render: (minutes) => (minutes ? parseHour(minutes) : "-"),
          },
          {
            title: messages["page.taskList.taskLog.accumulation"],
            dataIndex: "accumulationTime",
            key: "accumulationTime",
            align: "center",
            render: (minutes) => <span>{minutes ? parseHour(minutes) : "-"}</span>,
          },
          {
            title: messages["page.taskList.taskLog.operation"],
            dataIndex: "action",
            key: "action",
            align: "center",
            render: (action, { taskLogDate, taskLogId }) => {
              const onClick = () => {
                const [date, time] = moment(taskLogDate)
                  .tz(TIMEZONE_JAPAN)
                  .format(DATE_TIME_FORMAT)
                  .split(" ");
                setDateEdit(date);
                setTimeEdit(time);
                setTaskLogIdEdit(taskLogId);
                setShowEdit(true);
              };
              return action === "STOP" ? (
                <Button type="primary" onClick={onClick}>
                  {messages["page.chains.edit"]}
                </Button>
              ) : (
                "-"
              );
            },
          },
        ]
      : []),
    ...(type === TASK_DETAIL_LOG_TABLE_TYPE.SUMMARY
      ? [
          {
            title: messages["page.taskList.taskLog.accumulation"],
            dataIndex: "summaryTime",
            key: "summaryTime",
            align: "center",
            render: (minutes) => <span>{minutes ? parseHour(minutes) : "-"}</span>,
          },
        ]
      : []),
  ];
};

const parseDate = (ms) => moment(ms).tz(TIMEZONE_JAPAN).format(TIME_JAPAN_FORMAT);

const parseHour = (milliseconds) => {
  const sec = moment.duration(milliseconds, "milliseconds").seconds();
  const min = moment.duration(milliseconds, "milliseconds").minutes();
  const hrs = Math.trunc(moment.duration(milliseconds, "milliseconds").asHours());
  return `${hrs}:${min}:${sec}`;
};

const tabs = [
  {
    key: "summary",
  },
  {
    key: "detail",
  },
];

const initialValues = (dateEdit, timeEdit) => ({
  date: dateEdit,
  time: moment(timeEdit, TIME_FORMAT),
});

const validationSchema = Yup.object().shape({
  date: Yup.string().required().nullable(),
  time: Yup.string().required().nullable(),
});

export default TaskDetailLogs;
