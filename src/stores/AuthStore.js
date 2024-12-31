import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authStatus: 'failure',
    email: '',
  }),

  actions: {
    setEmail(email) {
      this.email = email
    },
  },
})
