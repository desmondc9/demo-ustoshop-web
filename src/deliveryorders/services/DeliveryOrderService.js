import client from '@/apis/client'

class DeliveryOrderService {
  constructor() {
    this.client = client
  }

  queryDeliveryOrders = async () => {
    const response = await this.client.get('/delivery-orders')

    return response
  }
  importRawDeliveryData = async (data) => {
    const response = await this.client.post('/delivery-orders/import-raw-delivery-data', data)
    return response
  }

  createDeliveryChannel = async (data) => {
    const response = await this.client.post('/delivery-orders/delivery-channels', data)
    return response
  }

  queryAllDeliveryChannels = async () => {
    const response = await this.client.get('/delivery-orders/delivery-channels')
    return response
  }

  updateDeliveryChannel = async (data) => {
    const response = await this.client.put('/delivery-orders/delivery-channels', data)
    return response
  }

  deleteDeliveryChannel = async (id) => {
    const response = await this.client.delete(`/delivery-orders/delivery-channels/${id}`)
    return response
  }
}

export default new DeliveryOrderService()
