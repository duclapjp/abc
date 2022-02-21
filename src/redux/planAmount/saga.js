import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import _ from "lodash";

import { planAmountService } from "@iso/services";

import actions from "./actions";

function* getAmountRank() {
  yield takeEvery(actions.AMOUNT_RANK_GET_DATA_REQUEST, function* () {
    try {
      const amountRank = yield call(planAmountService.getAmountRank);
      yield put({
        type: actions.AMOUNT_RANK_GET_DATA_SUCCESS,
        amountRank: amountRank,
      });
    } catch (e) {
      yield put({ type: actions.AMOUNT_RANK_GET_DATA_ERROR, error: e.response });
    }
  });
}

function* getTaskTemplates() {
  yield takeEvery(actions.GET_TASK_TEMPLATES_REQUEST, function* () {
    try {
      const items = yield call(planAmountService.fetchTaskTemplates);
      yield put({
        type: actions.GET_TASK_TEMPLATES_SUCCESS,
        items: items ? items.rows : [],
      });
    } catch (error) {
      yield put({
        type: actions.GET_TASK_TEMPLATES_ERROR,
        error: error.response,
      });
    }
  });
}

function* updateAmountRank() {
  yield takeEvery(actions.AMOUNT_RANK_UPDATE_DATA_REQUEST, function* ({ payload }) {
    const { data, resolve, reject } = payload;
    try {
      yield call(planAmountService.updateAmountRank, { data });
      const amountRank = yield call(planAmountService.getAmountRank);
      yield put({
        type: actions.AMOUNT_RANK_UPDATE_DATA_SUCCESS,
        amountRank: amountRank,
      });
      resolve();
    } catch (e) {
      yield put({ type: actions.AMOUNT_RANK_UPDATE_DATA_ERROR, error: e.response });
      reject();
    }
  });
}

function* getDefaultPlans() {
  yield takeEvery(actions.GET_DEFAULT_PLANS_REQUEST, function* () {
    try {
      const defaultPlans = yield call(planAmountService.fetchDefaultPlans);
      yield put({
        type: actions.GET_DEFAULT_PLANS_SUCCESS,
        defaultPlans: { rows: _.get(defaultPlans, "rows") || [] },
      });
    } catch (error) {
      yield put({
        type: actions.GET_DEFAULT_PLANS_ERROR,
        error: error.response,
      });
    }
  });
}

function* getAmountGroupData() {
  yield takeEvery(actions.AMOUNT_GROUP_GET_DATA_REQUEST, function* () {
    try {
      const amountGroups = yield call(planAmountService.getAmountGroups);
      yield put({
        type: actions.AMOUNT_GROUP_GET_DATA_SUCCESS,
        amountGroups: amountGroups,
      });
    } catch (e) {
      yield put({
        type: actions.AMOUNT_GROUP_GET_DATA_ERROR,
        error: e.response,
      });
    }
  });
}

function* getDefaultPlan() {
  yield takeEvery(actions.GET_DEFAULT_PLAN_REQUEST, function* ({ payload }) {
    const { ...data } = payload;
    try {
      const defaultPlan = yield call(planAmountService.fetchDefaultPlan, {
        ...data,
      });
      yield put({
        type: actions.GET_DEFAULT_PLAN_SUCCESS,
        defaultPlan,
      });
    } catch (error) {
      yield put({
        type: actions.GET_DEFAULT_PLAN_ERROR,
        error: error.response,
      });
    }
  });
}

function* updateAmountGroups() {
  yield takeEvery(actions.AMOUNT_GROUP_UPDATE_DATA_REQUEST, function* ({ payload }) {
    const { data, resolve, reject } = payload;
    try {
      const amountGroups = yield call(planAmountService.updateAmountGroups, {
        data,
      });
      yield put({
        type: actions.AMOUNT_GROUP_UPDATE_DATA_SUCCESS,
        amountGroups: amountGroups,
      });
      resolve();
    } catch (e) {
      yield put({
        type: actions.AMOUNT_GROUP_UPDATE_DATA_ERROR,
        error: e.response,
      });
      reject();
    }
  });
}

function* createDefaultPlan() {
  yield takeEvery(actions.CREATE_DEFAULT_PLAN_REQUEST, function* ({ payload }) {
    const { resolve, reject, ...data } = payload;
    try {
      yield call(planAmountService.createDefaultPlan, {
        ...data,
      });
      yield put({
        type: actions.CREATE_DEFAULT_PLAN_SUCCESS,
      });
      resolve();
    } catch (error) {
      yield put({
        type: actions.CREATE_DEFAULT_PLAN_ERROR,
        error: error.response,
      });
      reject();
    }
  });
}
function* getAmountItemEdit() {
  yield takeEvery(actions.AMOUNT_GROUP_GET_ITEM_REQUEST, function* ({ payload }) {
    const { id } = payload;
    try {
      const itemEditing = yield call(planAmountService.getAmountItemEdit, {
        id,
      });
      yield put({
        type: actions.AMOUNT_GROUP_GET_ITEM_SUCCESS,
        itemEditing: itemEditing,
      });
    } catch (e) {
      yield put({
        type: actions.AMOUNT_GROUP_GET_DATA_ERROR,
        error: e.response,
      });
    }
  });
}

function* updateDefaultPlan() {
  yield takeEvery(actions.UPDATE_DEFAULT_PLAN_REQUEST, function* ({ payload }) {
    const { resolve, reject, ...data } = payload;
    try {
      yield call(planAmountService.updateDefaultPlan, {
        ...data,
      });
      yield put({
        type: actions.UPDATE_DEFAULT_PLAN_SUCCESS,
      });
      resolve();
    } catch (error) {
      yield put({
        type: actions.UPDATE_DEFAULT_PLAN_ERROR,
        error: error.response,
      });
      reject();
    }
  });
}

function* addEditAmountGroup() {
  yield takeEvery(actions.AMOUNT_GROUP_ADD_EDIT_DATA_REQUEST, function* ({
    payload,
  }) {
    const { data, resolve, reject } = payload;
    try {
      const amountGroup = yield call(planAmountService.addEditAmountGroup, {
        data,
      });
      yield put({
        type: actions.AMOUNT_GROUP_ADD_EDIT_DATA_SUCCESS,
        amountGroup: amountGroup,
      });
      resolve();
    } catch (e) {
      yield put({
        type: actions.AMOUNT_GROUP_ADD_EDIT_DATA_ERROR,
        error: e.response,
      });
      reject();
    }
  });
}

function* reOrderPlan() {
  yield takeEvery(actions.REORDER_PLAN_REQUEST, function* ({ payload }) {
    const { plans, resolve, reject } = payload;
    try {
      yield call(planAmountService.reOrderPlan, { plans });
      const defaultPlans = yield call(planAmountService.fetchDefaultPlans);
      yield put({ type: actions.REORDER_PLAN_SUCCESS, defaultPlans });
      resolve();
    } catch (error) {
      yield put({
        type: actions.REORDER_PLAN_ERROR,
        error: error.response,
      });
      reject();
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getAmountRank),
    fork(updateAmountRank),
    fork(getTaskTemplates),
    fork(getDefaultPlans),
    fork(getDefaultPlan),
    fork(createDefaultPlan),
    fork(updateDefaultPlan),
    fork(reOrderPlan),
    fork(getAmountGroupData),
    fork(getAmountItemEdit),
    fork(updateAmountGroups),
    fork(addEditAmountGroup),
  ]);
}
