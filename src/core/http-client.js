import axios from 'axios'
import useUserStore from '@/core/stores/userStore'

const userStore = useUserStore()
const httpClient = axios.create({
  baseURL: decideBaseUrl(),
  timeout: 60000,
})

httpClient.interceptors.request.use(
  (config) => {
    if (config.url === '/login') {
      return config
    } else {
      config.headers.Authorization = 'Basic ' + btoa(`${userStore.getName}:${userStore.getPassword}`)
      return config
    }
  },
  (error) => {
    console.log(`Requesting hit error: ${error}`)
    return Promise.reject(error)
  },
)

httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(`Response hit error: ${error}`)
    return Promise.reject(error)
  },
)

function decideBaseUrl() {
  const env = import.meta.env.MODE
  if (env==='development') {
    return 'http://localhost:8080'
  } else {
    return 'https://squid-app-pxlml.ondigitalocean.app'
  }
}

export default httpClient
