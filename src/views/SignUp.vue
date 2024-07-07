<template>
  <h2>Sign Up</h2>
  <form class="flex flex-column gap-3">
    <Message
      v-if="authStore.error"
      severity="warn"
      closable
    >
      {{ authStore.error }}
    </Message>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-user" />
      </InputGroupAddon>
      <InputText
        v-model="email"
        type="email"
        placeholder="Your Email"
      />
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-at" />
      </InputGroupAddon>
      <InputText
        v-model="password"
        type="password"
        placeholder="Password"
      />
    </InputGroup>
    <div class="flex flex-column gap-3">
      <LoaderVue v-if="authStore.loader" />
      <Button
        v-else
        label="Signup"
        @click="signup"
      />
      <span>Are you already registered? <router-link to="/signin">Sign in</router-link></span>
    </div>
  </form>
</template>
<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Message from 'primevue/message';
import {useAuthStore} from '@/stores/auth.js';
import {ref} from 'vue';
import LoaderVue from '@/components/LoaderVue.vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const email = ref();
const password = ref();

const signup = async () => {
  await authStore.auth({email: email.value, password: password.value}, 'signup');
  await router.push('/cars');
};
</script>

<style scoped></style>
