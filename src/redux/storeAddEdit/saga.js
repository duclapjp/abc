import { all, takeLatest, put, fork, call, takeEvery } from "redux-saga/effects";
import { isEqual } from "lodash";

import { storeService } from "@iso/services";
import { initSiteData } from "@iso/components/StoreAddEditComponent/site-controllers/data";
import { initOtaData } from "@iso/components/StoreAddEditComponent/store-ota-list/data";

import actions from "./actions";

function* getStoreDetail() {
  yield takeLatest(actions.GET_STORE_DETAIL_REQUEST, function* ({ payload }) {
    const { storeId } = payload;
    try {
      const store = yield call(storeService.getStoreDetail, { id: storeId });
      if (!store.otas || !store.otas.length) {
        store.otas = [initOtaData];
      }
      yield put({
        type: actions.GET_STORE_DETAIL_SUCCESS,
        store,
      });
    } catch (e) {
      yield put({ type: actions.GET_STORE_DETAIL_ERROR });
    }
  });
}

function* getStoreMetadata() {
  yield takeLatest(actions.GET_STORE_METADATA_REQUEST, function* () {
    try {
      const [loadChainData, directorData, responseOTAs] = yield all([
        call(storeService.loadChainData),
        call(storeService.getDirectorsAddEdit),
        call(storeService.getOtaList),
      ]);
      yield put({
        type: actions.GET_STORE_METADATA_SUCCESS,
        chains: loadChainData.chains,
        directors: directorData.accounts,
        otaOptionData: responseOTAs.otas,
      });
    } catch (e) {
      yield put({ type: actions.GET_STORE_METADATA_ERROR });
    }
  });
}

function* createStore() {
  yield takeLatest(actions.ADD_STORE_REQUEST, function* ({ payload }) {
    const { data, resolve, reject } = payload;
    try {
      data.otas = data.otas.filter((ota) => !isEqual(ota, initSiteData));
      const store = yield call(storeService.createStore, { ...data });
      yield put({
        type: actions.ADD_STORE_SUCCESS,
        store,
      });
      yield resolve();
    } catch (e) {
      yield put({ type: actions.ADD_STORE_ERROR });
      reject(e);
    }
  });
}

function* editStore() {
  yield takeLatest(actions.EDIT_STORE_REQUEST, function* ({ payload }) {
    const { storeId, data, resolve, reject } = payload;
    try {
      data.otas = data.otas.filter((ota) => !isEqual(ota, initSiteData));
      const store = yield call(storeService.editStore, {
        storeId: +storeId,
        data,
      });
      yield put({
        type: actions.EDIT_STORE_SUCCESS,
        store,
      });
      yield resolve(store);
    } catch (e) {
      yield put({ type: actions.EDIT_STORE_ERROR });
      reject();
    }
  });
}

function* updateExpired() {
  yield takeEvery(actions.UPDATE_EXPIRED_REQUEST, function* ({ payload }) {
    const { storeId, otaId, ...data } = payload;
    try {
      yield call(storeService.updateExpiredDate, {
        storeId,
        otaId,
        ...data,
      });
      const store = yield call(storeService.getStoreDetail, { id: storeId });
      yield put({
        type: actions.UPDATE_EXPIRED_SUCCESS,
        store,
      });
    } catch (error) {
      yield put({
        type: actions.UPDATE_EXPIRED_ERROR,
        error: error.response,
      });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getStoreDetail),
    fork(getStoreMetadata),
    fork(createStore),
    fork(editStore),
    fork(updateExpired),
  ]);
}
