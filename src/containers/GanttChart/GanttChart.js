import React, { useState, useEffect, useCallback } from "react";
import {
  Row,
  Col,
  Tag,
  DatePicker,
  Button,
  Divider,
  Select,
  message,
  Table,
} from "antd";
import { useIntl } from "react-intl";
// import { filter } from "lodash";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import LayoutGanttChartContentStyle from "./GanttChart.styles";
import PageHeader from "@iso/components/utility/pageHeader";
import Gantt from "./Gantt/Gantt";
import {
  TASK_STATUS_MAPPING_COLOR,
  SELECT_TASK_STATUS_LIST,
} from "@iso/constants/select.constant";
import { DATE_FORMAT, ROLES } from "@iso/constants/common.constant";
import { useDispatch, useSelector } from "react-redux";
import ganttChartActions from "@iso/redux/ganttChart/actions";
import moment from "moment-timezone";
import { tableColumnData } from "@iso/containers/GanttChart/Gantt/tableColumnData";
// import paginationConfig from "@iso/config/pagination.config";
import taskActions from "@iso/redux/task/actions";
import { Helmet } from "react-helmet";

const GanttChart = () => {
  const { messages } = useIntl();
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(moment());
  const [selectStartDate, setSelectStartDate] = useState(moment());
  const [status, setStatus] = useState(SELECT_TASK_STATUS_LIST.NOT_CLOSED);
  const [assignId, setAssignId] = useState(SELECT_TASK_STATUS_LIST.NOT_CLOSED);
  const { tasks, assignees } = useSelector((state) => state.GanttChart);

  // const [currentPage, setCurrentPage] = useState(paginationConfig.current);
  const [expandedRowsChange, setExpandedRowsChange] = useState([]);

  const {
    Task: {
      loading,
      // total,
      tasks: newTask,
    },
    Auth: {
      user: { role, chainId },
      dashboardRoute,
    },
  } = useSelector((state) => state);

  const isChain = role === ROLES.CHAIN;

  useEffect(() => {
    dispatch(
      taskActions.getTasks({
        // size: paginationConfig.pageSize,
        // page: paginationConfig.current,
        status: SELECT_TASK_STATUS_LIST.NOT_CLOSED,
        getTaskGrantChart: true,
      })
    );
    dispatch(
      taskActions.getTasksMetaData({
        chainId: isChain ? chainId : "",
      })
    );
  }, [dispatch, chainId, isChain]);

  const onExpandTable = (expanded, { taskId }) => {
    if (expanded) {
      dispatch(taskActions.getChildTasks({ taskId }));
    }
  };

  const onExpandedRowsChange = (expandedRows) => {
    setExpandedRowsChange(expandedRows);
  };

  // const handleChangePage = (pagination) => {
  //   setExpandedRowsChange([]);
  //   setCurrentPage(pagination.current);
  //   dispatch(
  //     taskActions.getTasks({
  //       ...initialValues,
  //       size: pagination.pageSize,
  //       page: pagination.current,
  //     })
  //   );
  // };

  const fetchData = useCallback(
    (data) => {
      new Promise((resolve, reject) => {
        dispatch(ganttChartActions.getGanttChartData({ resolve, reject, data }));
      }).catch(() => {
        message.error(messages["page.ganttChart.fetchError"]);
      });
    },
    [dispatch, messages]
  );

  useEffect(() => {
    fetchData({
      status,
      startDate: startDate
        ? startDate.format(DATE_FORMAT)
        : moment().format(DATE_FORMAT),
      assigneeId: parseInt(assignId),
    });
  }, [fetchData, status, startDate, assignId]);

  useEffect(() => {
    dispatch(ganttChartActions.getAssignees());
  }, [dispatch]);

  return (
    <LayoutWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{messages["sidebar.ganttChart"]} | HLS</title>
      </Helmet>
      <PageHeader>{messages["sidebar.ganttChart"]}</PageHeader>
      <LayoutGanttChartContentStyle>
        <Row>
          <Col lg={14}>
            <Row className="filter-content" span={12}>
              <Col className="filter-label">
                {messages["page.ganttChart.startDate"]}
              </Col>
              <Col>
                <DatePicker
                  placeholder="yyyy/dd/mm"
                  value={selectStartDate}
                  format={DATE_FORMAT}
                  onChange={setSelectStartDate}
                  allowClear={false}
                />
              </Col>
              <Button onClick={() => setStartDate(selectStartDate)}>
                {messages["page.ganttChart.change"]}
              </Button>
              <Divider type="vertical" dashed />
              <Button
                onClick={() => {
                  setStartDate(moment());
                  setSelectStartDate(moment());
                }}
              >
                {messages["page.ganttChart.today"]}
              </Button>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col {...colFilterSelect}>
            <Row className="filter-content">
              <Col className="filter-label">{`${messages["page.tasks.assignee"]}`}</Col>
              <Col>
                <Select
                  onChange={setAssignId}
                  value={assignId}
                  dropdownMatchSelectWidth={true}
                >
                  <Select.Option value={SELECT_TASK_STATUS_LIST.NOT_CLOSED}>
                    {SELECT_TASK_STATUS_LIST.NOT_ASIGNEE_DROPDOWN}
                  </Select.Option>
                  {assignees.map((select) => (
                    <Select.Option key={select.accountId} value={select.accountId}>
                      {select.displayName}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>
          <Col {...colFilterSelect}>
            <Row className="filter-content">
              <Col className="filter-label">{`${messages["page.ganttChart.status"]}`}</Col>
              <Col>
                <Select
                  onChange={setStatus}
                  value={status}
                  listHeight={320}
                  dropdownMatchSelectWidth={true}
                >
                  <Select.Option value={SELECT_TASK_STATUS_LIST.NOT_CLOSED}>
                    {SELECT_TASK_STATUS_LIST.NOT_CLOSED}
                  </Select.Option>
                  {SELECT_TASK_STATUS_LIST.OPTIONS_GANTT_CHART.map((option) => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="tag-task-status">
            {SELECT_TASK_STATUS_LIST.OPTIONS.map((item) => (
              <Tag key={item} color={TASK_STATUS_MAPPING_COLOR[item]}>
                {item}
              </Tag>
            ))}
          </Col>
        </Row>
        <Row>
          <Gantt tasks={tasks} startDate={startDate} />
        </Row>
        <Row justify="center" style={{ marginTop: "25px" }}>
          <Col md={24}>
            <Table
              title={() => <h4>{messages["sidebar.tasks"]}</h4>}
              bordered
              rowKey="taskId"
              loading={loading}
              dataSource={newTask}
              columns={tableColumnData({ messages, role, dashboardRoute })}
              // pagination={{
              //   ...paginationConfig,
              //   current: currentPage,
              //   responsive: true,
              //   total,
              // }}
              expandable={{
                indentSize: 30,
                onExpand: onExpandTable,
                onExpandedRowsChange: onExpandedRowsChange,
                expandedRowKeys: expandedRowsChange,
              }}
              // onChange={handleChangePage}
              scroll={{ x: "max-content" }}
            />
          </Col>
        </Row>
      </LayoutGanttChartContentStyle>
    </LayoutWrapper>
  );
};

// const initialValues = {
//   searchKeyword: null,
//   storeId: null,
//   status: SELECT_TASK_STATUS_LIST.NOT_CLOSED,
//   priority: null,
//   directorId: null,
//   assigneeId: null,
//   registerPersonId: null,
// };

const colFilterSelect = {
  xl: 5,
  md: 10,
  xs: 24,
};

export default GanttChart;
