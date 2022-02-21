import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { pick } from "lodash";
import { accountService } from "@iso/services";

import actions from "./actions";
import authActions from "./../auth/actions";

export function* getCurrentUser() {
  yield takeEvery(actions.GET_CURRENT_USER, function* () {
    try {
      const user = yield call(accountService.fetchUser);

      yield put({
        type: actions.GET_CURRENT_USER_SUCCESS,
        user,
      });
    } catch (e) {
      yield put({
        type: actions.GET_CURRENT_USER_ERROR,
        error: e,
      });
    }
  });
}
export function* updateCurrentUser() {
  yield takeEvery(actions.UPDATE_CURRENT_USER, function* ({ payload }) {
    const { data, resolve, reject } = payload;
    try {
      const user = yield call(accountService.updateUser, data);
      yield put({ type: actions.UPDATE_USER_SUCCESS, user });
      yield put({
        type: authActions.UPDATE_USER_LOGIN,
        user: pick(user, [
          "displayName",
          "phone",
          "notiDest",
          "mailSetting",
          "slackSetting",
          "chatworkSetting",
          "lineSetting",
          "viberRakutenSetting",
        ]),
      });
      yield resolve();
    } catch (e) {
      yield put({ type: actions.UPDATE_USER_ERROR, error: e });
      yield reject(e);
    }
  });
}
export default function* rootSaga() {
  yield all([fork(getCurrentUser)]);
  yield all([fork(updateCurrentUser)]);
}
