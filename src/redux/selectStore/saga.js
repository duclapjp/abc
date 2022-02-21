import { all, takeEvery, put, fork, call } from "redux-saga/effects";

import { selectStoreService } from "@iso/services";
import actions from "@iso/redux/selectStore/actions";

function* getStores() {
  yield takeEvery(actions.FETCH_STORES_REQUEST, function* () {
    try {
      const responseSelectStore = yield call(selectStoreService.fetchStores);
      yield put({
        type: actions.FETCH_STORES_SUCCESS,
        stores: responseSelectStore.stores,
      });
    } catch (error) {
      yield put({
        type: actions.FETCH_STORES_ERROR,
        error: error.response,
      });
    }
  });
}

function* getSelectStoreMetaData() {
  yield takeEvery(actions.FETCH_METADATA_SELECT_STORE_REQUEST, function* () {
    try {
      const metaData = yield all([
        call(selectStoreService.fetchDirectors),
        call(selectStoreService.fetchChains),
      ]);
      yield put({
        type: actions.FETCH_METADATA_SELECT_STORE_SUCCESS,
        directors: metaData[0].accounts,
        chains: metaData[1].chains,
      });
    } catch (error) {
      yield put({
        type: actions.FETCH_METADATA_SELECT_STORE_ERROR,
        error: error.response,
      });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getStores), fork(getSelectStoreMetaData)]);
}
