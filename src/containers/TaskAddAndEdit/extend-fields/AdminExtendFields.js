import React, { memo } from "react";
import PropTypes from "prop-types";
import { Col, Button, DatePicker, Checkbox } from "antd";
import { Form, Select, Input } from "formik-antd";
import { useIntl } from "react-intl";
import {
  SELECT_TASK_PRIORITY_LIST,
  SELECT_TASK_STATUS_LIST,
  TASK_STOP_WATCH,
} from "@iso/constants/select.constant";

import { DATE_FORMAT } from "@iso/constants/common.constant";
import {
  itemLeftLabel,
  itemRightLabel,
  colRight,
  colLeft,
  colSingleLeft,
} from "@iso/assets/styles/form.style";
import moment from "moment";
import TaskStopWatch from "@iso/components/TaskAddEditComponent/task-stop-watch/TaskStopWatch";

const AdminExtendFields = ({
  taskId,
  task,
  editing,
  values,
  setFieldValue,
  userAssigneeList,
  handleDateFieldChange,
  handleFieldChange,
  showStoreSelectPopup,
  executeStopWatch,
  stopWatchInfo,
  isUser,
  sumConfirmTime,
  sumExecuteTime,
  previewMode,
  isChildTask,
}) => {
  const { messages } = useIntl();

  return (
    <>
      {!isUser && (
        <>
          <Col {...colLeft}>
            <Form.Item
              labelCol={{ lg: 8, xs: 24 }}
              wrapperCol={{ lg: 15, xs: 24 }}
              label={messages["page.taskAddEdit.store"]}
              name="storeIds"
              required={values.visible}
            >
              <Button
                type="primary"
                name="storeIds"
                className="btnSelectStore"
                disabled={!editing || previewMode || isChildTask || !values.visible}
                onClick={showStoreSelectPopup}
              >
                {messages["page.taskAddEdit.btnSelectStore"]}
              </Button>
              <Checkbox
                name="visible"
                checked={values.visible}
                disabled={!editing || previewMode || isChildTask}
                onChange={(event) =>
                  handleFieldChange(setFieldValue, "visible")(event.target.checked)
                }
              >
                {messages["page.taskAddEdit.childTask"]}
              </Checkbox>
            </Form.Item>
          </Col>
          <Col {...colRight}>
            <Form.Item
              {...itemRightLabel}
              label={messages["page.taskAddEdit.status"]}
              name="status"
            >
              <Select name="status" disabled={!editing || previewMode}>
                {SELECT_TASK_STATUS_LIST.OPTIONS.map((select, index) => (
                  <Select.Option key={index} value={select}>
                    {select}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col {...colLeft}>
            <Form.Item
              {...itemLeftLabel}
              label={messages["page.taskAddEdit.priority"]}
              name="priority"
            >
              <Select name="priority" disabled={!editing || previewMode}>
                {SELECT_TASK_PRIORITY_LIST.OPTIONS.map((select, index) => (
                  <Select.Option key={index} value={select}>
                    {select}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col {...colRight}>
            <Form.Item
              {...itemRightLabel}
              label={messages["page.taskAddEdit.assignee"]}
              name="assigneeId"
            >
              <Select name="assigneeId" disabled={!editing || previewMode}>
                <Select.Option value={""} />
                {userAssigneeList.map((select, index) => (
                  <Select.Option key={index} value={select.accountId}>
                    {select.displayName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col {...colLeft}>
            <Form.Item
              {...itemLeftLabel}
              label={messages["page.taskAddEdit.startDate"]}
              name="startDate"
            >
              <DatePicker
                name="startDate"
                placeholder="yyyy/dd/mm"
                value={values.startDate && moment(values.startDate, DATE_FORMAT)}
                format={DATE_FORMAT}
                onChange={handleDateFieldChange(setFieldValue, "startDate")}
                disabled={!editing || previewMode}
              />
            </Form.Item>
          </Col>
          <Col {...colRight}>
            <Form.Item
              {...itemRightLabel}
              label={messages["page.taskAddEdit.deadline"]}
              name="dueDate"
            >
              <DatePicker
                name="dueDate"
                placeholder="yyyy/dd/mm"
                value={values.dueDate && moment(values.dueDate, DATE_FORMAT)}
                format={DATE_FORMAT}
                onChange={handleDateFieldChange(setFieldValue, "dueDate")}
                disabled={!editing || previewMode}
              />
            </Form.Item>
          </Col>

          <Col {...colLeft}>
            <Form.Item
              {...itemLeftLabel}
              label={messages["page.taskAddEdit.estimateTime"]}
              name="estTime"
            >
              <Input name="estTime" disabled={!editing || previewMode} />
            </Form.Item>
          </Col>
          <Col {...colRight}>
            <Form.Item
              {...itemRightLabel}
              label={messages["page.taskAddEdit.estimatePoint"]}
              name="estPoint"
            >
              <Input name="estPoint" disabled={!editing || previewMode} />
            </Form.Item>
          </Col>
        </>
      )}

      {taskId && !editing && !previewMode && (
        <>
          <Col {...colSingleLeft}>
            <TaskStopWatch
              label={messages["page.taskAddEdit.timeAction"]}
              executeStopWatch={executeStopWatch}
              watchType={TASK_STOP_WATCH.TYPES.EXECUTE}
              active={
                !stopWatchInfo.type ||
                stopWatchInfo.action === TASK_STOP_WATCH.ACTIONS.STOP ||
                stopWatchInfo.type === TASK_STOP_WATCH.TYPES.EXECUTE
              }
              total={sumExecuteTime}
              type={stopWatchInfo.type}
              action={stopWatchInfo.action}
              loading={stopWatchInfo.loading}
              showButton={task && !!task.storeId}
            />
          </Col>
          <Col {...colSingleLeft}>
            <TaskStopWatch
              label={messages["page.taskAddEdit.timeConfirm"]}
              executeStopWatch={executeStopWatch}
              watchType={TASK_STOP_WATCH.TYPES.CONFIRM}
              active={
                !stopWatchInfo.type ||
                stopWatchInfo.action === TASK_STOP_WATCH.ACTIONS.STOP ||
                stopWatchInfo.type === TASK_STOP_WATCH.TYPES.CONFIRM
              }
              total={sumConfirmTime}
              type={stopWatchInfo.type}
              action={stopWatchInfo.action}
              loading={stopWatchInfo.loading}
              showButton={task && !!task.storeId}
            />
          </Col>
        </>
      )}
    </>
  );
};

AdminExtendFields.propTypes = {
  taskId: PropTypes.string,
  editing: PropTypes.bool,
  isUser: PropTypes.bool,
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  userAssigneeList: PropTypes.array,
  handleDateFieldChange: PropTypes.func,
  handleFieldChange: PropTypes.func,
  showStoreSelectPopup: PropTypes.func,
  executeStopWatch: PropTypes.func,
  stopWatchInfo: PropTypes.object,
  errors: PropTypes.object,
  task: PropTypes.object,
  sumConfirmTime: PropTypes.number,
  sumExecuteTime: PropTypes.number,
  previewMode: PropTypes.bool,
  isChildTask: PropTypes.bool,
};

export default memo(AdminExtendFields);
