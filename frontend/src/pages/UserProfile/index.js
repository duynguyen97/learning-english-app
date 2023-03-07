import { Camera, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import accountApi from 'apis/accountApi';
import Input from 'components/Input';
import Layout from 'components/Layout';
import UploadButton from 'components/UploadButton';
import { DEFAULTS, MAX } from 'constant';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from 'redux/slices/message.slice';
import { setUserAvt } from 'redux/slices/userInfo.slice';
import userProfileStyles from './UserProfile.module.scss';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({ email: null, createdDate: null });
  const dispatch = useDispatch();
  const { username, name, avt } = useSelector((state) => state.userInfo);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef({ name, username });
  const [errors, setErrors] = useState({ name: false, username: false });

  useEffect(() => {
    (async function () {
      try {
        const apiRes = await accountApi.getUserProfile();
        if (apiRes.status === 200) {
          const { email, createdDate } = apiRes.data;
          setUserInfo({ email, createdDate });
        }
      } catch (error) {}
    })();
  }, []);

  const handleUploadAvt = async (src) => {
    try {
      const apiRes = await accountApi.putUpdateAvt(src);
      if (apiRes.status === 200) {
        dispatch(
          setMessage({
            type: 'success',
            message: 'Cập nhật ảnh đại diện thành công',
          }),
        );
        dispatch(setUserAvt(apiRes.data.newSrc));
      }
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: 'Cập nhật ảnh đại diện thất bại. Thử lại',
        }),
      );
    }
  };

  const handleUpdateProfile = async (name, username) => {
    try {
      const apiRes = await accountApi.putUpdateProfile(name, username);
      if (apiRes.status === 200) {
        dispatch(
          setMessage({
            type: 'success',
            message: 'Cập nhật thông tin thành công',
            duration: 500,
          }),
        );
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Chỉnh sửa thông tin thất bại, thử lại !';
      dispatch(setMessage({ type: 'error', message }));
    }
  };

  const handleInputChange = (v, type = 0) => {
    if (type) {
      errors.name && v !== '' && setErrors({ ...errors, name: false });
      inputRef.current.name = v;
    } else {
      errors.username && v !== '' && setErrors({ ...errors, username: false });
      inputRef.current.username = v;
    }
  };

  const handleCloseEditMode = () => {
    inputRef.current = { name, username };
    setEditMode(false);
  };

  const handleUpdate = () => {
    const { name: currentName, username: currentUsername } = inputRef.current;
    if (currentName === name.trim() && username === currentUsername.trim()) {
      return;
    }

    if (currentName.trim() === '') {
      setErrors({ ...errors, name: true });
      dispatch(setMessage({ type: 'error', message: 'Vui lòng nhập tên' }));
      return;
    }

    if (currentUsername.trim() === '') {
      setErrors({ ...errors, username: true });
      dispatch(setMessage({ type: 'error', message: 'Vui lòng nhập username' }));
      return;
    }

    if (currentUsername.indexOf(' ') !== -1) {
      setErrors({ ...errors, username: true });
      dispatch(
        setMessage({
          type: 'error',
          message: 'username không chứa khoảng trống',
        }),
      );
      return;
    }

    if (currentUsername.length > MAX.USERNAME_LEN) {
      setErrors({ ...errors, username: true });
      dispatch(
        setMessage({
          type: 'error',
          message: `username tối đa ${MAX.USERNAME_LEN} ký tự`,
        }),
      );
      return;
    }

    if (currentName.length > MAX.NAME_LEN) {
      setErrors({ ...errors, name: true });
      dispatch(
        setMessage({
          type: 'error',
          message: `Tên tối đa ${MAX.NAME_LEN} ký tự`,
        }),
      );
      return;
    }

    handleUpdateProfile(currentName.trim(), currentUsername.trim());
  };

  return (
    <Layout>
      <div className={`${userProfileStyles.wrap} container flex-center`}>
        <div className={userProfileStyles.root}>
          <div className="flex-center w-100 h-100">
            <div className={userProfileStyles.avtWrap}>
              <img className={`${userProfileStyles.avt} w-100 h-100`} src={avt || DEFAULTS.IMAGE_SRC} alt="Avatar" />
              <div className={`${userProfileStyles.cameraIconWrap} flex-center`}>
                <Camera className={userProfileStyles.cameraIcon} />
                <UploadButton className={userProfileStyles.fileInput} onChange={handleUploadAvt} />
              </div>
            </div>
          </div>

          {!editMode ? (
            <div className="mt-8">
              <h2 className={userProfileStyles.name}>{name}</h2>
              <h4 className={userProfileStyles.username}>{username}</h4>
            </div>
          ) : (
            <div className="flex-center-col mt-8">
              <Input
                onChange={(e) => handleInputChange(e.target.value, 1)}
                className="mb-8"
                placeholder={name}
                label="Nhập tên"
                error={errors.name}
                defaultValue={name}
              />
              <Input
                onChange={(e) => handleInputChange(e.target.value, 0)}
                placeholder={username}
                label="Nhập username"
                error={errors.username}
                defaultValue={username}
              />
            </div>
          )}

          <div className={userProfileStyles.info}>
            {Boolean(userInfo?.email) && <p>{userInfo?.email}</p>}
            {Boolean(userInfo?.createdDate) && <p>Đã tham gia vào {userInfo?.createdDate}</p>}
          </div>

          {!editMode ? (
            <Button
              onClick={() => setEditMode(true)}
              className={`${userProfileStyles.editBtn} _btn _btn-primary w-100`}
              startIcon={<Edit />}
            >
              Chỉnh sửa
            </Button>
          ) : (
            <div className="d-flex w-100">
              <Button
                onClick={handleCloseEditMode}
                className={`${userProfileStyles.editBtn} _btn _btn-outlined-accent w-50`}
              >
                Huỷ bỏ
              </Button>
              <Button onClick={handleUpdate} className={`${userProfileStyles.editBtn} _btn _btn-primary ml-4 w-50`}>
                Cập nhật
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
