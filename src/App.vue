<script setup>
import router from '@/router'
import useUserStore from '@/stores/userStore'

const userStore = useUserStore()

</script>

<template>
  <v-app class="d-flex w-100">

    <v-app-bar color="#f47a00" @click.prevent.stop="router.push({name: 'Index'})">
      <v-row class="d-flex align-center">
        <v-col class="d-flex justify-start">
          <div class="d-flex icon-wrapper" @click.prevent.stop="router.push({name: 'Index'})">
            <div class="d-flex text-md-h6 pt-1 pt-md-1 ml-3 text-white">Demo</div>
          </div>
        </v-col>

        <v-col class="d-flex justify-end text-white">
          <v-btn v-if="userStore.isLogin" variant="text" class="pl-1 pr-1 pl-md-4 pr-md-4"
                 @click.prevent.stop="router.push({name: 'DeliveryOrders'})">
            Delivery Orders
          </v-btn>

          <v-btn v-if="!userStore.isLogin" variant="text" class="pl-1 pr-1 pl-md-4 pr-md-4"
                 @click.prevent.stop="router.push({name: 'Login'})">
            Login
          </v-btn>

          <v-btn v-if="userStore.isLogin" variant="text" class="pl-1 pr-1 pl-md-4 pr-md-4"
                 @click.prevent.stop="userStore.removeUser()">
            Logout
          </v-btn>
        </v-col>
      </v-row>

    </v-app-bar>

    <router-view :key="$route.fullPath"></router-view>

    <v-footer id="my-main" class="d-flex justify-end">
    </v-footer>

  </v-app>


</template>


<style scoped>


.icon-wrapper:hover {
  cursor: pointer;
}
</style>
