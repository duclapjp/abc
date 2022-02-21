import React, { lazy, Suspense, memo } from "react";
import { map } from "lodash";
import { Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Loader from "@iso/components/utility/loader";
import { PUBLIC_ROUTE } from "@iso/route.constants";

const PlanAmountDefaultSettingRoutes = ({ url }) => {
  const routeNodes = map(routeConfig, (route, index) => (
    <Route
      path={`${url}/${route.path}`}
      exact={route.exact}
      key={index}
      component={route.component}
    />
  ));

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routeNodes}
        <Redirect to={PUBLIC_ROUTE.PAGE_404} />
      </Switch>
    </Suspense>
  );
};

const routeConfig = [
  {
    path: "",
    component: lazy(() => import("./DefaultPlans/DefaultPlans")),
    exact: true,
  },
  {
    path: "default-plans",
    component: lazy(() => import("./DefaultPlans/DefaultPlans")),
    exact: true,
  },
  {
    path: "default-plans/new",
    component: lazy(() => import("./DefaultPlanAddAndEdit/DefaultPlanAddAndEdit")),
    exact: true,
  },
  {
    path: "default-plans/edit/:planId",
    component: lazy(() => import("./DefaultPlanAddAndEdit/DefaultPlanAddAndEdit")),
    exact: true,
  },
  {
    path: "amount-rank",
    component: lazy(() => import("./AmountRank/AmountRank")),
    exact: true,
  },
  {
    path: "amount-groups",
    component: lazy(() => import("./AmountGroups/AmountGroups")),
    exact: true,
  },
  {
    path: "amount-groups/new",
    component: lazy(() => import("./AmountGroupAddEdit/AmountGroupAddEdit")),
    exact: true,
  },
  {
    path: "amount-groups/edit/:amountId",
    component: lazy(() => import("./AmountGroupAddEdit/AmountGroupAddEdit")),
    exact: true,
  },
];

PlanAmountDefaultSettingRoutes.propTypes = {
  url: PropTypes.string.isRequired,
};

export default memo(PlanAmountDefaultSettingRoutes);
