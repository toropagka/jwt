<template>
  <div class="menu">
    <router-link
      to="/"
      class="menu_link"
    >
      Home
    </router-link>
    <router-link
      v-if="!token"
      class="menu_link"
      to="/signin"
    >
      Login
    </router-link>
    <router-link
      v-if="token"
      class="menu_link"
      to="/cars"
    >
      Cars
    </router-link>
    <router-link
      v-if="token"
      class="menu_link"
      to="/signin"
      @click.prevent="logout"
    >
      Logout
    </router-link>
  </div>
  <div class="container">
    <RouterView />
  </div>
</template>

<script setup>
import {useAuthStore} from '@/stores/auth.js';
import {computed} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const token = computed(() => authStore.userInfo.token);

const checkUser = () => {
  const userToken = JSON.parse(localStorage.getItem('accessToken'));

  if (userToken) {
    authStore.userInfo.token = userToken.token;
    authStore.userInfo.refreshToken = userToken.refreshToken;
  }
};

const logout = () => {
  localStorage.removeItem('accessToken');
  router.push('/signin');
  authStore.logout();
};

checkUser();
</script>

<style scoped>
.container {
  margin: auto;
  font-family: Arial, sans-serif;
  max-width: 700px;
}

.menu {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 20px;
}

.menu_link {
  color: aquamarine;
  margin: 0 20px;
  font-family: Arial, sans-serif;
}
</style>
