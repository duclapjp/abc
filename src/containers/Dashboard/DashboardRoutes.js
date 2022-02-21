import React, { Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, useRouteMatch, Switch, Redirect } from "react-router-dom";
import Loader from "@iso/components/utility/loader";
import appActions from "@iso/redux/app/actions";
import { PUBLIC_ROUTE } from "../../route.constants";
import templateRoutes from "./routes/template-routes";
import { getRoutesForRole, loginStoreRoute } from "./routes/routes-config";

const ChildComponent = ({ route }) => {
  const dispatch = useDispatch();
  dispatch(appActions.changeCurrent([route.path]));
  return <route.component />;
};

export default function AppRouter() {
  const { url } = useRouteMatch();
  const { user = {} } = useSelector((state) => state.Auth);
  if (!user) {
    return null;
  }
  const routes = getRoutesForRole(user.role);
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
            <ChildComponent route={route} />
          </Route>
        ))}
        {loginStoreRoute.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${route.path}`}>
            <ChildComponent route={route} />
          </Route>
        ))}
        {process.env.NODE_ENV === "development" &&
          templateRoutes.map((route, idx) => (
            <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
              <route.component />
            </Route>
          ))}
        <Redirect to={PUBLIC_ROUTE.PAGE_404} />
      </Switch>
    </Suspense>
  );
}
