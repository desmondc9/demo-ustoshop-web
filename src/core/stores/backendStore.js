import { defineStore } from 'pinia'
import { ref } from 'vue'


const useBackendStore = defineStore('backendStore', {

  state: () => ({
    host: ref(''),
  }),
  getters: {
    getHost() {
      return this.host
    },

  },
  actions: {
    decideHost() {
      const hostName = window.location.hostname
      if (hostName.includes('hammerhead-app-qtzd2.ondigitalocean.app')) {
        this.host = 'https://squid-app-pxlml.ondigitalocean.app'
      } else {
        this.host = 'http://127.0.0.1:8080'
      }
    },

  },
})

export default useBackendStore

