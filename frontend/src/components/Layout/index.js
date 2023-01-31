import Header from 'components/Header';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <div>Footer</div>
    </>
  );
};

export default Layout;
