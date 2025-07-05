import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    role: localStorage.getItem('role') || null
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    isAdmin: (state) => state.role === 'admin'
  },

  actions: {
    login(userData, role) {
      this.user = userData
      this.role = role
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('role', role)
    },

    logout() {
      this.user = null
      this.role = null
      localStorage.removeItem('user')
      localStorage.removeItem('role')
    }
  }
})
