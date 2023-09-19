<script setup>
import { onMounted, reactive } from 'vue'
import deliveryOrderService from '@/deliveryorders/services/DeliveryOrderService'
import useBackendStore from '@/stores/backendStore'
import router from '@/router'

const backendStore = useBackendStore()
const deliveryList = reactive([])

async function getDeliveryList() {
  const resp = await deliveryOrderService.queryDeliveryOrders()
  deliveryList.push(...resp.data.data)
}


const downloadPdf = async (params) => {
  await deliveryOrderService.downloadPdf(params).then(async (response) => {
    const blob = new Blob([response.data], { type: response.headers['content-type'] })

    // Download
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${params.deliveryOrderId}.pdf`) // or any other extension
    document.body.appendChild(link)
    link.click()

    // Clean up after forcing download
    link.parentNode.removeChild(link)
    window.URL.revokeObjectURL(url)
  })
}

const deleteDeliveryOrder = async (id) => {
  await deliveryOrderService.deleteDeliveryOrder(id).then(
    (response) => {
      let randomId = Date.now()
      router.push({ name: 'DeliveryOrders', query: { random: randomId } })
    },
    (error) => {
      console.log(error)
    },
  )
}

onMounted(async () => {
  await getDeliveryList()
  console.log(`deliveryList: ${deliveryList.value}`)
})


</script>

<template>
  <v-main class="main">
    <v-container class="d-flex justify-center align-center pt-0">
      <!--    show delivery list-->
      <v-table class="mt-10">
        <thead>
        <tr>
          <th>AWB NO.</th>
          <th>Company</th>
          <th>NO. Packages</th>
          <th>Weight (KG)</th>
          <th>For Delivery To</th>
          <th>Descriptions</th>
          <th>PDF file</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="delivery in deliveryList" :key="delivery.id">
          <td>{{ delivery.airWaybillNumber }}</td>
          <td>{{ delivery.issuer }}</td>
          <td>{{ delivery.numberOfPackages }}</td>
          <td>{{ delivery.weight.value }}</td>
          <td>{{ delivery.addressForDeliveryTo }}</td>
          <td>{{ delivery.descriptions }}</td>
          <td>
            <v-btn
              @click.prevent.stop="downloadPdf(
                {
                path: `${backendStore.host}/delivery-orders/pdf?path=${delivery.storagePath}`,
                deliveryOrderId: delivery.id
                })">
              Download Pdf
            </v-btn>
          </td>
          <td>
            <v-btn color="error" density="compact" @click="deleteDeliveryOrder(delivery.id)">Delete</v-btn>
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-container>
  </v-main>
</template>

<style scoped>

</style>
