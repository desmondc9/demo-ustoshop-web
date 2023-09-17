import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useUserStore = defineStore('userStore', {

  state: () => ({
    name: ref(''),
    password: ref(''),
    authorities: ref([]),
    isLogin: ref(false),
  }),
  getters: {
    getName() {
      return this.name
    },
    getPassword() {
      return this.password
    },
    getAuthorities() {
      return this.authorities
    },
    getIsLogin() {
      return this.isLogin
    },
  },
  actions: {
    login(name, password) {
      this.name = name
      this.password = password
      this.isLogin = true
    },
    logout() {
      this.name = ''
      this.password = ''
      this.isLogin = false
    },
  },
})

export default { useUserStore }

