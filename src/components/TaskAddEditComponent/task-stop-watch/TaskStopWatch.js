import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Col, Row, Button } from "antd";
import { TaskStopWatchWrapper } from "./TaskStopWatch.style";
import { TASK_STOP_WATCH } from "@iso/constants/select.constant";
import { useIntl } from "react-intl";

export const layoutConfig = {
  row: { lg: 12, xs: 24 },
  labelCol: { lg: 4, xs: 24 },
  titleCol: { lg: 4, xs: 12 },
  wrapperCol: { lg: 4, xs: 12 },
};

const TaskStopWatch = ({
  label,
  executeStopWatch,
  watchType,
  active,
  total,
  action,
  loading,
  showButton,
}) => {
  const { messages } = useIntl();
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    setActionLoading(loading);
  }, [loading]);

  const handleAction = useCallback(
    (newAction) => {
      setActionLoading(true);
      executeStopWatch({ type: watchType, action: newAction });
    },
    [executeStopWatch, watchType]
  );

  const startDisabled = !active || action === TASK_STOP_WATCH.ACTIONS.START;
  const stopDisabled = !active || !action || action === TASK_STOP_WATCH.ACTIONS.STOP;

  return (
    <TaskStopWatchWrapper>
      <Row {...layoutConfig.row}>
        <Col {...layoutConfig.labelCol}>
          <span>{label}</span>
        </Col>
        <Col {...layoutConfig.titleCol}>
          <span>{total ? Math.round(total / (1000 * 60)) : 0}</span>
        </Col>
        {showButton && (
          <Col {...layoutConfig.wrapperCol}>
            <Button
              type="primary"
              disabled={startDisabled}
              onClick={() => handleAction(TASK_STOP_WATCH.ACTIONS.START)}
              loading={actionLoading && !startDisabled}
            >
              {messages["page.taskAddEdit.stopWatch.startBtn"]}
            </Button>
            <Button
              type="danger"
              disabled={stopDisabled}
              onClick={() => handleAction(TASK_STOP_WATCH.ACTIONS.STOP)}
              loading={actionLoading && !stopDisabled}
            >
              {messages["page.taskAddEdit.stopWatch.stopBtn"]}
            </Button>
          </Col>
        )}
      </Row>
    </TaskStopWatchWrapper>
  );
};

TaskStopWatch.propTypes = {
  label: PropTypes.string,
  watchType: PropTypes.string,
  executeStopWatch: PropTypes.func,
  active: PropTypes.bool,
  total: PropTypes.number,
  startTime: PropTypes.number,
  action: PropTypes.string,
  loading: PropTypes.bool,
  showButton: PropTypes.bool,
};

export default TaskStopWatch;
