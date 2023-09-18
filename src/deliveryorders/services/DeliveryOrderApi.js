import client from '@/apis/client'

class DeliveryOrderApi {
  constructor() {
    this.client = client
  }

  importRawDeliveryData = async (data) => {
    const response = await this.client.post('/delivery-orders/import-raw-delivery-data', data)
    return response.data
  }

  createDeliveryChannel = async (data) => {
    const response = await this.client.post('/delivery-orders/delivery-channels', data)
    return response.data
  }

  queryAllDeliveryChannels = async () => {
    const response = await this.client.get('/delivery-orders/delivery-channels')
    return response.data
  }

  updateDeliveryChannel = async (data) => {
    const response = await this.client.put('/delivery-orders/delivery-channels', data)
    return response.data
  }

  deleteDeliveryChannel = async (id) => {
    const response = await this.client.delete(`/delivery-orders/delivery-channels/${id}`)
    return response.data
  }
}

export default new DeliveryOrderApi()
