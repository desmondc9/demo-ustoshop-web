<script setup>
import { ref } from 'vue'
import useUserStore from '@/core/stores/userStore'
import authService from '@/auth/services/AuthService'
import router from '@/core'

const userStore = useUserStore()

const username = ref('')
const password = ref('')

const login = async () => {
  await authService.login(username.value, password.value)
    .then(async (response) => {
        if (response.status === 200) {
          userStore.setUser(username.value, password.value)
          await setAuthorities()
          await router.push({ name: 'Index' })
        }
      },
    )
}

async function setAuthorities() {
  await authService.getAuthorities()
    .then((response) => {
      console.log('get authorities successfully')
      userStore.setAuthorities(response.data)
      console.log(response.data)
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
          <v-form class="my-form" @submit.prevent="login">
            <v-text-field v-model="username" label="Username"></v-text-field>
            <v-text-field v-model="password" label="Password" type="password"></v-text-field>
            <v-btn size="large" color="#f47a00" type="submit">Login</v-btn>
            <!-- Note: You must add type="submit" to the button that submits the form -->
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
