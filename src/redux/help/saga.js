import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { helpService } from "@iso/services";
import actions from "@iso/redux/help/actions";

function* getStoreData() {
  yield takeEvery(actions.GET_DATA_HELP_STORE_REQUEST, function* ({ payload }) {
    let { storeId } = payload;
    try {
      const store = yield call(helpService.getDataStoresHelp, { storeId });
      yield put({
        type: actions.GET_DATA_HELP_STORE_SUCCESS,
        store: store,
      });
    } catch (e) {
      yield put({
        type: actions.GET_DATA_HELP_ERROR,
        error: e.response,
      });
    }
  });
}

function* getChainData() {
  yield takeEvery(actions.GET_DATA_HELP_CHAIN_REQUEST, function* ({ payload }) {
    let { chainId } = payload;
    try {
      const res = yield call(helpService.getDataChainHelp, { chainId });
      yield put({
        type: actions.GET_DATA_HELP_CHAIN_SUCCESS,
        stores: res,
      });
    } catch (e) {
      yield put({
        type: actions.GET_DATA_HELP_ERROR,
        error: e.response,
      });
    }
  });
}

function* getManualFileDetail() {
  yield takeEvery(actions.GET_FILE_REQUEST, function* () {
    try {
      const fileExist = yield call(helpService.getManualFileDetail);
      yield put({
        type: actions.GET_FILE_SUCCESS,
        fileExist,
      });
    } catch (error) {
      yield put({
        type: actions.GET_FILE_ERROR,
        error: error.response,
      });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getChainData), fork(getStoreData), fork(getManualFileDetail)]);
}
