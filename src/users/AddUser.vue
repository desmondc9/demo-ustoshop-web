<script setup>

import router from '@/core/router'
import { onMounted, reactive, ref } from 'vue'
import userService from '@/users/services/UsersService'
import authService from '@/auth/services/AuthService'

const username = ref('')
const password = ref('')
const isAdmin = ref(false)

async function submit() {

  console.log("hello")
  userService.createUser({
    username: username.value,
    password: password.value,
    isAdmin: isAdmin.value,
  }).then(
    (response) => {
      if (response.status === 201) {
        router.push({ name: 'Users' })
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
              v-model="username"
              label="Username"
              required
            ></v-text-field>

            <v-text-field
              type="password"
              v-model="password"
              label="Password"
              required
            ></v-text-field>

            <v-checkbox
              v-model="isAdmin"
              label="Is admin user?"
              required
            ></v-checkbox>

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
