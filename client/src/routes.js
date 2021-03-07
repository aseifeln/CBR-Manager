import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import NewClientSignup from './pages/NewClientSignup';
import ClientListPage from './pages/ClientListPage';
import ClientInfoPage from './pages/ClientInfo';
import EditClientPage from './pages/EditClient';
import NotFoundPage from './pages/404';
import LoginPage from './pages/LoginPage'
import NewVisitPage from './pages/NewVisit'
import VisitInfoPage from './pages/VisitInfo'
import SignUpPage from './pages/SignUpPage'
import Home from './pages/Home';
import ReferralInfo from './pages/ReferralInfo';

/**
* Reference:
* https://medium.com/better-programming/react-router-architecture-thats-simple-scalable-and-protected-da896827f946
*/
const ROUTES = [
  { path: '/', key: 'ROOT', exact: true, component: LoginPage },
  {
    path: '/client',
    key: 'CLIENT',
    component: RenderRoutes,
    routes: [
      {
        path: '/client/new',
        key: 'NEW_CLIENT',
        exact: true,
        component: NewClientSignup
      }, {
        path: '/client/:id',
        key: 'CLIENT_INFO',
        exact: true,
        component: ClientInfoPage
      }, {
        path: '/client/:id/edit',
        key: 'EDIT_CLIENT',
        exact: true,
        component: EditClientPage
      }
    ]
  },
  { path: '/client-list', key: 'CLIENT_LIST', exact: true, component: ClientListPage},
  { path: '/dashboard', key: 'DASHBOARD', exact: true, component: Dashboard },
  {
    path: '/visit',
    key: 'VISIT',
    component: RenderRoutes,
    routes: [
      {
        path: '/visit/new/:id',
        key: 'NEW_VISIT',
        exact: true,
        component: NewVisitPage
      },
      {
        path: '/visit/:id',
        key: 'VISIT_INFO',
        exact: true,
        component: VisitInfoPage
      }
    ]
  },
  { path: '/signup', key: 'SIGNUP', exact: true, component: SignUpPage },
  { path: '/home', key:'HOME', exact: true, component: Home },
  {path: '/referral', key:'REFERRAL', exact: true, component: ReferralInfo}
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