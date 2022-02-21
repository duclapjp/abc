import React, { useCallback, useEffect, useState, useRef } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { Col, Row, Modal, message } from "antd";
import { Form, Input, Select } from "formik-antd";
import { Formik } from "formik";
import { useIntl } from "react-intl";
import { isEmpty, pick } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Helmet } from "react-helmet";

import {
  SELECT_TASK_PRIORITY_LIST,
  SELECT_TASK_STATUS_LIST,
  TASK_STOP_WATCH,
  TASK_DETAIL_COMMENT_TYPE,
} from "@iso/constants/select.constant";
import taskActions from "@iso/redux/taskAddEdit/actions";
import {
  ROLES,
  DATE_FORMAT,
  X_REQUESTED_STOREID,
  OTA_FIELD_NAME,
} from "@iso/constants/common.constant";
import {
  colFull,
  itemFullLabel,
  colSingleLeft,
  itemSingleLeftLabel,
  itemSingleFullLabel,
} from "@iso/assets/styles/form.style";
import CategoryDetail from "@iso/components/TaskAddEditComponent/category-detail/CategoryDetail";
import FileAttachGroup from "@iso/components/TaskAddEditComponent/file-attach-group/FileAttachGroup";
import TaskDetailLogs from "@iso/components/TaskAddEditComponent/task-detail-logs/TaskDetailLogs";
import TaskDetailComments from "@iso/components/TaskAddEditComponent/task-detail-comments/TaskDetailComments";
import TaskListChildren from "@iso/components/TaskAddEditComponent/task-list-children/TaskListChildren";
import CreateButtonGroup from "@iso/components/TaskAddEditComponent/CreateButtonGroup";
import DetailButtonGroup from "@iso/components/TaskAddEditComponent/DetailButtonGroup";
import EditButtonGroup from "@iso/components/TaskAddEditComponent/EditButtonGroup";
import selectStoreActions from "@iso/redux/selectStore/actions";
import SelectStore from "@iso/containers/SelectStore/SelectStore";
import LayoutContent from "@iso/components/utility/layoutContent";
import PageHeader from "@iso/components/utility/pageHeader";

import { LayoutEditTaskWrapper } from "./TaskAddAndEdit.styles";
import validationSchema from "./validation.schema";
import AdminExtendFields from "./extend-fields/AdminExtendFields";
import ChainStoreExtendFields from "./extend-fields/ChainStoreExtendFields";
import { enhanceItemsData, parseItemsDataToForm } from "./utils";

