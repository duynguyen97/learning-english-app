import React from 'react';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import { ROUTES } from 'constant';
import { Link } from 'react-router-dom';
import SettingMenuStyles from './SettingMenu.module.scss';

const SettingMenu = ({ anchorEl, onClose }) => {
  return (
    <Menu
      classes={{ paper: SettingMenuStyles['root'] }}
      anchorEl={anchorEl}
      disableScrollLock={true}
      getContentAnchorEl={null}
      onClose={onClose}
      open={Boolean(anchorEl)}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom',
      }}
    >
      <Link to={ROUTES.USER_ACCOUNT}>
        <MenuItem className={SettingMenuStyles['menuItem']}>
          <AccountCircle className={SettingMenuStyles['icon']} fontSize="medium" />
          <p className={SettingMenuStyles['text']}>Thông tin cá nhân</p>
        </MenuItem>
      </Link>

      <Link to={ROUTES.LOGOUT}>
        <MenuItem className={SettingMenuStyles['menuItem']}>
          <ExitToApp className={SettingMenuStyles['icon']} fontSize="medium" />
          <p className={SettingMenuStyles['text']}>Đăng xuất</p>
        </MenuItem>
      </Link>
    </Menu>
  );
};

export default SettingMenu;
