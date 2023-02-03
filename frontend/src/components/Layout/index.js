import Header from 'components/Header';
import React from 'react';
import layoutStyles from './Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <div className={`${layoutStyles['footer']} t-center`}>
        © {new Date().getFullYear()} Duynb. All rights reserved.
      </div>
    </>
  );
};

export default Layout;
