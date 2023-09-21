<script setup>
import { onMounted, reactive } from 'vue'
import userService from '@/users/services/UsersService'
import authService from '@/auth/services/AuthService'
import router from '@/core/router'

const userList = reactive([])

async function getUserListWithAuthorities() {
  const users = await userService.queryAllUsers()
  userList.push(...users.data.data)

  const resp = await authService.getAllAuthorities({ userIds: userList.map(user => user.id).join(',') })
  const auths = resp.data.data


  userList.forEach(user => {
    user.authorities = auths.filter(auth => auth.userId === user.id).map(auth => auth.authorities)
  })

}

async function deleteUsser(userId) {
  await userService.deleteUser(userId).then(
    resp => {
      if (resp.status === 200) {
        router.push({ name: 'Users', query: { random: Date.now() } })
      }
    },
  )
}


onMounted(async () => {
  await getUserListWithAuthorities()
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
              <th>Username</th>
              <th>Authorities</th>
              <th>Action</th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="user in userList" :key="user.id">
              <td>{{ user.name }}</td>
              <td>
                [ {{ user.authorities.join(', ') }} ]
              </td>
              <td>
                <v-btn color="error" density="compact" @click="deleteUsser(user.id)">Delete</v-btn>
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-col>

      </v-row>
      <v-row class="justify-center">
        <v-col md="2">
          <v-btn color="#f47a00" class="mt-3" @click="router.push({name: 'AddUser'})">Add a user</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>


input[type="text"], input[type="number"] {
  border: grey 1px solid;
}

</style>
