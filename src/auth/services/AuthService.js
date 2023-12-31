import httpClient from '@/core/http-client'

class AuthService {
  constructor() {
    this.client = httpClient
  }

  login = async (username, password) => {
    const response = await this.client.post('/login', {}, {
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
      },
    })
    return response
  }

  getAuthorities = async () => {
    const response = await this.client.get('/authorities')
    return response
  }

  getAllAuthorities = async (data) => {
    const response = await this.client.get('/all-authorities', { params: data })
    return response
  }
}


export default new AuthService()
