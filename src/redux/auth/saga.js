import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { createBrowserHistory } from "history";

import { getAccessToken, clearToken, setToken } from "@iso/lib/helpers/utility";
import { authService } from "@iso/services";
import actions from "./actions";
import accountsActions from "../account/actions";
import accountSettingActions from "../accountSetting/actions";
import chainActions from "../chain/actions";
import chainSettingActions from "../chainSetting/actions";
import storeActions from "../store/actions";
import storeAddEditActions from "../storeAddEdit/actions";
import passwordHistoryActions from "../passwordHistory/actions";
import planAmountActions from "../planAmount/actions";
import taskAction from "../task/actions";

const history = createBrowserHistory();

export function* loginRequest() {
  yield takeEvery(actions.LOGIN_REQUEST, function* ({ payload }) {
    const { email, password } = payload;
    try {
      const signInData = yield call(authService.signIn, { email, password });
      yield setToken(signInData.token);
      const currentUser = yield call(authService.getCurrentUser);

      yield put({
        type: actions.LOGIN_SUCCESS,
        token: signInData.token,
        profile: currentUser,
      });
    } catch (error) {
      yield put({ type: actions.LOGIN_ERROR, error });
    }
  });
}

export function* forgetPasswordRequest() {
  yield takeEvery(actions.FORGET_PASSWORD_REQUEST, function* ({ payload }) {
    const { email, resolve, reject } = payload;
    try {
      const response = yield call(authService.forgetPassword, { email });
      yield resolve(response.mail);
    } catch (error) {
      const status = error && error.response && error.response.status;
      yield reject(status);
    }
  });
}

export function* resetPassword() {
  yield takeEvery(actions.RESET_PASSWORD_REQUEST, function* ({ payload }) {
    const { password, token, resolve, reject } = payload;
    try {
      yield call(authService.resetPassword, { password, token });
      yield resolve();
    } catch (error) {
      const status = error && error.response && error.response.status;
      yield reject(status);
    }
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield clearToken();
    yield all([
      put({ type: accountsActions.RESET_ACCOUNTS_STORE }),
      put({ type: accountSettingActions.RESET_ACCOUNT_SETTING_STORE }),
      put({ type: accountSettingActions.RESET_ACCOUNT_SETTING_STORE }),
      put({ type: chainActions.RESET_CHAIN_STORE }),
      put({ type: chainSettingActions.RESET_CHAIN_SETTING_STORE }),
      put({ type: storeActions.RESET_STORES_STORE }),
      put({ type: storeAddEditActions.RESET_STORE_ADD_EDIT_STORE }),
      put({ type: passwordHistoryActions.RESET_PASSWORD_HISTORY_STORE }),
      put({ type: planAmountActions.RESET_PLAN_AMOUNT }),
      put({ type: taskAction.LOGOUT_RESET_LIST_TASK_SEARCH }),
    ]);
    history.push("/");
  });
}

export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* ({ payload }) {
    const { resolve, reject } = payload;
    try {
      const currentUser = yield call(authService.getCurrentUser);
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: getAccessToken(),
        profile: currentUser,
      });
      yield resolve(currentUser);
    } catch (error) {
      yield reject();
      yield put({ type: actions.CHECK_AUTHORIZATION_ERROR, error });
    }
  });
}

export function* chainLoginStore() {
  yield takeEvery(actions.CHAIN_LOGIN_STORE_REQUEST, function* ({ payload }) {
    const { resolve, reject } = payload;
    try {
      const currentUser = yield call(authService.getCurrentUser);
      yield put({
        type: actions.CHAIN_LOGIN_STORE_SUCCESS,
      });
      yield resolve(currentUser);
    } catch (error) {
      yield reject();
      yield put({ type: actions.CHAIN_LOGIN_STORE_ERROR, error });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(chainLoginStore),
    fork(loginRequest),
    fork(loginError),
    fork(logout),
    fork(forgetPasswordRequest),
    fork(resetPassword),
  ]);
}
