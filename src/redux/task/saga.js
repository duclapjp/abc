import { all, takeEvery, put, fork, call } from "redux-saga/effects";

import { taskService } from "@iso/services";
import actions from "@iso/redux/task/actions";
import { filter } from "lodash";

function* getTaskDataRequest() {
  yield takeEvery(actions.GET_TASKS_REQUEST, function* ({ payload }) {
    const {
      searchKeyword,
      storeId,
      status,
      priority,
      directorId,
      registerPersonId,
      assigneeId,
      size,
      page,
      getTaskGrantChart,
    } = payload;
    try {
      const tasks = yield call(taskService.getTasks, {
        searchKeyword,
        storeId,
        status,
        priority,
        directorId,
        assigneeId,
        registerPersonId,
        size,
        page,
      });
      const listTask = tasks
        ? tasks.tasks.map((child) => {
            if (child.storeId !== null && child.parentTaskId === null) {
              return child;
            }
            let obj = Object.assign({}, child);
            obj.children = [];
            return obj;
          })
        : [];
      const taskGrantChart = tasks
        ? filter(tasks.tasks, (task) => !task.dueDate)
        : [];
      yield put({
        type: actions.GET_TASKS_SUCCESS,
        tasks: tasks && !getTaskGrantChart ? listTask : taskGrantChart,
        total: tasks ? tasks.total : 0,
      });
    } catch (e) {
      yield put({
        type: actions.GET_TASKS_ERROR,
        error: e.message,
      });
    }
  });
}

function* getTasksMetaData() {
  yield takeEvery(actions.GET_TASKS_METADATA_REQUEST, function* ({ payload }) {
    const { chainId } = payload;
    try {
      const [directors, assignees, registerPersons, stores] = yield all([
        call(taskService.getDirectors),
        call(taskService.getAssignees),
        call(taskService.getRegisterPersons),
        call(taskService.getStores, { chainId }),
      ]);

      yield put({
        type: actions.GET_TASKS_METADATA_SUCCESS,
        directors: directors ? directors.accounts : [],
        assignees: assignees ? assignees.accounts : [],
        stores: stores ? stores.stores : [],
        registerPersons: registerPersons ? registerPersons.accounts : [],
      });
    } catch (e) {
      yield put({
        type: actions.GET_TASKS_METADATA_ERROR,
        error: e.response,
      });
    }
  });
}

function* getChildTaskRequest() {
  yield takeEvery(actions.GET_CHILD_TASKS_REQUEST, function* ({ payload }) {
    const { taskId } = payload;
    try {
      const childTasks = yield call(taskService.getTaskChildren, {
        taskId,
      });
      yield put({
        type: actions.GET_CHILD_TASKS_SUCCESS,
        childTasks: childTasks ? childTasks.tasks : [],
        taskId,
      });
    } catch (e) {
      yield put({
        type: actions.GET_CHILD_TASKS_ERROR,
        error: e.response,
      });
    }
  });
}

function* getTaskLog() {
  yield takeEvery(actions.GET_TASK_LOG_REQUEST, function* ({ payload }) {
    const { params } = payload;
    try {
      const response = yield call(taskService.getTaskLog, {
        params,
      });
      yield put({
        type: actions.GET_TASK_LOG_SUCCESS,
        taskLogs: response ? response : [],
      });
    } catch (e) {
      yield put({
        type: actions.GET_TASK_LOG_ERROR,
      });
    }
  });
}

function* getTasklogTasks() {
  yield takeEvery(actions.GET_TASKLOG_TASKS_REQUEST, function* ({ payload }) {
    const { params } = payload;
    try {
      const tasks = yield call(taskService.getTaskLogTasks, {
        params,
      });
      yield put({
        type: actions.GET_TASKLOG_TASKS_SUCCESS,
        tasklogTasks: tasks ? tasks.tasks : [],
      });
    } catch (e) {
      yield put({ type: actions.GET_TASKLOG_TASKS_ERROR });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getTaskDataRequest)]);
  yield all([fork(getTasksMetaData)]);
  yield all([fork(getChildTaskRequest)]);
  yield all([fork(getTaskLog)]);
  yield all([fork(getTasklogTasks)]);
}
