import { Button, Grid } from '@material-ui/core';
import { AccountCircle } from '@mui/icons-material';
import formStyles from '../components/Form/Form.module.scss';
import Input from 'components/Input';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'constant';

const LoginPage = () => {
  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" className="h-100vh">
      <form className={`${formStyles['form-wrapper']} flex-col`} autoComplete="off">
        <div className="flex-col">
          <h1 className={`${formStyles['title']} t-center`}>Tạo tài khoản</h1>
          <div className="t-center mt-5">
            <AccountCircle className={formStyles['labelIcon']} />
          </div>
        </div>

        <div className="flex-col">
          <Input label="Email" size="small" placeholder="Nhập email" />
        </div>

        <div className="flex-col">
          <Input label="Mật khẩu" size="small" placeholder="Nhập mật khẩu" />
        </div>

        <Link className={formStyles['forgotPw']} to={ROUTES.FORGOT_PASSWORD}>
          Quên mật khẩu ?
        </Link>

        <Button className="_btn _btn-primary _btn-large" type="submit" variant="contained" color="primary" size="large">
          Đăng nhập
        </Button>
      </form>
    </Grid>
  );
};

export default LoginPage;
