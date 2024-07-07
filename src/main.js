import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './api.js'
import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: "AIzaSyCkkWKiEC5pnZogDX0F_xbFn3zXVZlGpNY",
  authDomain: "jwt-vue3-6b844.firebaseapp.com",
  projectId: "jwt-vue3-6b844",
  storageBucket: "jwt-vue3-6b844.appspot.com",
  messagingSenderId: "521418332447",
  appId: "1:521418332447:web:4651c67c764f19b22ff82a"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.mount('#app')

