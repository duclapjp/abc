import { all, takeLatest, put, fork, call } from "redux-saga/effects";

import { ganttChartService } from "@iso/services";
import actions from "./actions";

export function* getGanttChartData() {
  yield takeLatest(actions.GET_GANTT_CHART_REQUEST, function* ({ payload }) {
    const { resolve, reject, data } = payload;
    try {
      const tasks = yield call(ganttChartService.getTasksForGanttChart, { ...data });
      yield put({
        type: actions.GET_GANTT_CHART_SUCCESS,
        tasks: tasks?.data || [],
      });
      resolve({});
    } catch (e) {
      yield put({ type: actions.GET_GANTT_CHART_ERROR });
      reject(e);
    }
  });
}

export function* getAssignees() {
  yield takeLatest(actions.GET_ASSIGNEES_REQUEST, function* () {
    try {
      const assignees = yield call(ganttChartService.getAssignees);
      yield put({
        type: actions.GET_ASSIGNEES_SUCCESS,
        assignees: assignees ? assignees.accounts : [],
      });
    } catch (e) {
      yield put({ type: actions.GET_GANTT_CHART_ERROR });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getGanttChartData)]);
  yield all([fork(getAssignees)]);
}
