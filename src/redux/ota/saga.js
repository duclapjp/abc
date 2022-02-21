import { all, takeEvery, put, fork, call } from "redux-saga/effects";

import { otaService } from "@iso/services";

import actions from "./actions";

function* getOTA() {
  yield takeEvery(actions.GET_OTA_REQUEST, function* ({ payload }) {
    const { otaId } = payload;
    try {
      const ota = yield call(otaService.fetchOta, { otaId });
      yield put({
        type: actions.GET_OTA_SUCCESS,
        ota,
      });
    } catch (error) {
      yield put({
        type: actions.GET_OTA_ERROR,
        error: error.response,
      });
    }
  });
}

function* getOTAs() {
  yield takeEvery(actions.GET_OTAS_REQUEST, function* ({ payload }) {
    const { size, page, ...data } = payload;
    try {
      const response = yield call(otaService.fetchOTAs, {
        page,
        size,
        ...data,
      });
      yield put({
        type: actions.GET_OTAS_SUCCESS,
        otas: response ? response.rows : [],
        total: response.total,
      });
    } catch (error) {
      yield put({
        type: actions.GET_OTAS_ERROR,
        error: error.response,
      });
    }
  });
}

function* getOtaTypes() {
  yield takeEvery(actions.GET_OTA_TYPES_REQUEST, function* () {
    try {
      const response = yield call(otaService.fetchOTATypes);
      yield put({
        type: actions.GET_OTA_TYPES_SUCCESS,
        otaTypes: response.rows,
      });
    } catch (error) {
      yield put({
        type: actions.GET_OTA_TYPES_ERROR,
        error: error.response,
      });
    }
  });
}

function* updateOTAStatus() {
  yield takeEvery(actions.UPDATE_OTA_STATUS_REQUEST, function* ({ payload }) {
    const { otaId, status, page, size } = payload;
    try {
      yield call(otaService.toggleOTAStatus, { otaId, status });
      const response = yield call(otaService.fetchOTAs, {
        page,
        size,
      });
      yield put({
        type: actions.UPDATE_OTA_STATUS_SUCCESS,
        otas: response ? response.rows : [],
        total: response.total,
      });
    } catch (error) {
      yield put({
        type: actions.UPDATE_OTA_STATUS_ERROR,
        error: error.response,
      });
    }
  });
}

function* updateOTA() {
  yield takeEvery(actions.UPDATE_OTA_REQUEST, function* ({ payload }) {
    const { data, resolve, reject } = payload;
    try {
      yield call(otaService.updateOTA, { data });
      yield put({
        type: actions.UPDATE_OTA_SUCCESS,
      });
      resolve({});
    } catch (error) {
      yield put({
        type: actions.UPDATE_OTA_ERROR,
        error: error.response,
      });
      reject({});
    }
  });
}

function* createOTA() {
  yield takeEvery(actions.CREATE_OTA_REQUEST, function* ({ payload }) {
    const { data, resolve, reject } = payload;
    try {
      yield call(otaService.createOTA, { data });
      yield put({
        type: actions.CREATE_OTA_SUCCESS,
      });
      resolve({});
    } catch (error) {
      yield put({
        type: actions.CREATE_OTA_ERROR,
        error: error.response,
      });
      reject({});
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getOTAs),
    fork(getOtaTypes),
    fork(getOTA),
    fork(updateOTAStatus),
    fork(updateOTA),
    fork(createOTA),
  ]);
}
