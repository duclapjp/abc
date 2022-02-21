import { all, takeEvery, put, fork, call } from "redux-saga/effects";

import { storeService } from "@iso/services";
import actions from "@iso/redux/store/actions";

function* getStoresDataRequest() {
  yield takeEvery(actions.GET_STORES_DATA_REQUEST, function* ({ payload }) {
    const { data } = payload;
    try {
      const stores = yield call(storeService.getStores, { data });
      yield put({
        type: actions.GET_STORES_DATA_SUCCESS,
        stores: stores ? stores.stores : [],
        total: stores ? stores.total : 0,
      });
    } catch (e) {
      yield put({
        type: actions.GET_STORES_DATA_ERROR,
        error: e.response,
      });
    }
  });
}

function* getStoresMetaDataRequest() {
  yield takeEvery(actions.GET_STORES_METADATA_REQUEST, function* () {
    try {
      const [directors, selectStores] = yield all([
        call(storeService.getDirectors),
        call(storeService.getSelectStores),
      ]);
      yield put({
        type: actions.GET_STORES_METADATA_SUCCESS,
        directors: directors ? directors.accounts : [],
        selectStores: selectStores ? selectStores.stores : [],
      });
    } catch (e) {
      yield put({ type: actions.GET_STORES_METADATA_ERROR, error: e.response });
    }
  });
}

function* getStoreOTAs() {
  yield takeEvery(actions.GET_STORE_OTAS_REQUEST, function* ({ storeId }) {
    try {
      const otas = yield call(storeService.getStoreOTAs, { storeId });
      yield put({
        type: actions.GET_STORE_OTAS_SUCCESS,
        otas: otas ? otas : [],
      });
    } catch (error) {
      yield put({
        type: actions.GET_STORE_OTAS_ERROR,
        error: error.response,
      });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getStoresDataRequest),
    fork(getStoresMetaDataRequest),
    fork(getStoreOTAs),
  ]);
}
