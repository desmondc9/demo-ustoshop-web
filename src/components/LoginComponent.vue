<template>
  <v-container class="w-100 d-flex justify-center align-center">
<!--    <v-card class="w-33 h-25">-->
<!--      <v-card-title >登入</v-card-title>-->
<!--      <v-card-text>-->
<!--        <v-btn color="primary">登入</v-btn>-->
<!--      </v-card-text>-->
<!--    </v-card>-->
    <v-card class="w-33 h-auto">
      <div class="d-flex justify-space-between">
        <div>
          <v-card-title class="text-h5">
            打爆专家
          </v-card-title>

          <v-card-subtitle class="mb-2">快速打包专家</v-card-subtitle>

          <v-card-actions>
            <v-btn
              class="ms-2"
              variant="flat"
              size="large"
              color="orange-darken-2"
              @click="redirectToCainiao"
            >
              登入
            </v-btn>
          </v-card-actions>
        </div>

        <v-avatar
          class="ma-3"
          size="125"
          rounded="0"
        >
          <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
        </v-avatar>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
const redirectToCainiao = () => {
  window.location.href = "https://cnlogin.cainiao.com/login?redirectURL=http%3A%2F%2Fholovid.cainiao.com%2Falgo%2Fprogramme-manage"
}


</script>

<style scoped>

</style>
