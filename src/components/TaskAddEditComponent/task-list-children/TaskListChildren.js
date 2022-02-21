import React, { useEffect, useState, useCallback } from "react";
import { Col, Row, Table } from "antd";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import paginationConfig from "@iso/config/pagination.config";
import { layoutConfig } from "@iso/components/TaskAddEditComponent/task-detail-logs/TaskDetailLogs";
import { tableColumnData } from "@iso/containers/Tasks/tableColumnData";
import { ROLES } from "@iso/constants/common.constant";
import taskActions from "@iso/redux/taskAddEdit/actions";
import { TaskListChildrenStyles } from "./TaskListChildren.style";

const TaskListChildren = ({ taskId }) => {
  const [currentPage, setCurrentPage] = useState(paginationConfig.current);
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const { taskChildren, taskChildrenTotal, loadingTaskChildren } = useSelector(
    (state) => state.TaskAddEdit
  );
  const {
    Auth: { dashboardRoute },
  } = useSelector((state) => state);
  useEffect(() => {
    dispatch(taskActions.getTaskChildren({ taskId }));
  }, [dispatch, taskId]);
  const handleChangePage = useCallback(
    (pagination) => {
      setCurrentPage(pagination.current);
      dispatch(taskActions.getTaskChildren({ taskId, page: currentPage }));
    },
    [dispatch, taskId, currentPage]
  );
  return (
    <TaskListChildrenStyles>
      <Row {...layoutConfig.row}>
        <Col span={24} style={{ marginBottom: 24 }}>
          <span>{messages["page.taskList.taskChildren"]}</span>
        </Col>
        <Col span={24}>
          <Table
            bordered
            loading={loadingTaskChildren}
            rowKey={(record, idx) => idx}
            columns={tableColumnData({
              messages,
              role: ROLES.ADMIN,
              dashboardRoute,
            })}
            scroll={{ x: "max-content" }}
            dataSource={taskChildren}
            onChange={handleChangePage}
            pagination={{
              ...paginationConfig,
              total: taskChildrenTotal,
              current: currentPage,
              responsive: true,
            }}
          />
        </Col>
      </Row>
    </TaskListChildrenStyles>
  );
};

TaskListChildren.propTypes = {
  taskId: PropTypes.string,
};

export default TaskListChildren;
