import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router';
const { ROUTES } = require('../constant');
const HomePage = React.lazy(() => import('pages/Home'));
const LoginPage = React.lazy(() => import('pages/Login'));
const LogoutPage = React.lazy(() => import('pages/Logout'));
const RegisterPage = React.lazy(() => import('pages/Register'));
const WordPage = React.lazy(() => import('pages/Word'));
const FlashcardPage = React.lazy(() => import('pages/Flashcard'));

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
    path: ROUTES.LOGOUT,
    isProtect: false,
    component: <LogoutPage />,
  },
  {
    path: ROUTES.REGISTER,
    isProtect: false,
    component: <RegisterPage />,
  },
  {
    path: ROUTES.WORD,
    isProtect: true,
    component: <WordPage />,
  },
  {
    path: ROUTES.FLASHCARD,
    isProtect: true,
    component: <FlashcardPage />,
  },
];

const renderRoutes = (routes, isAuth = false) => {
  const protectRoutes = routes.filter((route) => route.isProtect);
  const publicRoutes = routes.filter((route) => !route.isProtect);

  const PrivateRoutes = () => {
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        {protectRoutes.map((route, index) => {
          const { path, component } = route;
          return <Route path={path} key={index} element={component} />;
        })}
      </Route>
      {publicRoutes.map((route, index) => {
        const { path, component } = route;
        return <Route path={path} key={index} element={component} />;
      })}
      <Route path="*" element={<>NotFoundPage</>} />
    </Routes>
  );
};

const routersConfig = {
  routes,
  renderRoutes,
};
export default routersConfig;
