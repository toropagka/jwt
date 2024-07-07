import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignUp from '../views/SignUp.vue';
import SignIn from '../views/SignIn.vue';
import Cars from '../views/Cars.vue';
import {useAuthStore} from '@/stores/auth.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      meta: {
        auth: false
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      meta: {
        auth: false
      }
    },
    {
      path: '/cars',
      name: 'cars',
      component: Cars,
      meta: {
        auth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();

  if (to.meta.auth && !store.userInfo.token) {
    next('/signin');
  } else if (!to.meta.auth && store.userInfo.token) {
    next('/cars');
  } else {
    next();
  }
});

export default router;
