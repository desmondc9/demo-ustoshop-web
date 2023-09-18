import axios from 'axios'
import useUserStore from '@/stores/userStore'

const userStore = useUserStore()
const client = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 60000,
})

client.interceptors.request.use(
  (config) => {
    console.log(`Requesting url: ${config.url}`)
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

client.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(`Response hit error: ${error}`)
    return Promise.reject(error)
  },
)

export default client
