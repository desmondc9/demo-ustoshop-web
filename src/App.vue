<script setup>
import router from '@/core/router'
import { onMounted, ref } from 'vue'
import useUserStore from '@/core/stores/userStore'
import useBackendStore from '@/core/stores/backendStore'

const userStore = useUserStore()
const backendStore = useBackendStore()

const drawer = ref(true)
const rail = ref(true)

onMounted(async () => {
  backendStore.decideHost()
})

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


    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
      <v-list-item class="menu" prepend-icon="mdi-menu" title="Menu" v-ripple>
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item :to="{ name: 'Index'}" exact prepend-icon="mdi-home"
                     title="Index" value="Index">
        </v-list-item>
        <v-list-item :to="{ name: 'DeliveryOrders'}" exact prepend-icon="mdi-truck-delivery-outline"
                     title="Delivery Orders" value="account">
        </v-list-item>
        <v-list-item :to="{name: 'ImportRawDeliveryData'}" exact prepend-icon="mdi-file-upload-outline" title="Import"
                     value="users"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav v-if="userStore.hasAuthority('ADMIN')">

        <v-list-item :to="{ name: 'Users'}" exact prepend-icon="mdi-account-group" title="Manage Users"
                     value="Manage Users"></v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-footer id="my-main" class="d-flex justify-end">
    </v-footer>

  </v-app>


</template>


<style scoped>


.icon-wrapper:hover {
  cursor: pointer;
}

.menu {
  cursor: pointer;
}
</style>
