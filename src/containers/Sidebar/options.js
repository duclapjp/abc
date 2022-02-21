import { ROLES } from "@iso/constants/common.constant";

export const optionsConfig = [
  {
    key: "home",
    label: "forms.progressBar.dashboardTitle",
    leftIcon: "ion-android-home",
    roleIgnoge: [],
  },
  {
    key: "tasks",
    label: "sidebar.tasks",
    leftIcon: "ion-document-text",
  },
  {
    key: "tasks/new",
    label: "sidebar.addTask",
    leftIcon: "ion-ios-compose",
    roleIgnoge: [ROLES.USER],
  },
  {
    key: "plan-amount-default-setting",
    label: "sidebar.planAmountDefaultSetting",
    leftIcon: "ion-social-yen",
    roleIgnoge: [ROLES.USER, ROLES.ADMIN, ROLES.SUBADMIN, ROLES.CHAIN],
  },
  {
    key: "gantt-chart",
    label: "sidebar.ganttChart",
    leftIcon: "ion-pie-graph",
    roleIgnoge: [ROLES.CHAIN, ROLES.STORE],
  },
  {
    key: "tasklogs",
    label: "sidebar.taskLog",
    leftIcon: "ion-ios-alarm",
    roleIgnoge: [ROLES.USER, ROLES.STORE, ROLES.CHAIN],
  },
  {
    key: "stores",
    label: "sidebar.storeList",
    leftIcon: "ion-ios-box",
    roleIgnoge: [ROLES.STORE],
  },
  {
    key: "store-setting",
    label: "sidebar.storeSetting",
    leftIcon: "ion-android-settings",
    roleIgnoge: [ROLES.USER, ROLES.CHAIN, ROLES.ADMIN, ROLES.SUBADMIN],
  },
  {
    key: "chains",
    label: "sidebar.chains",
    leftIcon: "ion-link",
    roleIgnoge: [ROLES.USER, ROLES.STORE, ROLES.CHAIN],
  },
  {
    key: "chain-setting",
    label: "sidebar.chainSetting",
    leftIcon: "ion-android-settings",
    roleIgnoge: [ROLES.USER, ROLES.STORE, ROLES.ADMIN, ROLES.SUBADMIN],
  },
  {
    key: "account-list",
    label: "sidebar.accountList",
    leftIcon: "ion-android-person-add",
    roleIgnoge: [ROLES.USER, ROLES.SUBADMIN],
  },
  {
    key: "otas",
    label: "page.otaList.title",
    leftIcon: "ion-cube",
    roleIgnoge: [ROLES.CHAIN, ROLES.STORE, ROLES.USER],
  },
  {
    key: "manual-upload",
    label: "sidebar.manualUpload",
    leftIcon: "ion-upload",
    roleIgnoge: [ROLES.CHAIN, ROLES.STORE, ROLES.USER],
  },
  {
    key: "account-setting",
    label: "sidebar.accountSetting",
    leftIcon: "ion-person",
    roleIgnoge: [],
  },
  {
    key: "help",
    label: "sidebar.help",
    leftIcon: "ion-help-circled",
    roleIgnoge: [ROLES.USER, ROLES.ADMIN, ROLES.SUBADMIN],
  },
];

export const getOptionsForRole = (role) => {
  if (
    !role ||
    ![ROLES.ADMIN, ROLES.STORE, ROLES.USER, ROLES.CHAIN, ROLES.SUBADMIN].includes(
      role
    )
  ) {
    return [];
  }
  return optionsConfig.filter(
    (item) => !item.roleIgnoge || !item.roleIgnoge.includes(role)
  );
};