const TaskAddAndEdit = () => {
  const { messages } = useIntl();
  const params = useParams();
  const location = useLocation();
  const scrollRef = useRef(null);

  function handleScrollComment() {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const [editorMode, setEditorMode] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [stopWatchInfo, setStopWatchInfo] = useState({
    action: TASK_STOP_WATCH.ACTIONS.STOP,
    type: null,
    stopWatchLoading: false,
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const [initialValues, setInitialValues] = useState(initialValueDefault);
  const { user, dashboardRoute } = useSelector((state) => state.Auth);
  let taskId = params.taskId;
  const {
    task,
    categoryList,
    userAssigneeList,
    loading,
    sumConfirmTime,
    sumExecuteTime,
    planDefaultList,
    loadingMetaData,
  } = useSelector((state) => state.TaskAddEdit);

  useEffect(() => {
    if (!taskId && user.role === ROLES.STORE) {
      const currentStoreId =
        user.storeId || sessionStorage.getItem(X_REQUESTED_STOREID);
      if (!currentStoreId) {
        Modal.error({
          title: messages["page.taskAddEdit.modal.error"],
          content: messages["page.taskAddEdit.modal.errorAccountNoHasStore"],
          onOk: () => history.push(`${dashboardRoute}/tasks`),
        });
      } else {
        setInitialValues({
          ...initialValueDefault,
          storeIds: [currentStoreId],
          storeId: currentStoreId,
          ...(location.state?.planId ? { categoryId: location.state.planId } : {}),
        });
      }
    }
  }, [taskId, user, messages, history, dashboardRoute, location.state]);
  const role = user.role;

  useEffect(() => {
    const defaultStartDate = moment().format(DATE_FORMAT);
    if (!taskId && user.role === ROLES.ADMIN) {
      setInitialValues((prevState) => ({
        ...prevState,
        startDate: defaultStartDate,
      }));
    }
  }, [taskId, user]);

  useEffect(() => {
    dispatch(taskActions.toggleTaskMode());
    return () => {
      dispatch(taskActions.toggleTaskMode());
    };
  }, [dispatch]);

  useEffect(() => {
    if (location.state?.scrollNotify) {
      handleScrollComment();
    }
  }, [location.state]);

  // useEffect(() => {
  //   document.title = `[タスクNo.${taskId}] ${task.title} | HLS`;
  // }, [task.title, taskId]);

  const isAdmin = role === ROLES.ADMIN || role === ROLES.SUBADMIN;
  const isStore = role === ROLES.STORE;
  const isChain = role === ROLES.CHAIN;
  const isUser = role === ROLES.USER;

  const fetchDataDetail = useCallback(() => {
    new Promise((resolve, reject) => {
      if (taskId) {
        dispatch(taskActions.getTaskDetail({ taskId, resolve, reject }));
      }
    }).catch(() => {
      Modal.error({
        title: messages["page.taskAddEdit.modal.fetchError.title"],
        content: messages["page.taskAddEdit.modal.fetchError.content"],
        onOk: () => history.push(`${dashboardRoute}/tasks`),
      });
    });
  }, [dispatch, taskId, messages, history, dashboardRoute]);

  const getTaskTotalTimes = useCallback(() => {
    new Promise((resolve, reject) => {
      if (taskId) {
        dispatch(taskActions.getTaskTotalTimes({ taskId, resolve, reject }));
      }
    }).catch(() => {
      message.error(messages["page.taskAddEdit.stopWatch.getTaskTotalTimes.error"]);
    });
  }, [dispatch, taskId, messages]);

  const fetchTaskLogsLatest = useCallback(() => {
    new Promise((resolve, reject) => {
      if (taskId) {
        dispatch(taskActions.fetchTaskLogsLatest({ taskId, resolve, reject }));
      }
    })
      .then((data) => {
        setStopWatchInfo({
          action: data ? data.action : TASK_STOP_WATCH.ACTIONS.STOP,
          type: data ? data.type : null,
          stopWatchLoading: false,
        });
      })
      .catch(() => {
        message.error(
          messages["page.taskAddEdit.stopWatch.fetchTaskLogLatest.error"]
        );
      });
  }, [dispatch, taskId, messages]);

  const executeStopWatch = useCallback(
    ({ type, action }) => {
      setStopWatchInfo({
        ...stopWatchInfo,
        loading: true,
      });
      new Promise((resolve, reject) => {
        if (taskId) {
          dispatch(
            taskActions.executeTaskStopWatch({
              taskId,
              action,
              type,
              resolve,
              reject,
            })
          );
        }
      })
        .then((data) => {
          setStopWatchInfo({
            action: data ? data.action : TASK_STOP_WATCH.ACTIONS.STOP,
            type: data ? data.type : null,
            stopWatchLoading: false,
          });
          const key = `page.taskAddEdit.stopWatch.${action.toLowerCase()}.${type.toLowerCase()}.success`;
          message.success(messages[key]);
        })
        .catch(() => {
          const key = `page.taskAddEdit.stopWatch.${action.toLowerCase()}.${type.toLowerCase()}.fail`;
          message.error(messages[key]);
        });
    },
    [dispatch, taskId, stopWatchInfo, messages]
  );

  useEffect(() => {
    dispatch(taskActions.getTaskMetadata({ values: initialValueRequest }));
    fetchDataDetail();
    fetchTaskLogsLatest();
    getTaskTotalTimes();
  }, [dispatch, fetchDataDetail, fetchTaskLogsLatest, getTaskTotalTimes]);

  useEffect(() => {
    if (taskId && !isEmpty(task)) {
      setInitialValues((initialValues) => ({
        ...task,
        commentType: initialValues.commentType,
        items: parseItemsDataToForm(task.items),
        storeIds: task.storeId
          ? [task.storeId]
          : task.childs
          ? task.childs.map((child) => child.storeId)
          : null,
      }));
    }
  }, [taskId, task]);

  const onSubmit = useCallback(
    (data, form) => {
      const schema = validationSchema(messages);
      const dataTransform = schema.cast(data);
      new Promise((resolve, reject) => {
        if (taskId) {
          const submitData = pick(dataTransform, [
            "categoryId",
            "title",
            "note",
            "status",
            "priority",
            "assigneeId",
            "startDate",
            "dueDate",
            "estTime",
            "estPoint",
            "visible",
            "items",
          ]);
          const commentForm = {
            notifyToAccIds: dataTransform.notifyToAccIds,
            commentText: dataTransform.commentText || "",
            type: dataTransform.commentType,
          };
          if (
            !isEmpty(commentForm.commentText.trim()) ||
            !isEmpty(commentForm.notifyToAccIds)
          ) {
            submitData.commentForm = commentForm;
          }
          submitData.items = enhanceItemsData(submitData.items);
          if (dataTransform.visible) {
            Object.assign(submitData, { storeIds: dataTransform.storeIds });
          }

          return dispatch(
            taskActions.editTask({ taskId, data: submitData, resolve, reject })
          );
        }

        const submitData = pick(dataTransform, [
          "categoryId",
          "title",
          "note",
          "status",
          "priority",
          "assigneeId",
          "startDate",
          "dueDate",
          "estTime",
          "estPoint",
          "visible",
          "items",
          "taskAttachIds",
        ]);
        submitData.items = enhanceItemsData(submitData.items);
        if (dataTransform.visible) {
          Object.assign(submitData, { storeIds: dataTransform.storeIds });
        }

        return dispatch(
          taskActions.createTask({
            data: isAdmin
              ? submitData
              : {
                  ...submitData,
                  status: SELECT_TASK_STATUS_LIST.TASK_CHAIN_STORE_DEFAULT,
                },
            resolve,
            reject,
          })
        );
      })
        .then((response) => {
          if (!taskId) {
            Modal.success({
              title: messages["page.taskAddEdit.modal.success"],
              content: <div>{messages["page.taskAddEdit.modal.addSuccess"]}</div>,
              onOk: () =>
                history.push(`${dashboardRoute}/tasks/edit/${response[0].taskId}`),
            });
            form.resetForm();
          } else {
            Modal.success({
              title: messages["page.taskAddEdit.modal.success"],
              content: <div>{messages["page.taskAddEdit.modal.updateSuccess"]}</div>,
            });
            form.setSubmitting(false);
            fetchDataDetail();
          }
          setEditorMode(false);
          setPreviewMode(false);
        })
        .catch(() => {
          const content = taskId ? (
            <div>{messages["page.taskAddEdit.modal.errorUpdate"]}</div>
          ) : (
            <div>{messages["page.taskAddEdit.modal.errorCreate"]}</div>
          );
          Modal.error({
            title: messages["page.taskAddEdit.modal.error"],
            content: content,
          });
          form.setSubmitting(false);
        });
    },
    [messages, taskId, dispatch, isAdmin, history, dashboardRoute, fetchDataDetail]
  );

  const handleDateFieldChange = useCallback(
    (setFieldValue, name) => (value) => {
      const formatValue = value ? moment(value).format(DATE_FORMAT) : null;
      setFieldValue(name, formatValue);
    },
    []
  );
  const showStoreSelectPopup = useCallback(() => {
    dispatch(selectStoreActions.toggleSelectStore());
  }, [dispatch]);

  const handleFieldChange = useCallback(
    (setFieldValue, name) => (value) => {
      setFieldValue(name, value);
    },
    []
  );
  const handleCategoryChange = useCallback(
    (setFieldValue) => () => {
      setFieldValue("plan_id", null);
    },
    []
  );

  const handleChangeCategory = useCallback((setFieldValue, value) => {
    setFieldValue("categoryId", value);
    setFieldValue("items", {});
    setFieldValue("defaultPlanId", null);
  }, []);

  const editing = editorMode || !taskId;
  const pageTitle = taskId
    ? messages["sidebar.editTask"]
    : previewMode
    ? messages["page.taskAddEdit.preview"]
    : messages["sidebar.addTask"];

  return (
    <LayoutEditTaskWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {taskId ? `[タスクNo.${taskId}] ${initialValues.title} | ` : ""}
          {pageTitle} | HLS
        </title>
      </Helmet>
      <PageHeader>{pageTitle}</PageHeader>
      <LayoutContent>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationSchema(messages, role, taskId)}
          render={({ values, isSubmitting, setFieldValue, resetForm, errors }) => {
            return (
              <Form colon={false} labelAlign="left" className="hls-form">
                <Row justify="end">
                  {!taskId && (
                    <CreateButtonGroup
                      isSubmitting={isSubmitting}
                      previewClick={() => setPreviewMode(true)}
                      cancelPreviewClick={() => setPreviewMode(false)}
                      backClick={() => history.push(`${dashboardRoute}/tasks`)}
                      previewMode={previewMode}
                    />
                  )}
                  {taskId && !editing && (
                    <DetailButtonGroup
                      backClick={() => history.push(`${dashboardRoute}/tasks`)}
                      editClick={() => setEditorMode(true)}
                      showEdit={!isUser}
                      loading={loading}
                    />
                  )}
                  {taskId && editing && (
                    <EditButtonGroup
                      isSubmitting={isSubmitting}
                      cancelClick={() => {
                        setEditorMode(false);
                        resetForm();
                      }}
                    />
                  )}
                </Row>
                <Row>
                  {taskId && (
                    <Col {...colSingleLeft}>
                      <Form.Item
                        {...itemSingleLeftLabel}
                        label={messages["page.taskAddEdit.taskId"]}
                        name="taskId"
                      >
                        <Input name="taskId" disabled />
                      </Form.Item>
                    </Col>
                  )}
                  <Col {...colSingleLeft}>
                    <Form.Item
                      required
                      {...itemSingleLeftLabel}
                      label={messages["page.taskAddEdit.category"]}
                      name="categoryId"
                      onChange={handleCategoryChange(setFieldValue)}
                    >
                      <Select
                        name="categoryId"
                        disabled={!editing || previewMode || loadingMetaData}
                        loading={loadingMetaData}
                        onChange={(value) =>
                          handleChangeCategory(setFieldValue, value)
                        }
                      >
                        {categoryList.map((select, index) => (
                          <Select.Option key={index} value={select.planId}>
                            {select.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col {...colSingleLeft}>
                    <Form.Item
                      {...itemSingleFullLabel}
                      required
                      name="title"
                      label={messages["page.taskAddEdit.title"]}
                    >
                      <Input name="title" disabled={!editing || previewMode} />
                    </Form.Item>
                  </Col>

                  {!isStore && (
                    <Col {...colSingleLeft}>
                      <Form.Item
                        {...itemSingleFullLabel}
                        name={`items.${OTA_FIELD_NAME}.admin_otas`}
                        label={messages["page.taskAddEdit.targetOta"]}
                      >
                        <Input
                          name={`items.${OTA_FIELD_NAME}.admin_otas`}
                          disabled={!editing || previewMode}
                        />
                      </Form.Item>
                    </Col>
                  )}

                  <Col span={24}>
                    <CategoryDetail
                      planDefaultList={planDefaultList}
                      categoryList={categoryList}
                      category={values.categoryId}
                      name="items"
                      setFieldValue={setFieldValue}
                      isStore={
                        isStore || !!sessionStorage.getItem(X_REQUESTED_STOREID)
                      }
                      storeId={values.storeId}
                      categoryItems={values.items}
                      disable={!editing || previewMode || !values.categoryId}
                      otas={values.items[OTA_FIELD_NAME]?.otas}
                      taskId={taskId}
                    />
                  </Col>

                  <Col {...colFull}>
                    <Form.Item
                      {...itemFullLabel}
                      name="taskAttachIds"
                      label={messages["page.taskAddEdit.attachFile"]}
                    >
                      <FileAttachGroup
                        taskId={taskId}
                        fileListInput={values.attachs || []}
                        handleFieldChange={handleFieldChange(
                          setFieldValue,
                          "taskAttachIds"
                        )}
                        handleFileListChange={handleFieldChange(
                          setFieldValue,
                          "attachs"
                        )}
                        disabled={previewMode}
                      />
                    </Form.Item>
                  </Col>

                  <Col {...colFull}>
                    <Form.Item
                      {...itemFullLabel}
                      name="note"
                      label={messages["page.taskAddEdit.remarks"]}
                    >
                      <Input.TextArea
                        rows={5}
                        name="note"
                        disabled={!editing || previewMode}
                      />
                    </Form.Item>
                  </Col>

                  {(isAdmin || isUser) && (
                    <AdminExtendFields
                      taskId={taskId}
                      editing={editing}
                      values={values}
                      setFieldValue={setFieldValue}
                      userAssigneeList={userAssigneeList}
                      handleDateFieldChange={handleDateFieldChange}
                      handleFieldChange={handleFieldChange}
                      showStoreSelectPopup={showStoreSelectPopup}
                      errors={errors}
                      executeStopWatch={executeStopWatch}
                      stopWatchInfo={stopWatchInfo}
                      task={task}
                      isUser={isUser}
                      sumConfirmTime={sumConfirmTime}
                      sumExecuteTime={sumExecuteTime}
                      previewMode={previewMode}
                      isChildTask={taskId && task && !!task.storeId}
                    />
                  )}
                  {/* {isUser && taskId && <UserExtendFields />} */}
                  {(isChain || isStore) && (
                    <ChainStoreExtendFields
                      taskId={taskId}
                      editing={editing}
                      role={role}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleFieldChange={handleFieldChange}
                      showStoreSelectPopup={showStoreSelectPopup}
                      previewMode={previewMode}
                      isChildTask={taskId && task && !!task.storeId}
                    />
                  )}
                  <div ref={scrollRef} />
                  {!previewMode && taskId && editing && (
                    <Col {...colFull}>
                      <TaskDetailComments
                        role={role}
                        task={task}
                        editing={editing}
                        handleCommentTypeChange={handleFieldChange(
                          setFieldValue,
                          "commentType"
                        )}
                      />
                    </Col>
                  )}
                  <SelectStore
                    onSelect={handleFieldChange(setFieldValue, "storeIds")}
                    selected={values.storeIds}
                  />
                </Row>
              </Form>
            );
          }}
        />
        {!previewMode && (
          <Row>
            {taskId && !editorMode && (
              <Col {...colFull}>
                <TaskListChildren taskId={taskId} />
              </Col>
            )}
            <div ref={scrollRef} />
            {taskId && !editing && (
              <Col {...colFull}>
                <TaskDetailComments role={role} task={task} editing={editing} />
              </Col>
            )}
            {taskId && isAdmin && !editorMode && (
              <Col {...colFull}>
                <TaskDetailLogs taskId={taskId} />
              </Col>
            )}
          </Row>
        )}
      </LayoutContent>
    </LayoutEditTaskWrapper>
  );
};

const initialValueRequest = {
  list_role: `${ROLES.ADMIN},${ROLES.SUBADMIN},${ROLES.USER}`,
  sort_by: "display_name",
};

const initialValueDefault = {
  taskId: null,
  categoryId: null,
  title: "",
  note: "",
  status: SELECT_TASK_STATUS_LIST.DEFAULT,
  priority: SELECT_TASK_PRIORITY_LIST.DEFAULT,
  assigneeId: null,
  startDate: null,
  dueDate: null,
  estTime: null,
  estPoint: null,
  taskAttachIds: [],
  storeIds: null,
  visible: false,
  notifyToAccIds: true,
  commentText: true,
  commentType: TASK_DETAIL_COMMENT_TYPE.STORE,
  items: {
    // 10011: {
    //   desc: "test",
    //   roomUse: "allSelling",
    // },
  },
};

export default TaskAddAndEdit;
