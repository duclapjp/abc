import { all } from "redux-saga/effects";
import authSagas from "@iso/redux/auth/saga";
import accountSagas from "@iso/redux/account/saga";
import passwordHistorySagas from "@iso/redux/passwordHistory/saga";
import storeSagas from "@iso/redux/store/saga";
import chainSagas from "@iso/redux/chain/saga";
import storeAddEditSaga from "@iso/redux/storeAddEdit/saga";
import taskSaga from "@iso/redux/task/saga";
import contactSagas from "@iso/redux/contacts/saga";
import invoicesSagas from "@iso/redux/invoice/saga";
import mailSagas from "@iso/redux/mail/saga";
import notesSagas from "@iso/redux/notes/saga";
import todosSagas from "@iso/redux/todos/saga";
import ecommerceSaga from "@iso/redux/ecommerce/saga";
import cardsSagas from "@iso/redux/card/saga";
import chatSagas from "@iso/redux/chat/sagas";
import youtubeSearchSagas from "@iso/redux/youtubeSearch/sagas";
import githubSagas from "@iso/redux/githubSearch/sagas";
import articles from "@iso/redux/articles/sagas";
import investors from "@iso/redux/investors/sagas";
import scrumBoardSaga from "@iso/redux/scrumBoard/saga";
import profileSaga from "@iso/redux/profile/saga";
import quizSaga from "@iso/redux/quiz/saga";
import accountSettingSaga from "@iso/redux/accountSetting/saga";
import confirmEmailSaga from "@iso/redux/confirmEmail/saga";
import chainSettingSaga from "@iso/redux/chainSetting/saga";
import selectStoreSaga from "@iso/redux/selectStore/saga";
import taskAddEditSaga from "@iso/redux/taskAddEdit/saga";
import helpSaga from "@iso/redux/help/saga";
import notifySaga from "@iso/redux/notify/saga";
import dashboardSaga from "@iso/redux/dashboard/saga";
import uploadSaga from "@iso/redux/upload/saga";
import ganttChartSaga from "@iso/redux/ganttChart/saga";
import otaSaga from "@iso/redux/ota/saga";
import planAmountSaga from "@iso/redux/planAmount/saga";

export default function* rootSaga() {
  yield all([
    authSagas(),
    accountSagas(),
    passwordHistorySagas(),
    storeSagas(),
    chainSagas(),
    storeAddEditSaga(),
    taskSaga(),
    taskAddEditSaga(),
    helpSaga(),
    notifySaga(),
    dashboardSaga(),
    contactSagas(),
    mailSagas(),
    notesSagas(),
    todosSagas(),
    ecommerceSaga(),
    cardsSagas(),
    invoicesSagas(),
    chatSagas(),
    youtubeSearchSagas(),
    githubSagas(),
    articles(),
    investors(),
    scrumBoardSaga(),
    profileSaga(),
    quizSaga(),
    accountSettingSaga(),
    confirmEmailSaga(),
    chainSettingSaga(),
    selectStoreSaga(),
    uploadSaga(),
    ganttChartSaga(),
    otaSaga(),
    planAmountSaga(),
  ]);
}
