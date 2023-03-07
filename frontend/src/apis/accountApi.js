import axiosClient from './axiosClient';

const URL = '/account';

const accountApi = {
  postRegisterAccount: (email, name, password) => {
    return axiosClient.post(`${URL}/register`, { email, name, password });
  },
  postLogin: (email, password) => {
    return axiosClient.post(`${URL}/login`, { email, password });
  },
  getUserInfo: () => {
    return axiosClient.get(`${URL}/user-info`);
  },
  postLogout: () => {
    return axiosClient.post(`${URL}/logout`);
  },
  getUserProfile: () => {
    return axiosClient.get(`${URL}/user-profile`);
  },
  putUpdateAvt: (avtSrc = '') => {
    return axiosClient.put(`${URL}/update-avt`, { avtSrc });
  },
  putUpdateProfile: (name = '', username = '') => {
    return axiosClient.put(`${URL}/update-profile`, { name, username });
  },
};

export default accountApi;
