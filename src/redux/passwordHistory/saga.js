import { all, takeEvery, put, fork, call } from "redux-saga/effects";

import actions from "./actions";
import { passwordHistoryService } from "@iso/services";

function* getPasswordHistoriesRequest() {
  yield takeEvery(actions.GET_PASSWORD_HISTORIES_REQUEST, function* ({ payload }) {
    const { storeId, otaId, accountId, page, size } = payload;
    try {
      const data = yield call(passwordHistoryService.fetchPasswordHistories, {
        storeId,
        otaId,
        accountId,
        page,
        size,
      });
      yield put({
        type: actions.GET_PASSWORD_HISTORIES_SUCCESS,
        passwordHistories: data ? data.passwordHistories : [],
        total: data ? data.total : 0,
      });
    } catch (error) {
      yield put({
        type: actions.GET_PASSWORD_HISTORIES_ERROR,
        error: error.response,
      });
    }
  });
}

function* getMetaData() {
  yield takeEvery(actions.GET_METADATA_PASSWORD_HISTORY_REQUEST, function* ({
    payload,
  }) {
    const { storeId } = payload;
    try {
      const resMetaData = yield all([
        call(passwordHistoryService.fetchOTAs, { storeId }),
        call(passwordHistoryService.fetchOtaAccounts, { storeId }),
      ]);
      yield put({
        type: actions.GET_METADATA_PASSWORD_HISTORY_SUCCESS,
        OTAs: resMetaData[0].otas,
        updaters: resMetaData[1].accounts,
      });
    } catch (error) {
      yield put({
        type: actions.GET_METADATA_PASSWORD_HISTORY_ERROR,
        error: error.response,
      });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getPasswordHistoriesRequest), fork(getMetaData)]);
}
