import axios from 'axios'
import useUserStore from '@/stores/userStore'

const userStore = useUserStore()
const client = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 60000,
  withCredentials: false,
  headers: {
    'Authorization': 'Basic ' + btoa(`${userStore.username}:${userStore.password}`),
    'Content-Type': 'application/json',
  },
})


export default client
