import axios from 'axios';
import {useAuthStore} from '@/stores/auth.js';
import router from './router';

const axiosApiInstance = axios.create();
const API_KEY = import.meta.env.VITE_API_KEY;

axiosApiInstance.interceptors.request.use(config => {
  if (!config.url.includes('signInWithPassword') && !config.url.includes('signUp')) {
    const authStore = useAuthStore();
    let params = new URLSearchParams();
    params.append('auth', authStore.userInfo.token);
    config.params = params;
  }

  return config;
});

axiosApiInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const authStore = useAuthStore();

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await axios.post(
          `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
          {
            grant_type: 'refresh_token',
            refresh_token: JSON.parse(localStorage.getItem('accessToken')).refreshToken
          }
        );
        console.log('NewToken', newToken.data);
        authStore.userInfo.token = newToken.data.access_token;
        authStore.userInfo.refreshToken = newToken.data.refresh_token;
        localStorage.setItem(
          'accessToken',
          JSON.stringify({
            token: newToken.data.access_token,
            refreshToken: newToken.data.refresh_token
          })
        );
      } catch (error) {
        console.log(error);
        localStorage.removeItem('accessToken');
        await router.push('/signin');
        authStore.userInfo.token = '';
        authStore.userInfo.refreshToken = '';
      }
    }
    console.log(error);
  }
);

export default axiosApiInstance;
