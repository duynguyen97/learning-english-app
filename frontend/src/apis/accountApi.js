import axiosClient from './axiosClient';

const URL = '/account';

const accountApi = {
  postLogin: (email, password) => {
    return axiosClient.post(`${URL}/login`, { email, password });
  },
};

export default accountApi;
