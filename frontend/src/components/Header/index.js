import { Avatar, Button } from '@mui/material';
import logoUrl from '../../assets/images/englishAppLogo.png';
import defaultUserImg from '../../assets/images/default-user.png';
import { ROUTES } from 'constant';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import headerStyles from './Header.module.scss';

function Header() {
  const { avt, isAuth } = useSelector((state) => state.userInfo);

  return (
    <div className={`${headerStyles['navWrapper']} w-100vw`} id="dynoNav">
      <div className={`${headerStyles['nav']} w-100`}>
        <div className="container h-100 flex-center--ver">
          {/* Logo */}
          <Link to="/">
            <img className={`${headerStyles['imgSize']} ${headerStyles['logo']}`} src={logoUrl} alt="Logo" />
          </Link>

          {/* control, setting */}
          <div className={`${headerStyles['control']} flex-center--ver`}>
            {isAuth ? (
              <Avatar className={`${headerStyles['imgSize']} cur-pointer`} alt="Username" src={avt || defaultUserImg} />
            ) : (
              <Link to={ROUTES.LOGIN}>
                <Button
                  className="_btn _btn-primary"
                  classes={{
                    root: headerStyles.loginBtn,
                    label: headerStyles.loginLabel,
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Đăng nhập
                </Button>
              </Link>
            )}
            {/* TODO: Setting menu */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
