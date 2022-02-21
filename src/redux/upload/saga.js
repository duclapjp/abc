import { all, takeEvery, put, fork, call } from "redux-saga/effects";

import actions from "@iso/redux/upload/actions";
import { uploadService } from "@iso/services";

export function* uploadFileRequest() {
  yield takeEvery(actions.MANUAL_UPLOAD_REQUEST, function* ({ payload }) {
    const { fileList, resolve, reject } = payload;
    try {
      const fileData = new FormData();
      fileData.append("manualFile", fileList);
      yield call(uploadService.manualFileUpload, fileData);
      yield put({ type: actions.MANUAL_UPLOAD_SUCCESS });
      yield resolve();
    } catch (e) {
      yield put({ type: actions.MANUAL_UPLOAD_ERROR, error: e.message });
      yield reject(e);
    }
  });
}

export default function* rootSaga() {
  yield all([fork(uploadFileRequest)]);
}
