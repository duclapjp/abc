import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Linkify from "react-linkify";
import { useIntl } from "react-intl";
import { Row, Col, Comment, Button, Spin, Empty, message, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Formik } from "formik";
import { omit } from "lodash";
import { Form, Input, Select, Radio } from "formik-antd";
import { Element, scroller } from "react-scroll";
import validationSchema from "./validation.schema";
import { TaskDetailCommentsWrapper } from "./TaskDetailComments.style";
import taskActions from "@iso/redux/taskAddEdit/actions";
import AdminCommentFields from "./AdminCommentFields";
import { DATE_FORMAT, ROLES } from "@iso/constants/common.constant";
import { TASK_DETAIL_COMMENT_TYPE } from "@iso/constants/select.constant";

export const layoutConfig = {
  row: { xs: 24 },
  labelCol: { lg: 4, xs: 24 },
  wrapperCol: { lg: 20, xs: 24 },
};

const TaskDetailComments = ({ role, task, editing, handleCommentTypeChange }) => {
  const isAURole = [ROLES.ADMIN, ROLES.USER, ROLES.SUBADMIN].includes(role);
  const isURole = role === ROLES.USER;
  const isCSRole = role === ROLES.CHAIN || role === ROLES.STORE;
  const { messages } = useIntl();
  const [filter, setFilter] = useState(initialFilter(isAURole));
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    userNotifyList,
    loadingUserNotifyList,
    comments,
    totalComment,
    userAssigneeList,
  } = useSelector((state) => state.TaskAddEdit);

  const loadComments = useCallback(
    (data) => {
      return new Promise((resolve, reject) =>
        dispatch(taskActions.getComments({ ...data, resolve, reject }))
      );
    },
    [dispatch]
  );

  useEffect(() => {
    const id = task.taskId;
    if (id) {
      dispatch(
        taskActions.getCommentUserNotifyRequest({
          id,
          type: filter.type === "STORE" ? 2 : 1,
        })
      );
    }
  }, [dispatch, task.taskId, filter.type]);

  // useEffect(() => {
  //   if (editing) {
  //     const initialFilterValue = initialFilter(isAURole);
  //     setFilter(initialFilterValue);
  //     handleCommentTypeChange(initialFilterValue.type);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (!task.taskId) {
      return;
    }
    setLoading(true);
    loadComments({ taskId: task.taskId, ...filter })
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [filter, loadComments, task.taskId]);

  const handleDateFieldChange = useCallback(
    (setFieldValue, name) => (value) => {
      const formatValue = value ? moment(value).format(DATE_FORMAT) : null;
      setFieldValue(name, formatValue);
    },
    []
  );

  const handleChangeType = useCallback(
    (e, setFieldValue) => {
      const newFilterType = e.target.value;
      setFieldValue("notifyToAccIds", []);
      setFilter((filter) => ({ ...filter, type: newFilterType }));
      if (handleCommentTypeChange) {
        handleCommentTypeChange(newFilterType);
      }
    },
    [setFilter, handleCommentTypeChange]
  );

  const handleChangeSize = useCallback(() => {
    setFilter((filter) => {
      const size = filter.size === 3 ? 0 : 3;
      return { ...filter, size };
    });
  }, []);

  const handleSubmit = useCallback(
    (data, form) => {
      new Promise((resolve, reject) =>
        dispatch(
          taskActions.createComment({
            data: { ...data, taskId: task.taskId, type: filter.type },
            resolve,
            reject,
          })
        )
      )
        .then(() => {
          form.resetForm();
          form.setSubmitting(false);
          message.success(messages["message.description.success"]);
          scroller.scrollTo("bottom-comment", {
            duration: 1500,
            delay: 100,
            smooth: true,
            containerId: "containerComment",
            offset: 50,
          });
        })
        .catch((error) => {
          form.setSubmitting(false);
          if (
            error &&
            error.response &&
            error.response.message === "ERROR-CREATECOMMENT-EMPTYCOMMENT-INVALID"
          ) {
            message.error(messages["message.description.error.empty"]);
          } else {
            message.error(messages["message.description.error"]);
          }
        });
    },
    [dispatch, messages, task.taskId, filter.type]
  );

  const renderFormForDetail = () => {
    return (
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema(messages)}
        enableReinitialize={true}
        initialValues={initialValuesDefault(task, isCSRole)}
        render={({ setFieldValue, isSubmitting, values, dirty }) => {
          return (
            <Form colon={false} labelAlign="left" className="hls-form">
              <Row {...layoutConfig.row}>
                <Col {...layoutConfig.labelCol} style={{ marginBottom: 24 }}>
                  <span>{messages["page.taskAddEdit.comments"]}</span>
                </Col>
                {!isCSRole && (
                  <Col {...layoutConfig.wrapperCol} style={{ marginBottom: 24 }}>
                    <Radio.Group
                      value={filter.type}
                      defaultValue={filter.type}
                      onChange={(e) => handleChangeType(e, setFieldValue)}
                      name="type"
                    >
                      <Radio.Button value={TASK_DETAIL_COMMENT_TYPE.USER}>
                        {messages["page.Account.user"]}
                      </Radio.Button>
                      <Radio.Button value={TASK_DETAIL_COMMENT_TYPE.STORE}>
                        {messages["page.Account.store"]}
                      </Radio.Button>
                    </Radio.Group>
                  </Col>
                )}
              </Row>
              <Row>
                <Col span={24} className="comments-content">
                  <Row
                    span={24}
                    justify="center"
                    align="middle"
                    className="comments-content-title"
                  >
                    <Col>
                      <span className="hidden-number" onClick={handleChangeSize}>
                        {filter.size === 3
                          ? totalComment +
                            messages["page.taskAddEdit.comments.title"]
                          : messages["page.taskAddEdit.comments.hideComment"]}
                      </span>
                    </Col>
                  </Row>
                  <Spin tip={messages["loading"]} spinning={loading}>
                    <Row
                      span={24}
                      className="comments-content-list element"
                      id="containerComment"
                    >
                      {!comments.length && (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          style={{ width: "100%" }}
                        />
                      )}
                      {comments.map((comment) => (
                        <Comment
                          style={{ width: "100%" }}
                          key={comment.commentId}
                          author={
                            <span className="comment-author">
                              <span>
                                {messages["page.taskAddEdit.comments.from"]}
                              </span>
                              {comment.creatorName}
                            </span>
                          }
                          content={
                            <Linkify
                              componentDecorator={(
                                decoratedHref,
                                decoratedText,
                                key
                              ) => (
                                <Tooltip
                                  title={"新しいタブでリンクを開く。"}
                                  key={key}
                                >
                                  <a target="blank" href={decoratedHref}>
                                    {decoratedText}
                                  </a>
                                </Tooltip>
                              )}
                            >
                              <p>{comment.commentText}</p>
                            </Linkify>
                          }
                          datetime={
                            <>
                              {moment(
                                comment.createdDate,
                                "YYYY/MM/DD HH:mm:ss"
                              ).format("LL HH:mm:ss")}
                              {comment.notifyTo && (
                                <span className="comment-to">
                                  <span>
                                    {messages["page.taskAddEdit.comments.to"]}
                                  </span>
                                  {comment.notifyTo}
                                </span>
                              )}
                            </>
                          }
                        />
                      ))}
                      <Element name="bottom-comment" />
                    </Row>
                  </Spin>
                  {isURole && filter.type === "STORE" ? null : (
                    <>
                      <Row span={24} className="comments-content-add">
                        <Col xs={24} lg={isAURole ? 12 : 24}>
                          <Row span={24} className="comments-content-input-notify">
                            <Col xs={24}>
                              <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="notifyToAccIds"
                                label={messages["page.taskEdit.notifyToAccIds"]}
                              >
                                <Select
                                  showSearch
                                  name="notifyToAccIds"
                                  mode="multiple"
                                  placeholder={
                                    messages["page.taskAddEdit.comments.addTitle"]
                                  }
                                  defaultValue={[]}
                                  optionLabelProp="label"
                                  style={{ width: "100%" }}
                                  loading={loadingUserNotifyList}
                                  filterOption={(input, option) =>
                                    option.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  {userNotifyList.map((select) => (
                                    <Select.Option
                                      key={select.accountId}
                                      value={select.accountId}
                                      label={select.displayName}
                                    >
                                      {select.displayName}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row span={24}>
                            <Col xs={24} className="comments-content-textarea">
                              <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="commentText"
                                label={messages["page.taskEdit.commentText"]}
                              >
                                <Input.TextArea
                                  rows={6}
                                  name="commentText"
                                  placeholder={
                                    messages[
                                      "page.taskAddEdit.comments.commentTextarea"
                                    ]
                                  }
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                        {isAURole && (
                          <Col xs={24} lg={12}>
                            <AdminCommentFields
                              values={values}
                              setFieldValue={setFieldValue}
                              userAssigneeList={userAssigneeList}
                              handleDateFieldChange={handleDateFieldChange}
                            />
                          </Col>
                        )}
                      </Row>
                      <Row
                        span={24}
                        className="comments-content-button"
                        justify="center"
                      >
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={isSubmitting}
                          disabled={isSubmitting || !dirty}
                        >
                          {messages["page.taskAddEdit.comments.button"]}
                        </Button>
                      </Row>
                    </>
                  )}
                </Col>
              </Row>
            </Form>
          );
        }}
      />
    );
  };

  const renderFormItemForEdit = () => {
    return (
      <>
        <Row {...layoutConfig.row}>
          <Col {...layoutConfig.labelCol} style={{ marginBottom: 24 }}>
            <span>{messages["page.taskAddEdit.comments"]}</span>
          </Col>
          {!isCSRole && (
            <Col {...layoutConfig.wrapperCol} style={{ marginBottom: 24 }}>
              <Radio.Group
                value={filter.type}
                defaultValue={filter.type}
                onChange={handleChangeType}
                name="commentType"
              >
                <Radio.Button value="USER">
                  {messages["page.Account.user"]}
                </Radio.Button>
                <Radio.Button value="STORE">
                  {messages["page.Account.store"]}
                </Radio.Button>
              </Radio.Group>
            </Col>
          )}
        </Row>
        <Row>
          <Col span={24} className="comments-content">
            <Row
              span={24}
              justify="center"
              align="middle"
              className="comments-content-title"
            >
              <Col>
                <span className="hidden-number" onClick={handleChangeSize}>
                  {filter.size === 3
                    ? totalComment + messages["page.taskAddEdit.comments.title"]
                    : messages["page.taskAddEdit.comments.hideComment"]}
                </span>
              </Col>
            </Row>
            <Spin tip={messages["loading"]} spinning={loading}>
              <Row
                span={24}
                className="comments-content-list element"
                id="containerComment"
              >
                {!comments.length && (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    style={{ width: "100%" }}
                  />
                )}
                {comments.map((comment) => (
                  <Comment
                    style={{ width: "100%" }}
                    key={comment.commentId}
                    author={
                      <span className="comment-author">
                        <span>{messages["page.taskAddEdit.comments.from"]}</span>
                        {comment.creatorName}
                      </span>
                    }
                    content={
                      <Linkify
                        componentDecorator={(decoratedHref, decoratedText, key) => (
                          <Tooltip title={"新しいタブでリンクを開く。"} key={key}>
                            <a target="blank" href={decoratedHref}>
                              {decoratedText}
                            </a>
                          </Tooltip>
                        )}
                      >
                        <p>{comment.commentText}</p>
                      </Linkify>
                    }
                    datetime={
                      <>
                        {moment(comment.createdDate, "YYYY/MM/DD HH:mm:ss").format(
                          "LL HH:mm:ss"
                        )}
                        {comment.notifyTo && (
                          <span className="comment-to">
                            <span>{messages["page.taskAddEdit.comments.to"]}</span>
                            {comment.notifyTo}
                          </span>
                        )}
                      </>
                    }
                  />
                ))}
                <Element name="bottom-comment" />
              </Row>
            </Spin>
            <Row span={24} className="comments-content-add">
              <Col xs={24}>
                <Row span={24} className="comments-content-input-notify">
                  <Col xs={24}>
                    <Form.Item
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="notifyToAccIds"
                      label={messages["page.taskEdit.notifyToAccIds"]}
                    >
                      <Select
                        showSearch
                        name="notifyToAccIds"
                        mode="multiple"
                        placeholder={messages["page.taskAddEdit.comments.addTitle"]}
                        defaultValue={[]}
                        optionLabelProp="label"
                        style={{ width: "100%" }}
                        loading={loadingUserNotifyList}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {userNotifyList.map((select) => (
                          <Select.Option
                            key={select.accountId}
                            value={select.accountId}
                            label={select.displayName}
                          >
                            {select.displayName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row span={24}>
                  <Col xs={24} className="comments-content-textarea">
                    <Form.Item
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="commentText"
                      label={messages["page.taskEdit.commentText"]}
                    >
                      <Input.TextArea
                        rows={6}
                        name="commentText"
                        placeholder={
                          messages["page.taskAddEdit.comments.commentTextarea"]
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <TaskDetailCommentsWrapper>
      {!editing && renderFormForDetail()}
      {editing && renderFormItemForEdit()}
    </TaskDetailCommentsWrapper>
  );
};

const initialFilter = (isAuRole) => ({
  type: isAuRole ? TASK_DETAIL_COMMENT_TYPE.USER : TASK_DETAIL_COMMENT_TYPE.STORE,
  size: 3,
  sortBy: "comment_id",
  sortByType: 1,
});

const omitByCS = [
  "status",
  "assigneeId",
  "startDate",
  "dueDate",
  "estTime",
  "estPoint",
];

const initialValuesDefault = (task, isCSRole) => {
  let value = {
    status: task.status,
    assigneeId: task.assigneeId,
    commentText: "",
    startDate: task.startDate,
    dueDate: task.dueDate,
    notifyToAccIds: [],
    estTime: task.estTime,
    estPoint: task.estPoint,
  };
  if (isCSRole) {
    value = omit(value, omitByCS);
  }
  return value;
};

TaskDetailComments.propTypes = {
  task: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  editing: PropTypes.bool.isRequired,
  handleCommentTypeChange: PropTypes.func,
};

export default TaskDetailComments;
