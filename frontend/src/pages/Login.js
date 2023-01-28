import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AccountCircle } from '@mui/icons-material';
import formStyles from '../components/Form/Form.module.scss';
import Input from 'components/Input';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MAX, ROUTES, UX } from 'constant';
import { Button, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import accountApi from 'apis/accountApi';
import { setMessage } from 'redux/slices/message.slice';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required('Nhập email')
      .email('Email không hợp lệ')
      .max(MAX.EMAIL_LEN, `Email tối đa ${MAX.EMAIL_LEN}`),
    password: yup
      .string()
      .trim()
      .required('Nhập mật khẩu')
      .max(MAX.PASSWORD_LEN, `Mật khẩu tối đa ${MAX.PASSWORD_LEN}`),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (account) => {
    try {
      setLoading(true);
      const { email, password } = account;
      const apiRes = await accountApi.postLogin(email.toLowerCase(), password);
      if (apiRes && apiRes.status === 200) {
        dispatch(setMessage({ message: 'Đăng nhập thành công', type: 'success' }));

        setTimeout(() => {
          window.location.href = '/';
        }, UX.DELAY_TIME);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Thất bại, thử lại !';
      dispatch(setMessage({ message, type: 'error' }));
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" className="h-100vh">
      <form
        className={`${formStyles['form-wrapper']} flex-col`}
        autoComplete="off"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="flex-col">
          <h1 className={`${formStyles['title']} t-center`}>Tạo tài khoản</h1>
          <div className="t-center mt-5">
            <AccountCircle className={formStyles['labelIcon']} />
          </div>
        </div>

        <div className="flex-col">
          <Input
            label="Email"
            size="small"
            placeholder="Nhập email"
            error={Boolean(errors.email)}
            inputProps={{
              name: 'email',
              maxLength: MAX.EMAIL_LEN,
              autoFocus: true,
              ...register('email'),
            }}
          />
          {errors.email && <p className="text-error">{errors.email?.message}</p>}
        </div>

        <div className="flex-col">
          <Input
            label="Mật khẩu"
            size="small"
            placeholder="Nhập mật khẩu"
            error={Boolean(errors.password)}
            inputProps={{
              name: 'password',
              maxLength: MAX.PASSWORD_LEN,
              type: 'password',
              ...register('password'),
            }}
          />
          {errors.password && <p className="text-error">{errors.password?.message}</p>}
        </div>

        <Link className={formStyles['forgotPw']} to={ROUTES.FORGOT_PASSWORD}>
          Quên mật khẩu ?
        </Link>

        <Button
          className="_btn _btn-primary _btn-large"
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={loading}
        >
          Đăng nhập
        </Button>
      </form>
    </Grid>
  );
};

export default LoginPage;
