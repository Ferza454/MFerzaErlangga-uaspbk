<template>
  <div class="container">
    <h2 class="mb-4">Login</h2>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="input w-full"
          @keydown.enter.prevent="focusPassword"
          autofocus
        />
      </div>
      <div>
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="input w-full"
          ref="passwordInput"
        />
      </div>
      <div>
        <button type="submit" class="btn-primary w-full">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const username = ref('')
const password = ref('')
const passwordInput = ref(null)

const router = useRouter()
const auth = useAuthStore()

const focusPassword = () => {
  passwordInput.value?.focus()
}

const handleLogin = () => {
  if (username.value === 'admin' && password.value === 'admin') {
    auth.login({ username: 'admin' }, 'admin')
    router.push('/admin/lapangan')
  } else if (username.value && password.value) {
    auth.login({ username: username.value }, 'user')
    router.push('/dashboard')
  } else {
    alert('❌ Username dan Password wajib diisi')
  }
}
</script>
