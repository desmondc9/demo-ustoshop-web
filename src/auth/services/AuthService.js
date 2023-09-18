import client from '@/apis/client'

class AuthService {
  constructor() {
    this.client = client
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
}


export default new AuthService()
