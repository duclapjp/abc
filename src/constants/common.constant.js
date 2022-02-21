export const ROLES = {
  ADMIN: "ROLE_ADMIN",
  SUBADMIN: "ROLE_SUBADMIN",
  USER: "ROLE_USER",
  CHAIN: "ROLE_CHAIN",
  STORE: "ROLE_STORE",
};

export const ROLES_MAPPING_ROUTER = {
  ROLE_ADMIN: "admin",
  ROLE_SUBADMIN: "sub_admin",
  ROLE_USER: "user",
  ROLE_CHAIN: "chain",
  ROLE_STORE: "store",
};

export const ACCESS_TOKEN_KEY = "accesstoken";

export const ERROR_STATUS = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  NOT_AUTHENTICATION: 401,
  Forbidden: 403,
  NotFound: 404,
  GeneralServerRrror: 500,
  Unavailable: 503,
};

export const ERROR_MESSAGES = {
  ERROR_LOGIN_POST_USERINACTIVE: "ERROR-LOGIN-POST-USERINACTIVE",
};

export const DATE_FORMAT = "YYYY/MM/DD";
export const GANTT_CHART_DATE_FORMAT = "YYYY-MM-DD";
export const TIME_JAPAN_FORMAT = "YYYY年MM月DD日, HH:mm:ss";
export const IMAGE_FILE_TYPE_PRE = "image/";
export const MAX_TOTAL_FILE_SIZE = 10000000; // 10Mb
export const MAX_MANUAL_FILE_SIZE = 100000000; // 100Mb
export const TIMEZONE_JAPAN = "Asia/Tokyo";
export const DATE_TIME_FORMAT = "YYYY/MM/DD HH:mm:ss";
export const TIME_FORMAT = "HH:mm:ss";
export const HOUR_MINUTES_FORMAT = "HH:mm";

export const NOTIFY = {
  CHANGE_OTA: "パスワード変更しました",
};

export const KEYS = {
  TODAY: "TODAY",
  YESTERDAY: "YESTERDAY",
  MORE: "MORE",
};

export const OTA_STATUS = {
  ENABLED: "ENABLED",
  DISABLED: "DISABLED",
};

export const ONE_DAY_MILISECOND = 1000 * 60 * 60 * 24;

export const X_REQUESTED_STOREID = "X-Requested-StoreId";

export const OTA_FIELD_NAME = "ITEMID10010";
export const AVAILABLE_FIELD_NAME = "ITEMID10014";
export const POST_TIME_FIELD_NAME = "ITEMID10015";
export const TARGET_PLAN_FIELD_NAME = "ITEMID10079";

export const PLANID_VISIBLE_TARGET_PLAN = [10001, 10002];

export const ITEM_CATEGORY_PLAN_IGNORE = [10030];

export const otaValues = {
  じゃらん: "JARAN_TAB",
  楽天: "RAKUTEN_TAB",
  るるぶ: "RURUBU_TAB",
  予約プロ: "YOYAKU_PRO_TAB",
  一休: "IKKYU_TAB",
  ダイレクトイン: "DAIREKUTOIN_TAB",
};

export const otaNames = [
  "JARAN_TAB",
  "RAKUTEN_TAB",
  "RURUBU_TAB",
  "YOYAKU_PRO_TAB",
  "IKKYU_TAB",
  "DAIREKUTOIN_TAB",
];
