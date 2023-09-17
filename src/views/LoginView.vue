<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import authApi from '@/apis/AuthApi'
import router from '@/router'

const userStore = useUserStore()

const username = ref('')
const password = ref('')

const login = async () => {
  await authApi.login(username.value, password.value)
    .then((response) => {
        if (response.status === 200) {
          userStore.name = username.value
          userStore.password = password.value
          userStore.isLogin = true
        }
      router.push({name: 'Index'})
      },
    ).catch((error) => {
      console.log(error)
    })


}

</script>

<template>
  <v-main class="main">
    <v-container class="d-flex justify-center align-center pt-0">
      <v-col class="d-flex flex-column justify-start">
        <v-row class="d-flex title text-h3 align-self-center mt-5">Login</v-row>

        <v-row>
          <v-divider class="mt-10"></v-divider>
        </v-row>

        <v-row class="d-flex justify-center align-center mt-12 pt-8">
          <v-form class="my-form">
            <v-text-field v-model="username" label="Username"></v-text-field>
            <v-text-field v-model="password" label="Password" type="password"></v-text-field>
            <v-btn size="large" color="#f47a00" @click.prevent.stop="login()">Login</v-btn>
          </v-form>
        </v-row>

      </v-col>
    </v-container>
  </v-main>
</template>

<style scoped>
.title {
  color: #f47a00;
}

.my-form {
  width: 500px;
}

</style>
