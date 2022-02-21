import { all, takeEvery, fork, call } from "redux-saga/effects";

import { authService } from "@iso/services";
import actions from "./actions";

export function* confirmEmailRequest() {
  yield takeEvery(actions.CONFIRM_EMAIL_REQUEST, function* ({ payload }) {
    const { token, resolve, reject } = payload;
    try {
      yield call(authService.confirmEmail, { token });
      yield resolve();
    } catch (error) {
      yield reject(error);
    }
  });
}

export default function* rootSaga() {
  yield all([fork(confirmEmailRequest)]);
}
