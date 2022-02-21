import { ROLES } from "@iso/constants/common.constant";

export const SELECT_ROLES_ADMIN = [
  ROLES.ADMIN,
  ROLES.SUBADMIN,
  ROLES.CHAIN,
  ROLES.STORE,
  ROLES.USER,
];
export const SELECT_ROLES_CHAIN = [ROLES.CHAIN, ROLES.STORE];
export const SELECT_ROLES_STORE = [ROLES.STORE];

export const SELECT_STATUS = ["利用中", "停止"];

export const SELECT_DISABLE_CHAIN = [ROLES.ADMIN, ROLES.USER, ROLES.SUBADMIN, ""];
export const SELECT_DISABLE_STORE = [
  ROLES.ADMIN,
  ROLES.CHAIN,
  ROLES.USER,
  ROLES.SUBADMIN,
  "",
];
export const INPUT_DISABLE_EMAIL = [ROLES.CHAIN, ROLES.STORE];

export const SELECT_CONTRACT_STATUS = ["契約中", "解約", "停止"];

export const SELECT_TASK_PRIORITY_LIST = {
  OPTIONS: ["高", "中", "低"],
  DEFAULT: "中",
};

export const TASK_STATUS_MAPPING_COLOR = {
  未着手: "#F0C3C0",
  作業中: "#ACC6DF",
  担当者確認中: "#ABCFDB",
  施設確認中: "#B8D9D3",
  保留: "#A7A7A7",
  処理済: "#C6C8D9",
  施設チェック中: "#F5A6B4",
  完了: "#D7DCAC",
  user: "transparent",
};

export const SELECT_TASK_STATUS_LIST = {
  OPTIONS: [
    "未着手",
    "作業中",
    "担当者確認中",
    "施設確認中",
    "保留",
    "処理済",
    "施設チェック中",
    "完了",
  ],
  OPTIONS_GANTT_CHART: [
    "未着手",
    "作業中",
    "担当者確認中",
    "施設確認中",
    "保留",
    "処理済",
    "施設チェック中",
  ],
  DEFAULT: "未着手",
  TASK_CHAIN_STORE_DEFAULT: "作業中",
  NOT_CLOSED: "完了以外",
  NOT_ASIGNEE_DROPDOWN: "全て",
};

export const TASK_DETAIL_LOG_TABLE_TYPE = {
  SUMMARY: "summary",
  DETAIL: "detail",
};
export const TASK_DETAIL_COMMENT_TYPE = {
  USER: "USER",
  STORE: "STORE",
};

export const TASK_STOP_WATCH = {
  ACTIONS: {
    STOP: "STOP",
    START: "START",
  },
  TYPES: {
    EXECUTE: "EXECUTE",
    CONFIRM: "CONFIRM",
  },
};

export const SELECT_TEMPLATE = {
  UNIT: ["円", "%"],
  RECEIVE: ["受入不可", "受入可"],
  INCREASE_DECREASE: ["+", "-"],
};
