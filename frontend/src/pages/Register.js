import { AccountCircle } from '@mui/icons-material';
import formStyles from '../components/Form/Form.module.scss';
import Input from 'components/Input';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MAX, MIN, REGEX, ROUTES, UX } from 'constant';
import { Button, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import accountApi from 'apis/accountApi';
import { setMessage } from 'redux/slices/message.slice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required('Nhập email')
      .email('Email không hợp lệ')
      .max(MAX.EMAIL_LEN, `Email tối đa ${MAX.EMAIL_LEN}`),
    name: yup
      .string()
      .trim()
      .required('Nhập họ tên')
      .max(MAX.NAME_LEN, `Họ tên tối đa ${MAX.NAME_LEN} ký tự`)
      .matches(REGEX.NAME, 'Họ tên không chứ số và ký tự đặc biệt'),
    password: yup
      .string()
      .trim()
      .required('Nhập mật khẩu')
      .min(MIN.PASSWORD_LEN, `Mật khẩu ít nhất ${MIN.PASSWORD_LEN} ký tự`)
      .max(MAX.PASSWORD_LEN, `Mật khẩu tối đa ${MAX.PASSWORD_LEN}`),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (account) => {
    try {
      setLoading(true);
      const { email, password, name } = account;
      const apiRes = await accountApi.postRegisterAccount(email.toLowerCase(), name, password);

      if (apiRes?.status === 200) {
        const message = 'Đăng ký thành công';
        dispatch(setMessage({ message, type: 'success' }));
        setTimeout(() => {
          setLoading(false);
          navigate(ROUTES.LOGIN);
        }, UX.DELAY_TIME);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Thất bại, thử lại !';
      dispatch(setMessage({ message, type: 'error' }));
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="h-100vh"
      onSubmit={handleSubmit(handleRegister)}
    >
      <form className={`${formStyles['form-wrapper']} flex-col`} autoComplete="off">
        <div className="flex-col">
          <h1 className={`${formStyles['title']} t-center`}>Tạo tài khoản</h1>
          <div className="t-center mt-5">
            <AccountCircle className={formStyles['labelIcon']} />
          </div>
        </div>

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
          errorMsg={errors.email}
        />

        <Input
          label="Họ tên"
          size="small"
          placeholder="Nhập họ tên"
          error={Boolean(errors.name)}
          inputProps={{
            name: 'name',
            maxLength: MAX.NAME_LEN,
            ...register('name'),
          }}
          errorMsg={errors.name}
        />

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
          errorMsg={errors.password}
        />

        <Button
          className="_btn _btn-primary _btn-large"
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={loading}
        >
          Đăng ký
        </Button>
      </form>
      <div className={`${formStyles['has-account']}`}>
        Bạn đã có tài khoản?&nbsp;
        <Link to={ROUTES.LOGIN} className={`${formStyles['account-link']}`}>
          Đăng nhập
        </Link>
      </div>
    </Grid>
  );
};

export default RegisterPage;
