import { defineStore } from 'pinia'
import { ref } from 'vue'


const useUserStore = defineStore('userStore', {

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
    setUser(name, password) {
      this.name = name
      this.password = password
      this.isLogin = true
    },

    removeUser() {
      this.$reset()
    },

    setAuthorities(authorities) {
      this.authorities = authorities
    },
  },
})


export default useUserStore

