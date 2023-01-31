import axios from 'axios';
import { parse, stringify } from 'qs';

const axiosClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_API_LOCAL_BASE_URL
      : process.env.REACT_APP_API_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
  withCredentials: true,
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    throw error;
  },
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    throw error;
  },
);

export default axiosClient;
