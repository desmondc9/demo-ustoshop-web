import httpClient from '@/core/http-client'

class UserService {
  constructor() {
    this.client = httpClient
  }

  createUser = async (data) => {
    const response = await this.client.post('/users', data)
    return response
  }

  deleteUser = async (id) => {
    const response = await this.client.delete(`/users/${id}`)
    return response
  }

  queryAllUsers = async () => {
    const response = await this.client.get('/users')
    return response
  }

}

export default new UserService()
