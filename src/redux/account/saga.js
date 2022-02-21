import { all, takeEvery, takeLatest, put, fork, call } from "redux-saga/effects";

import { accountService } from "@iso/services";
import actions from "./actions";

function* getAccountsRequest() {
  yield takeEvery(actions.GET_ACCOUNTS_REQUEST, function* ({ payload }) {
    const { role, mail, searchKeyword, page, size } = payload;
    try {
      const data = yield call(accountService.fetchAccounts, {
        role,
        mail,
        searchKeyword,
        page,
        size,
      });

      yield put({
        type: actions.GET_ACCOUNTS_SUCCESS,
        accounts: data ? data.accounts : [],
        total: data ? data.total : 0,
      });
    } catch (error) {
      yield put({ type: actions.GET_ACCOUNTS_ERROR, error: error.response });
    }
  });
}

export function* getAccount() {
  yield takeLatest(actions.GET_ACCOUNT_REQUEST, function* ({ payload }) {
    const { accountId } = payload;
    try {
      const account = yield call(accountService.getAccount, { id: accountId });
      if (account.chainId) {
        yield put({
          type: actions.GET_STORES_REQUEST,
          payload: { chainIdValue: account.chainId },
        });
      }
      yield put({
        type: actions.GET_ACCOUNT_SUCCESS,
        account,
      });
    } catch (e) {
      yield put({ type: actions.GET_ACCOUNT_ERROR });
    }
  });
}

export function* getChainsData() {
  yield takeLatest(actions.GET_CHAINS_REQUEST, function* () {
    try {
      const { chains } = yield call(accountService.loadChainData);
      yield put({
        type: actions.GET_CHAINS_SUCCESS,
        chains,
      });
    } catch (e) {
      yield put({ type: actions.GET_CHAINS_ERROR });
    }
  });
}

export function* getStoresData() {
  yield takeLatest(actions.GET_STORES_REQUEST, function* ({ payload }) {
    const { chainIdValue } = payload;
    try {
      const { stores } = yield call(accountService.loadStoreData, {
        chainId: chainIdValue,
      });
      yield put({
        type: actions.GET_STORES_SUCCESS,
        stores,
      });
    } catch (e) {
      yield put({ type: actions.GET_STORES_ERROR });
    }
  });
}

export function* createAccount() {
  yield takeLatest(actions.ADD_ACCOUNT_REQUEST, function* ({ payload }) {
    const { data, resolve, reject } = payload;
    try {
      const account = yield call(accountService.createAccount, { ...data });
      yield put({
        type: actions.ADD_ACCOUNT_SUCCESS,
        account,
      });
      yield resolve();
    } catch (e) {
      yield put({ type: actions.ADD_ACCOUNT_ERROR });
      reject(e);
    }
  });
}

export function* editAccount() {
  yield takeLatest(actions.EDIT_ACCOUNT_REQUEST, function* ({ payload }) {
    const { accountId, data, resolve, reject } = payload;
    try {
      const account = yield call(accountService.editAccount, {
        accountId: +accountId,
        ...data,
      });
      yield put({
        type: actions.EDIT_ACCOUNT_SUCCESS,
        account,
      });
      yield resolve(account);
    } catch (e) {
      yield put({ type: actions.EDIT_ACCOUNT_ERROR });
      reject();
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getAccountsRequest)]);
  yield all([fork(getAccount)]);
  yield all([fork(getChainsData)]);
  yield all([fork(getStoresData)]);
  yield all([fork(createAccount)]);
  yield all([fork(editAccount)]);
}
