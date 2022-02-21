import { combineReducers } from "redux";

import Mails from "@iso/redux/mail/reducer";
import Calendar from "@iso/redux/calendar/reducer";
import Box from "@iso/redux/box/reducer";
import Notes from "@iso/redux/notes/reducer";
import Todos from "@iso/redux/todos/reducer";
import Contacts from "@iso/redux/contacts/reducer";
import Cards from "@iso/redux/card/reducer";
import Chat from "@iso/redux/chat/reducers";
import DynamicChartComponent from "@iso/redux/dynamicEchart/reducer";
import Ecommerce from "@iso/redux/ecommerce/reducer";
import Invoices from "@iso/redux/invoice/reducer";
import YoutubeSearch from "@iso/redux/youtubeSearch/reducers";
import Articles from "@iso/redux/articles/reducers";
import Investors from "@iso/redux/investors/reducers";
import scrumBoard from "@iso/redux/scrumBoard/reducer";
import drawer from "@iso/redux/drawer/reducer";
import modal from "@iso/redux/modal/reducer";
import profile from "@iso/redux/profile/reducer";
import githubSearch from "@iso/redux/githubSearch/reducers";
import quiz from "@iso/redux/quiz/reducer";

import App from "@iso/redux/app/reducer";
import Auth from "@iso/redux/auth/reducer";
import Account from "@iso/redux/account/reducer";
import PasswordHistory from "@iso/redux/passwordHistory/reducer";
import AccountSetting from "@iso/redux/accountSetting/reducer";
import StoreAddEdit from "@iso/redux/storeAddEdit/reducer";
import ConfirmEmail from "@iso/redux/confirmEmail/reducer";
import ThemeSwitcher from "@iso/redux/themeSwitcher/reducer";
import LanguageSwitcher from "@iso/redux/languageSwitcher/reducer";
import ChainSetting from "@iso/redux/chainSetting/reducer";
import Store from "@iso/redux/store/reducer";
import Chain from "@iso/redux/chain/reducer";
import Task from "@iso/redux/task/reducer";
import SelectStore from "@iso/redux/selectStore/reducer";
import TaskAddEdit from "@iso/redux/taskAddEdit/reducer";
import Help from "@iso/redux/help/reducer";
import Notify from "@iso/redux/notify/reducer";
import Dashboard from "@iso/redux/dashboard/reducer";
import Upload from "@iso/redux/upload/reducer";
import GanttChart from "@iso/redux/ganttChart/reducer";
import OTA from "@iso/redux/ota/reducer";
import PlanAmount from "@iso/redux/planAmount/reducer";

export default combineReducers({
  Auth,
  App,
  AccountSetting,
  Account,
  PasswordHistory,
  StoreAddEdit,
  ConfirmEmail,
  Chain,
  ThemeSwitcher,
  LanguageSwitcher,
  ChainSetting,
  Store,
  Task,
  SelectStore,
  TaskAddEdit,
  Help,
  Notify,
  Dashboard,
  Upload,
  GanttChart,
  OTA,
  PlanAmount,

  Mails,
  Calendar,
  Box,
  Notes,
  Todos,
  Contacts,
  Cards,
  Chat,
  DynamicChartComponent,
  Ecommerce,
  Invoices,
  YoutubeSearch,
  Articles,
  Investors,
  scrumBoard,
  modal,
  drawer,
  profile,
  githubSearch,
  quiz,
});
