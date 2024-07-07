<template>
  <h2>Sign In</h2>
  <form class="flex flex-column gap-3">
    <message-vue
      v-if="authStore.error"
      severity="warn"
      closable
    >
      {{ authStore.error }}
    </message-vue>
    <input-group>
      <input-group-addon>
        <i class="pi pi-user" />
      </input-group-addon>
      <input-text
        v-model="email"
        type="email"
        placeholder="Your Email"
      />
    </input-group>
    <input-group>
      <input-group-addon>
        <i class="pi pi-at" />
      </input-group-addon>
      <input-text
        v-model="password"
        type="password"
        placeholder="Password"
      />
    </input-group>
    <div class="flex flex-column gap-3">
      <loader-vue v-if="authStore.loader" />
      <button-vue
        v-else
        label="Signin"
        @click="signIn"
      />
      <span>Are you not registered yet? <router-link to="/signup">Sign up</router-link></span>
    </div>
  </form>
</template>
<script setup>
import ButtonVue from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import MessageVue from 'primevue/message'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import LoaderVue from '@/components/LoaderVue.vue'

const router = useRouter()
const authStore = useAuthStore()
const email = ref()
const password = ref()

const signIn = async () => {
  await authStore.auth({ email: email.value, password: password.value }, 'signIn')
  await router.push('/cars')
}
</script>

<style scoped></style>
