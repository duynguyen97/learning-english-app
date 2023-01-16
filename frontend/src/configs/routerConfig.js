import React from 'react';
import { Route } from 'react-router';
const { ROUTES } = require('../constant');
const HomePage = React.lazy(() => import('pages/Home'));
const LoginPage = React.lazy(() => import('pages/Login'));
const RegisterPage = React.lazy(() => import('pages/Register'));

// routes for app
const routes = [
  {
    path: ROUTES.HOME,
    isProtect: false,
    component: <HomePage />,
  },
  {
    path: ROUTES.LOGIN,
    isProtect: false,
    component: <LoginPage />,
  },
  {
    path: ROUTES.REGISTER,
    isProtect: false,
    component: <RegisterPage />,
  },
];

const renderRoutes = (routes, isAuth = false) => {
  return routes.map((route, index) => {
    const { path, component, isProtect } = route;
    const loginComponent = () => <LoginPage />;
    const componentRender = !isProtect ? component : isAuth ? component : loginComponent;

    return <Route path={path} key={index} element={componentRender} />;
  });
};

const routersConfig = {
  routes,
  renderRoutes,
};
export default routersConfig;
