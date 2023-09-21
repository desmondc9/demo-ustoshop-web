<script setup>
import { onMounted, reactive } from 'vue'
import userService from '@/users/services/UsersService'
import authService from '@/auth/services/AuthService'

const userList = reactive([])

async function getUserListWithAuthorities() {
  const users = await userService.queryAllUsers()
  userList.push(...users.data.data)

  const resp = await authService.getAllAuthorities({ userIds: userList.map(user => user.id).join(',') })
  const auths = resp.data.data


  userList.forEach(user => {
    user.authorities = auths.filter(auth => auth.userId === user.id).map(auth => auth.authorities)
  })
  console.log(userList)

}


onMounted(async () => {
  await getUserListWithAuthorities()
})


</script>

<template>
  <v-main class="main">
    <v-container class="d-flex justify-center align-center pt-0">
      <!--    show delivery list-->
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
            <v-btn color="error" density="compact" @click="deleteDeliveryOrder(delivery.id)">Delete</v-btn>
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-container>
  </v-main>
</template>

<style scoped>


input[type="text"], input[type="number"] {
  border: grey 1px solid;
}

</style>
