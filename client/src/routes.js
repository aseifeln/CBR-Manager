import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from "./pages/Dashboard"
import NewClientPage from "./pages/NewClientPage"
import NotFoundPage from "./pages/404"
import LoginPage from "./pages/LoginPage"
import ClientInfoPage from './pages/ClientInfo';

/**
* Reference:
* https://medium.com/better-programming/react-router-architecture-thats-simple-scalable-and-protected-da896827f946
*/
const ROUTES = [
  { path: '/', key: 'ROOT', exact: true, component: Dashboard },
  {
    path: '/client',
    key: 'CLIENT',
    component: RenderRoutes,
    routes: [
      {
        path: '/client/new',
        key: 'NEW_CLIENT',
        exact: true,
        component: NewClientPage
      }, {
        path: '/client/:id',
        key: 'CLIENT_INFO',
        exact: true,
        component: ClientInfoPage
      }
    ]
  },
  { path: "/login", key: "LOGIN", exact: true, component: LoginPage }
];

export default ROUTES;

/**
* Use this component for any new section of routes (any config object that has a "routes" property)
*/
export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={NotFoundPage} />
    </Switch>
  );
}

/**
* Render a route with potential sub routes
* https://reacttraining.com/react-router/web/example/route-config
*/
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  );
}