/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { setCredentials } from '../store/auth/authSlice';

let store;

// Recommended approach to avoid circular import dependency error
export const injectStore = (_store) => {
  store = _store;
};

export const apiErrorResponse = (error) => {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_STMS_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().auth;
    if (accessToken && accessToken !== 'undefined') {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      };
    }

    return config;
  },
  (err) => Promise.reject(err)
);

let calledOnce = false;

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response !== null) {
      if (error.response.status === 403 && !originalRequest._retry) {
        if (!calledOnce) {
          calledOnce = true;
          const refreshToken = localStorage.getItem('refreshToken');
          try {
            const refreshData = await axios.post(
              ` ${import.meta.env.VITE_STMS_BASE_URL}/auth/refreshToken`,
              {
                refreshToken,
              },
              { headers: { Authorization: `Bearer ${refreshToken}` } }
            );

            if (refreshData.data?.data && refreshData.status === 200) {
              const { user } = store.getState().auth;
              axios.defaults.headers.common.Authorization = `Bearer ${refreshData.data.access_token}`;

              store.dispatch(
                setCredentials({
                  user,
                  access_token: refreshData.data.access_token,
                })
              );

              return instance(originalRequest);
            } else {
              localStorage.removeItem('auth');
              localStorage.removeItem('userAccessToken');
              localStorage.removeItem('refreshToken');
              store.dispatch(
                setCredentials({
                  user: null,
                  accessToken: null,
                })
              );
              window.location.href = '/login';
            }
          } catch (error) {
            if (error.response && error.response.data) {
              return Promise.reject(error.response.data);
            }

            return Promise.reject(error);
          } finally {
            originalRequest._retry = true;
            calledOnce = false;
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
