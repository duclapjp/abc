import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { chainService } from "@iso/services";

import actions from "./actions";

export function* fetChain() {
  yield takeEvery(actions.GET_CHAIN_REQUEST, function* ({ chainId }) {
    try {
      const chain = yield call(chainService.fetChainById, chainId);
      yield put({
        type: actions.GET_CHAIN_SUCCESS,
        chain,
      });
    } catch (e) {
      yield put({
        type: actions.GET_CHAIN_ERROR,
        error: e,
      });
    }
  });
}
export function* updateChain() {
  yield takeEvery(actions.UPDATE_CHAIN_REQUEST, function* ({ payload }) {
    const { resolve, reject, chainId, data } = payload;
    try {
      const chain = yield call(chainService.updateChainSetting, chainId, data);
      yield put({
        type: actions.UPDATE_CHAIN_SUCCESS,
        chain,
      });
      yield resolve();
    } catch (e) {
      yield put({
        type: actions.UPDATE_CHAIN_ERROR,
        error: e,
      });
      yield reject(e);
    }
  });
}
export default function* rootSaga() {
  yield all([fork(fetChain)]);
  yield all([fork(updateChain)]);
}
