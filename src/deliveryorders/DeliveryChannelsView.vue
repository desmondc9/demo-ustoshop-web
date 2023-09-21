<script setup>
import { onMounted, reactive } from 'vue'
import deliveryOrderService from '@/deliveryorders/services/DeliveryOrderService'
import router from '@/core/router'

const list = reactive([])

async function getList() {
  const resp = await deliveryOrderService.queryAllDeliveryChannels()
  list.push(...resp.data.data)
  console.log(list)
}

const deleteItem = async (id) => {
  await deliveryOrderService.deleteDeliveryChannel(id).then(
    (response) => {
      const random = Date.now()
      router.push({ name: 'DeliveryChannels', query: { random: random } })
    },
  )
}

onMounted(async () => {
  await getList()
})

</script>

<template>
  <v-main class="main">
    <v-container>
      <v-row>
        <v-col>

          <v-table class="mt-10">
            <thead>
            <tr>
              <th>Channel Name</th>
              <th>Default Address</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.defaultAddress }}</td>
              <td>
                <v-btn color="error" density="compact" @click="deleteItem(item.id)">Delete</v-btn>
              </td>
            </tr>
            </tbody>
          </v-table>

        </v-col>
      </v-row>

      <v-row class="justify-center">
        <v-col md="2">
          <v-btn color="#f47a00" class="mt-3" @click="router.push({name: 'AddChannel'})">Add a Channel</v-btn>
        </v-col>
      </v-row>

    </v-container>
  </v-main>
</template>

<style scoped>

</style>


<style scoped>

</style>
