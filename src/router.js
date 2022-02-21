import React, { lazy, Suspense } from "react";
import { Route, Redirect, BrowserRouter as Router, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import ErrorBoundary from "./ErrorBoundary";
import { PUBLIC_ROUTE, PRIVATE_ROUTE } from "./route.constants";
import Loader from "@iso/components/utility/loader";

const Dashboard = lazy(() => import("@iso/containers/Dashboard/Dashboard"));

const commonRoutes = [
  {
    path: PUBLIC_ROUTE.PAGE_404,
    component: lazy(() => import("@iso/containers/404/404")),
  },
  {
    path: PUBLIC_ROUTE.PAGE_500,
    component: lazy(() => import("@iso/containers/500/500")),
  },
  {
    path: PUBLIC_ROUTE.CONFIRM_EMAIL,
    component: lazy(() => import("@iso/containers/ConfirmEmail/ConfirmEmail")),
  },
];

const publicRoutes = [
  {
    path: PUBLIC_ROUTE.LANDING,
    exact: true,
    component: lazy(() => import("@iso/containers/SignIn/SignIn")),
  },
  {
    path: PUBLIC_ROUTE.FORGET_PASSWORD,
    component: lazy(() => import("@iso/containers/ForgotPassword/ForgotPassword")),
  },
  {
    path: PUBLIC_ROUTE.RESET_PASSWORD,
    component: lazy(() => import("@iso/containers/ResetPassword/ResetPassword")),
  },
];

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = useSelector((state) => state.Auth.idToken);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!isLoggedIn) {
          return (
            <Redirect
              to={{
                pathname: PUBLIC_ROUTE.LANDING,
                state: { from: location },
              }}
            />
          );
        }

        return children;
      }}
    />
  );
}

function PublicRoute({ children, ...rest }) {
  const { idToken, dashboardRoute } = useSelector((state) => state.Auth);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (idToken) {
          return (
            <Redirect
              to={{
                pathname: dashboardRoute,
                state: { from: location },
              }}
            />
          );
        }
        return children;
      }}
    />
  );
}

export default function Routes() {
  const { checkAuth } = useSelector((state) => state.Auth);
  if (checkAuth) {
    return <Loader />;
  }
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            {commonRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}
            <PrivateRoute path={PRIVATE_ROUTE.DASHBOARD}>
              <Dashboard />
            </PrivateRoute>
            {publicRoutes.map((route, index) => (
              <PublicRoute key={index} path={route.path} exact={route.exact}>
                <route.component />
              </PublicRoute>
            ))}
            <Redirect to={PUBLIC_ROUTE.PAGE_404} />
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
