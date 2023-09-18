<script setup>
import { onMounted, reactive } from 'vue'
import deliveryOrderService from '@/deliveryorders/services/DeliveryOrderService'
import useBackendStore from '@/stores/backendStore'

const backendStore = useBackendStore()
const deliveryList = reactive([])

async function getDeliveryList() {
  const resp = await deliveryOrderService.queryDeliveryOrders()
  deliveryList.push(...resp.data.data)
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
          <td><a target="_blank" :href="`${backendStore.host}/delivery-orders/pdf?path=${delivery.storagePath}`">Download Pdf</a></td>
        </tr>
        </tbody>
      </v-table>
    </v-container>
  </v-main>
</template>

<style scoped>

</style>
