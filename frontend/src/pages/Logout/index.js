import React, { useEffect } from 'react';
import accountApi from 'apis/accountApi';
import Loading from 'components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMessage } from 'redux/slices/message.slice';
import { resetAuth } from 'redux/slices/userInfo.slice';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (!isAuth) {
      navigate(-1);
      return;
    }

    (async function () {
      try {
        const apiRes = await accountApi.postLogout();
        if (apiRes.status === 200) {
          dispatch(resetAuth());
          dispatch(setMessage({ type: 'success', message: 'Đăng xuất thành công' }));
          navigate('/');
        }
      } catch (error) {
        dispatch(setMessage({ type: 'error', message: 'Đăng xuất thất bại, thử lại' }));
        navigate(-1);
      }
    })();

    return () => {};
  }, []);

  return <>{isAuth && <Loading title="Đang đang xuất ..." />}</>;
};

export default Logout;
