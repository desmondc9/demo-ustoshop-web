<script setup>

import router from '@/core/router'
import { ref } from 'vue'
import deliveryOrderService from '@/deliveryorders/services/DeliveryOrderService'

const channelName = ref('')
const channelDefaultAddress = ref('')

async function submit() {

  deliveryOrderService.createDeliveryChannel({
    name: channelName.value,
    defaultAddress: channelDefaultAddress.value,
  }).then(
    (response) => {
      console.log(response)
      if (response.status === 201) {
        router.push({ name: 'DeliveryChannels' })
      }
    },
    (error) => {
      console.log(error)
    },
  )
}

</script>

<template>
  <v-main class="main">
    <v-container>
      <v-row>
        <v-col>
          <v-form class="mt-10">
            <v-text-field
              v-model="channelName"
              label="Channel Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="channelDefaultAddress"
              label="Default Address"
              required
            ></v-text-field>

            <v-btn
              class="me-4"
              type="submit"
              @click.prevent.stop="submit()"
            >
              submit
            </v-btn>
          </v-form>
        </v-col>

      </v-row>

    </v-container>
  </v-main>
</template>

<style scoped>

</style>
