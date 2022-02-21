import { all, takeLatest, takeEvery, put, fork, call } from "redux-saga/effects";
import { get, reverse, pickBy, pick, identity } from "lodash";

import { taskService, planAmountService } from "@iso/services";
import actions from "./actions";
import { TASK_STOP_WATCH } from "@iso/constants/select.constant";

export function* getTaskDetail() {
  yield takeLatest(actions.GET_TASK_DETAIL_REQUEST, function* ({ payload }) {
    const { taskId, resolve, reject } = payload;
    try {
      const task = yield call(taskService.getTaskDetail, { taskId });
      yield put({
        type: actions.GET_TASK_DETAIL_SUCCESS,
        task,
      });
      resolve({});
    } catch (e) {
      yield put({ type: actions.GET_TASK_DETAIL_ERROR });
      reject(e);
    }
  });
}

export function* getTaskMetadata() {
  yield takeLatest(actions.GET_TASK_METADATA_REQUEST, function* ({ payload }) {
    const { values } = payload;
    try {
      const [categoryList, userAssigneeList, planDefaultList] = yield all([
        call(taskService.getCategoryList),
        call(taskService.getUserAssigneeList, values),
        call(planAmountService.fetchDefaultPlans),
      ]);
      yield put({
        type: actions.GET_TASK_METADATA_SUCCESS,
        categoryList: categoryList?.rows || [],
        planDefaultList: planDefaultList?.rows || [],
        userAssigneeList: userAssigneeList.accounts || [],
      });
    } catch (e) {
      yield put({ type: actions.GET_TASK_METADATA_ERROR });
    }
  });
}

export function* getCommentUserNotifyRequest() {
  yield takeLatest(actions.GET_COMMENT_USER_NOTIFY_REQUEST, function* ({ payload }) {
    const { id, type } = payload;
    try {
      const response = yield call(taskService.getCommentUserNotifyRequest, {
        id,
        type,
      });
      yield put({
        type: actions.GET_COMMENT_USER_NOTIFY_SUCCESS,
        userNotifyList: get(response, "accounts", []),
      });
    } catch (e) {
      yield put({ type: actions.GET_COMMENT_USER_NOTIFY_ERROR });
    }
  });
}

export function* createTask() {
  yield takeLatest(actions.ADD_TASK_REQUEST, function* ({ payload }) {
    const { data, resolve, reject } = payload;
    try {
      const response = yield call(taskService.createTask, { ...data });
      yield put({
        type: actions.ADD_TASK_SUCCESS,
        // task,
      });
      yield resolve(response);
    } catch (e) {
      yield put({ type: actions.ADD_TASK_ERROR });
      reject(e);
    }
  });
}

export function* editTask() {
  yield takeLatest(actions.EDIT_TASK_REQUEST, function* ({ payload }) {
    const { taskId, data, resolve, reject } = payload;
    try {
      const task = yield call(taskService.editTask, {
        taskId: +taskId,
        data,
      });
      yield put({
        type: actions.EDIT_TASK_SUCCESS,
        task,
      });
      yield resolve(task);
    } catch (e) {
      yield put({ type: actions.EDIT_TASK_ERROR });
      reject();
    }
  });
}

function* getTaskLogs() {
  yield takeEvery(actions.GET_TASK_TASKLOG_REQUEST, function* ({ payload }) {
    const { taskId, ...data } = payload;
    try {
      const { taskLogs, total } = yield call(taskService.fetchTaskLogs, {
        taskId,
        ...data,
      });
      yield put({
        type: actions.GET_TASK_TASKLOG_SUCCESS,
        taskLogs,
        taskLogsTotal: total,
      });
    } catch (error) {
      yield put({
        type: actions.GET_TASK_TASKLOG_ERROR,
      });
    }
  });
}

function* getSummaries() {
  yield takeEvery(actions.GET_SUMMARIES_REQUEST, function* ({ payload }) {
    const { taskId, ...data } = payload;
    try {
      const { userTaskSummaries, total } = yield call(taskService.fetchSummaries, {
        taskId,
        ...data,
      });
      yield put({
        type: actions.GET_SUMMARIES_SUCCESS,
        summaries: userTaskSummaries,
        summariesTotal: total,
      });
    } catch (error) {
      yield put({
        type: actions.GET_SUMMARIES_ERROR,
      });
    }
  });
}

