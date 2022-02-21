import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import _ from "lodash";

import { notifyService } from "@iso/services";

import actions from "./actions";

function* getNotify() {
  yield takeEvery(actions.GET_NOTIFY_REQUEST, function* ({ payload }) {
    const { page } = payload;
    try {
      const response = yield call(notifyService.getNotify, { page });
      yield put({
        type: actions.GET_NOTIFY_SUCCESS,
        notifications: response.notifications,
        total: response.total,
      });
    } catch (e) {
      yield put({
        type: actions.GET_NOTIFY_ERROR,
        error: e,
      });
    }
  });
}

function* updateStatus() {
  yield takeEvery(actions.UPDATE_STATUS_REQUEST, function* ({ payload }) {
    const { taskId, status, page } = payload;
    try {
      yield call(notifyService.updateStatus, { taskId, status });
      const response = yield call(notifyService.getNotify, { page });
      yield put({
        type: actions.UPDATE_STATUS_SUCCESS,
        ..._.pick(response, ["notifications", "total"]),
      });
    } catch (error) {
      yield put({
        type: actions.UPDATE_STATUS_ERROR,
        error: error.response,
      });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getNotify), fork(updateStatus)]);
}
