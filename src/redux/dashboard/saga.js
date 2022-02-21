import { all, takeEvery, fork, call, put } from "redux-saga/effects";

import { dashboardService, taskService } from "@iso/services";

import actions from "./actions";

function* getStopWatches() {
  yield takeEvery(actions.GET_STOP_WATCHES_REQUEST, function* ({ payload }) {
    const { page } = payload;
    try {
      const response = yield call(dashboardService.fetchStopWatches, {
        page,
      });
      yield put({
        type: actions.GET_STOP_WATCHES_SUCCESS,
        stopWatches: response ? response.rows : [],
        stopWatchesTotal: response ? response.total : 0,
      });
    } catch (error) {
      yield put({
        type: actions.GET_STOP_WATCHES_ERROR,
        error: error.response,
      });
    }
  });
}

function* getUncompletedTasks() {
  yield takeEvery(actions.GET_UNCOMPLETED_TASK_REQUEST, function* ({ payload }) {
    const { page } = payload;
    try {
      const response = yield call(dashboardService.fetchUncompletedTasks, {
        page,
      });
      yield put({
        type: actions.GET_UNCOMPLETED_TASK_SUCCESS,
        uncompletedTasks: response
          ? response.rows.map((child) => {
              if (child.storeId) {
                return child;
              }
              let obj = Object.assign({}, child);
              obj.children = [];
              return obj;
            })
          : [],
        uncompletedTasksTotal: response ? response.total : 0,
      });
    } catch (error) {
      yield put({
        type: actions.GET_UNCOMPLETED_TASK_ERROR,
        error: error.response,
      });
    }
  });
}

function* getChildrenTask() {
  yield takeEvery(actions.GET_CHILDREN_TASK_REQUEST, function* ({ payload }) {
    const { taskId } = payload;
    try {
      const childTasks = yield call(dashboardService.fetchChildrenTask, {
        taskId,
      });
      yield put({
        type: actions.GET_CHILDREN_TASK_SUCCESS,
        childTasks: childTasks ? childTasks.rows : [],
        taskId,
      });
    } catch (e) {
      yield put({
        type: actions.GET_CHILDREN_TASK_ERROR,
        error: e.response,
      });
    }
  });
}

function* getCategoryList() {
  yield takeEvery(actions.GET_CATEGORIES_REQUEST, function* () {
    try {
      const categories = yield call(taskService.getCategoryList);
      yield put({
        type: actions.GET_CATEGORIES_SUCCESS,
        categories: categories?.rows || [],
      });
    } catch (error) {
      yield put({
        type: actions.GET_CATEGORIES_ERROR,
      });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getStopWatches),
    fork(getUncompletedTasks),
    fork(getChildrenTask),
    fork(getCategoryList),
  ]);
}
