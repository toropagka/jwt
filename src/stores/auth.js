import {defineStore} from 'pinia';
import axiosApiInstance from '../api.js';
import {ref} from 'vue';

const API_KEY = import.meta.env.VITE_API_KEY;

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: ''
  });

  const error = ref('');
  const loader = ref(false);

  const auth = async (payload, type) => {
    const stringURL = type === 'signup' ? 'signUp' : 'signInWithPassword';

    error.value = '';
    loader.value = true;
    try {
      let response = await axiosApiInstance.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${stringURL}?key=${API_KEY}`,
        {...payload, returnSecureToken: true}
      );

      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken
      };

      localStorage.setItem(
        'accessToken',
        JSON.stringify({token: userInfo.value.token, refreshToken: userInfo.value.refreshToken})
      );
    } catch (err) {
      switch (err.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Email already exists!';
          break;
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Operation Not Allowed!';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          error.value = 'Too Many Attempts!';
          break;
        case 'EMAIL_NOT_FOUND':
          error.value = 'Email Not Found!';
          break;
        case 'INVALID_PASSWORD':
          error.value = 'Invalid Password!';
          break;
        case 'USER_DISABLED':
          error.value = 'User Disabled!';
          break;
        default:
          error.value = 'Error';
      }
    } finally {
      loader.value = false;
    }
  };

  const logout = () => {
    userInfo.value = {
      token: '',
      email: '',
      userId: '',
      refreshToken: ''
    };
  };

  return {auth, userInfo, error, loader, logout};
});
