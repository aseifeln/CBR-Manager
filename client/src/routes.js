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
import Logout from './pages/Logout';
import Home from './pages/Home';
import ReferralInfo from './pages/ReferralInfo';
import AdminDashboard from './pages/AdminDashboard';
import AdminInsights from './pages/AdminInsights';
import WorkerListPage from './pages/WorkerListPage';
import WorkerInfo from './pages/WorkerInfo';
import NewReferral from './pages/NewReferral';

/**
* Reference:
* https://medium.com/better-programming/react-router-architecture-thats-simple-scalable-and-protected-da896827f946
*/
const ROUTES = [
  { path: '/', key:'ROOT', exact: true, component: Home },
  { path: '/login', key: 'LOGIN', exact: true, component: LoginPage },
  { path: '/logout', key: 'LOGOUT', exact: true, component: Logout },
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
        path: '/visit/new',
        key: 'NEW_VISIT',
        exact: true,
        component: NewVisitPage
      },
      {
        path: '/visit/new/:id',
        key: 'NEW_VISIT_WITH_ID',
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
  {
    path: '/admin',
    key: 'ADMIN',
    component: RenderRoutes,
    routes: [
      {
        path: '/admin/dashboard',
        key: 'ADMIN_DASHBOARD',
        exact: true,
        component: AdminDashboard
      },
      {
        path: '/admin/insights',
        key: 'ADMIN_INSIGHTS',
        exact: true,
        component: AdminInsights
      },
      {
        path: '/admin/worker-list',
        key: 'WORKER_LIST',
        exact: true,
        component: WorkerListPage
      },
      {
        path: '/admin/worker/:id',
        key: 'WORKER_INFO',
        exact: true,
        component: WorkerInfo
      }
    ]
  },
  {
    path: '/referral',
    key: 'REFERRAL',
    component: RenderRoutes,
    routes: [
      {
        path: '/referral/new/',
        key: 'NEW_REFERRAL',
        exact: true,
        component: NewReferral
      },
      {
        path: '/referral/new/:id',
        key: 'NEW_REFERRAL_WITH_ID',
        exact: true,
        component: NewReferral
      },
      {
        path:'/referral/:id',
        key:'REFERRAL_INFO',
        exact:true,
        component: ReferralInfo
      }
    ]
  },
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