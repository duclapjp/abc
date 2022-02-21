import { all, takeEvery, fork, call, put } from "redux-saga/effects";
import { get } from "lodash";

import { chainService, storeService } from "@iso/services";
import actions from "./actions";

function* getChainOptions() {
  yield takeEvery(actions.CHAIN_OPTIONS_REQUEST, function* () {
    try {
      const chainResponse = yield call(chainService.getChainOptions);
      yield put({
        type: actions.CHAIN_OPTIONS_SUCCESS,
        chainOptions: get(chainResponse, "chains", []),
      });
    } catch (e) {
      yield put({ type: actions.CHAIN_OPTIONS_ERROR });
    }
  });
}

function* getChainMetadata() {
  yield takeEvery(actions.CHAIN_METADATA_REQUEST, function* ({ payload }) {
    const { filter, chainId } = payload;
    try {
      const promiseAll = () =>
        Promise.all([
          chainService.getChainOptions(),
          storeService.getStoreOptions({ filter, chainId }),
          chainService.getDirectionOptions(),
        ]);
      const [chainResponse, storeResponse, accountResponse] = yield call(promiseAll);
      yield put({
        type: actions.CHAIN_METADATA_SUCCESS,
        chainOptions: get(chainResponse, "chains", []),
        storeOptions: get(storeResponse, "stores", []),
        directorOptions: get(accountResponse, "accounts", []),
      });
    } catch (e) {
      yield put({ type: actions.CHAIN_METADATA_ERROR });
    }
  });
}

function* getChains() {
  yield takeEvery(actions.CHAINS_REQUEST, function* ({ payload }) {
    const { page, size, contractStatus, chainId, searchKeyword } = payload;
    try {
      const chainResponse = yield call(chainService.searchChains, {
        page,
        size,
        contractStatus,
        searchKeyword,
        chainId,
      });
      yield put({
        type: actions.CHAINS_SUCCESS,
        chains: get(chainResponse, "chains", []),
        total: get(chainResponse, "total", 1),
      });
    } catch (e) {
      yield put({ type: actions.CHAINS_ERROR, message: e.message });
    }
  });
}

function* getChain() {
  yield takeEvery(actions.CHAIN_REQUEST, function* ({ payload }) {
    const { id } = payload;
    try {
      const chain = yield call(chainService.getChain, { id });
      chain["storeIds"] = chain["stores"].map((store) => store.storeId);
      yield put({
        type: actions.CHAIN_SUCCESS,
        chain: chain || {},
      });
    } catch (e) {
      yield put({ type: actions.CHAIN_ERROR });
    }
  });
}

function* createChain() {
  yield takeEvery(actions.ADD_CHAIN_REQUEST, function* ({ payload }) {
    const {
      contractStatus,
      name,
      directorId1,
      directorId2,
      directorId3,
      managerMail,
      note,
      storeIds,
      resolve,
      reject,
    } = payload;
    try {
      yield call(chainService.createChain, {
        contractStatus,
        name,
        directorId1,
        directorId2,
        directorId3,
        managerMail,
        note,
        storeIds,
      });
      yield put({ type: actions.ADD_CHAIN_SUCCESS });
      yield resolve();
    } catch (e) {
      yield put({ type: actions.ADD_CHAIN_ERROR });
      yield reject();
    }
  });
}

function* updateChain() {
  yield takeEvery(actions.EDIT_CHAIN_REQUEST, function* ({ payload }) {
    const {
      id,
      contractStatus,
      name,
      directorId1,
      directorId2,
      directorId3,
      managerMail,
      note,
      storeIds = [],
      previousStoreIds = [],
      resolve,
      reject,
    } = payload;
    const addStoreIds = storeIds.filter((id) => !!id).map((id) => +id);
    try {
      const chain = yield call(chainService.updateChain, {
        id,
        contractStatus,
        name,
        directorId1,
        directorId2,
        directorId3,
        managerMail,
        note,
        delStoreIds: previousStoreIds.filter((o) => addStoreIds.indexOf(o) === -1),
        addStoreIds: addStoreIds,
      });
      chain["storeIds"] = chain["stores"].map((store) => store.storeId);
      yield put({
        type: actions.EDIT_CHAIN_SUCCESS,
        chain: chain,
      });
      yield resolve(chain);
    } catch (e) {
      yield put({ type: actions.EDIT_CHAIN_ERROR });
      yield reject();
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getChainOptions)]);
  yield all([fork(getChainMetadata)]);
  yield all([fork(getChains)]);
  yield all([fork(getChain)]);
  yield all([fork(createChain)]);
  yield all([fork(updateChain)]);
}
