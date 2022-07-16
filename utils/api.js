import axios from 'axios';
import { BASE_URL } from 'utils/constants';
import { getLocalStorage, setLocalStorage } from './storage';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    pragma: 'no-cache'
  }
});

axiosInstance.interceptors.request.use(config => {
  config.headers.Authorization = `${getLocalStorage('jwt')}`;
  return config;
});

axiosInstance.interceptors.response.use(
  async res => {
    if (res.headers.authorization) {
      setLocalStorage('jwt', res.headers.authorization);
    }
    return res;
  },
  err => {
    return Promise.reject(err);
  }
);

export const get = (url, payload) =>
  axiosInstance.get(url, { withCredentials: true, params: payload });

export const post = (url, body) =>
  axiosInstance.post(url, body, { withCredentials: true });

export const put = (url, body) =>
  axiosInstance.put(url, body, { withCredentials: true });

export const deleteApi = (url, body) =>
  axiosInstance.delete(url, { withCredentials: true, params: body });
