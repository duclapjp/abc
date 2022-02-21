import { lazy } from "react";

import { ROLES } from "@iso/constants/common.constant";

export const commonRoutes = [
  {
    path: "",
    component: lazy(() => import("@iso/containers/HomePage/HomePage")),
    exact: true,
  },
  {
    path: "home",
    component: lazy(() => import("@iso/containers/HomePage/HomePage")),
    exact: true,
  },
  {
    path: "account-setting",
    component: lazy(() => import("@iso/containers/AccountSetting/AccountSetting")),
    exact: true,
  },
  {
    path: "account-list",
    component: lazy(() => import("@iso/containers/AccountList/AccountList")),
    exact: true,
    roleIgnoge: [ROLES.USER, ROLES.SUBADMIN],
  },
  {
    path: "account-list/new",
    component: lazy(() =>
      import("@iso/containers/AccountAddAndEdit/AccountAddAndEdit")
    ),
    exact: true,
  },
  {
    path: "account-list/:accountId",
    component: lazy(() =>
      import("@iso/containers/AccountAddAndEdit/AccountAddAndEdit")
    ),
    exact: true,
  },
  {
    path: "chain-setting",
    component: lazy(() => import("@iso/containers/ChainSetting/ChainSetting")),
    exact: true,
    roleIgnoge: [ROLES.USER, ROLES.STORE, ROLES.ADMIN, ROLES.SUBADMIN],
  },
  {
    path: "stores",
    component: lazy(() => import("@iso/containers/Stores/Stores")),
    exact: true,
    roleIgnoge: [ROLES.STORE],
  },
  {
    path: "chains",
    component: lazy(() => import("@iso/containers/Chains/Chains")),
    exact: true,
    roleIgnoge: [ROLES.CHAIN, ROLES.STORE, ROLES.USER],
  },
  {
    path: "stores/new",
    component: lazy(() => import("@iso/containers/StoreAddAndEdit/StoreAddAndEdit")),
    exact: true,
    roleIgnoge: [ROLES.CHAIN, ROLES.STORE, ROLES.USER],
  },
  {
    path: "stores/edit/:storeId",
    component: lazy(() => import("@iso/containers/StoreAddAndEdit/StoreAddAndEdit")),
    exact: false,
    roleIgnoge: [ROLES.STORE],
  },
  {
    path: "store-setting",
    component: lazy(() => import("@iso/containers/StoreAddAndEdit/StoreAddAndEdit")),
    exact: false,
    roleIgnoge: [ROLES.ADMIN, ROLES.CHAIN, ROLES.USER, ROLES.SUBADMIN],
  },
  {
    path: "chains/new",
    component: lazy(() => import("@iso/containers/ChainAddAndEdit/ChainAddAndEdit")),
    exact: true,
    roleIgnoge: [ROLES.CHAIN, ROLES.STORE, ROLES.USER],
  },
  {
    path: "chains/:chainId",
    component: lazy(() => import("@iso/containers/ChainAddAndEdit/ChainAddAndEdit")),
    exact: true,
    roleIgnoge: [ROLES.CHAIN, ROLES.STORE, ROLES.USER],
  },
  {
    path: "tasks",
    component: lazy(() => import("@iso/containers/Tasks/Tasks")),
    exact: true,
  },
  {
    path: "tasks/new",
    component: lazy(() => import("@iso/containers/TaskAddAndEdit/TaskAddAndEdit")),
    exact: true,
    roleIgnoge: [ROLES.USER],
  },
  {
    path: "tasks/edit/:taskId",
    component: lazy(() => import("@iso/containers/TaskAddAndEdit/TaskAddAndEdit")),
    exact: true,
    roleIgnoge: [],
  },
  {
    path: "help",
    component: lazy(() => import("@iso/containers/Help/Help")),
    exact: true,
    roleIgnoge: [ROLES.ADMIN, ROLES.USER, ROLES.SUBADMIN],
  },
  {
    path: "tasklogs",
    component: lazy(() => import("@iso/containers/TaskLog")),
    exact: true,
    roleIgnoge: [ROLES.STORE, ROLES.USER, ROLES.CHAIN],
  },
  {
    path: "tasklogs/tasks",
    component: lazy(() => import("@iso/containers/TaskLog/TaskLogItem")),
    exact: true,
    roleIgnoge: [ROLES.STORE, ROLES.USER, ROLES.CHAIN],
  },
  {
    path: "manual-upload",
    component: lazy(() => import("@iso/containers/ManualUpload/ManualUpload")),
    exact: true,
    roleIgnoge: [ROLES.CHAIN, ROLES.STORE, ROLES.USER],
  },
  {
    path: "gantt-chart",
    component: lazy(() => import("@iso/containers/GanttChart/GanttChart")),
    exact: true,
    roleIgnoge: [ROLES.CHAIN, ROLES.STORE],
  },
  {
    path: "otas",
    component: lazy(() => import("@iso/containers/OTAList/OtaList")),
    exact: true,
    roleIgnoge: [ROLES.CHAIN, ROLES.STORE, ROLES.USER],
  },
  {
    path: "otas/new",
    component: lazy(() => import("@iso/containers/OTAAddAndEdit/OTAAddAndEdit")),
    exact: true,
    roleIgnoge: [ROLES.CHAIN, ROLES.STORE, ROLES.USER],
  },
  {
    path: "otas/edit/:otaId",
    component: lazy(() => import("@iso/containers/OTAAddAndEdit/OTAAddAndEdit")),
    exact: true,
    roleIgnoge: [ROLES.CHAIN, ROLES.STORE, ROLES.USER],
  },
  {
    path: "plan-amount-default-setting",
    component: lazy(() =>
      import("@iso/containers/PlanAmountDefaultSetting/PlanAmountDefaultSetting")
    ),
    roleIgnoge: [ROLES.USER, ROLES.ADMIN, ROLES.SUBADMIN, ROLES.CHAIN],
  },
];

export const loginStoreRoute = [
  {
    path: "/store/dashboard/login-store/:storeId",
    component: lazy(() => import("@iso/containers/ChainLoginStore/ChainLoginStore")),
    exact: true,
  },
  {
    path: "/chain/dashboard/login-store/:storeId",
    component: lazy(() => import("@iso/containers/ChainLoginStore/ChainLoginStore")),
    exact: true,
  },
];

export const getRoutesForRole = (role) => {
  if (
    !role ||
    ![ROLES.ADMIN, ROLES.STORE, ROLES.USER, ROLES.CHAIN, ROLES.SUBADMIN].includes(
      role
    )
  ) {
    return [];
  }
  return commonRoutes.filter(
    (item) => !item.roleIgnoge || !item.roleIgnoge.includes(role)
  );
};