export function* getComments() {
  yield takeLatest(actions.GET_COMMENTS_REQUEST, function* ({ payload }) {
    const { taskId, resolve, reject, ...data } = payload;
    try {
      const response = yield call(taskService.getComments, {
        taskId: +taskId,
        data,
      });
      const comments = reverse(get(response, "comments", []));
      const totalComment = +get(response, "total", 0);
      yield put({ type: actions.GET_COMMENTS_SUCCESS, comments, totalComment });
      yield resolve(comments);
    } catch (e) {
      yield put({ type: actions.GET_COMMENTS_ERROR });
      reject();
    }
  });
}

export function* createComment() {
  yield takeLatest(actions.CREATE_COMMENT_REQUEST, function* ({ payload }) {
    const { data, resolve, reject } = payload;
    try {
      const comment = yield call(taskService.createComment, data);
      const task = pickBy(
        pick(data, [
          "startDate",
          "dueDate",
          "estPoint",
          "estTime",
          "status",
          "assigneeId",
        ]),
        identity
      );
      yield put({ type: actions.CREATE_COMMENT_SUCCESS, comment, task });
      yield resolve();
    } catch (e) {
      yield put({ type: actions.CREATE_COMMENT_ERROR });
      yield reject(e);
    }
  });
}

function* getTaskChildren() {
  yield takeEvery(actions.GET_TASKS_CHILDREN_REQUEST, function* ({ payload }) {
    const { ...data } = payload;
    try {
      const { tasks, total } = yield call(taskService.getTaskChildren, { ...data });
      yield put({
        type: actions.GET_TASKS_CHILDREN_SUCCESS,
        tasks,
        total,
      });
    } catch (error) {
      yield put({ type: actions.GET_TASKS_CHILDREN_ERROR, error: error.response });
    }
  });
}

export function* fetchTaskLogsLatest() {
  yield takeLatest(actions.FETCH_TASK_TASKLOG_LATEST_REQUEST, function* ({
    payload,
  }) {
    const { taskId, resolve, reject } = payload;
    try {
      const response = yield call(taskService.fetchTaskLogsLatest, {
        taskId: +taskId,
      });
      yield put({ type: actions.FETCH_TASK_TASKLOG_LATEST_SUCCESS, response });
      yield resolve(response);
    } catch (e) {
      yield put({ type: actions.FETCH_TASK_TASKLOG_LATEST_ERROR });
      reject(e);
    }
  });
}

export function* executeTaskStopWatch() {
  yield takeLatest(actions.EXECUTE_TASK_STOP_WATCH, function* ({ payload }) {
    const { taskId, action, type, resolve, reject } = payload;
    try {
      const response = yield call(taskService.executeStopWatch, {
        taskId: +taskId,
        action,
        type,
      });
      yield resolve(response);
      if (action === TASK_STOP_WATCH.ACTIONS.STOP) {
        yield put({
          type: actions.GET_TASK_TOTAL_TIMES_REQUEST,
          payload: {
            taskId: +taskId,
          },
        });
      }
    } catch (e) {
      reject(e);
    }
  });
}

export function* getTaskTotalTimes() {
  yield takeLatest(actions.GET_TASK_TOTAL_TIMES_REQUEST, function* ({ payload }) {
    const { taskId, resolve, reject } = payload;
    try {
      const response = yield call(taskService.getTaskTotalTimes, {
        taskId: +taskId,
      });
      yield put({
        type: actions.GET_TASK_TOTAL_TIMES_SUCCESS,
        sumConfirmTime: response.sum_confirm_time,
        sumExecuteTime: response.sum_execute_time,
      });
      if (resolve) resolve({});
    } catch (e) {
      if (reject) resolve(e);
    }
  });
}

function* editTaskLog() {
  yield takeEvery(actions.EDIT_TASKLOG_REQUEST, function* ({ payload }) {
    const { taskId, taskLogId, datetime, resolve, reject } = payload;
    try {
      yield call(taskService.editTaskLog, { taskId, taskLogId, datetime });
      yield put({
        type: actions.EDIT_TASKLOG_SUCCESS,
      });
      yield resolve({});
    } catch (error) {
      yield put({
        type: actions.EDIT_TASKLOG_ERROR,
      });
      yield reject({});
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getTaskDetail),
    fork(getTaskMetadata),
    fork(createTask),
    fork(editTask),
    fork(getCommentUserNotifyRequest),
    fork(getTaskLogs),
    fork(getSummaries),
    fork(getComments),
    fork(createComment),
    fork(getTaskChildren),
    fork(fetchTaskLogsLatest),
    fork(executeTaskStopWatch),
    fork(getTaskTotalTimes),
    fork(editTaskLog),
  ]);
}
