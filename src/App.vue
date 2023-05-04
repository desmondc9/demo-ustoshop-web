<template>
  <v-app class="d-flex w-100">

    <v-app-bar title="打爆专家" color="orange-darken-3" @click.prevent.stop="router.push({name: 'Index'})">
      <v-btn variant="text">
        使用指南
      </v-btn>

      <v-btn variant="text">
        打爆排行
      </v-btn>

      <v-btn variant="text" @click.prevent.stop="router.push({name: 'AboutUs'})">
        关于我们
      </v-btn>

    </v-app-bar>

    <router-view></router-view>

    <v-footer id="my-main" class="d-flex justify-end">
      <a href="https://beian.miit.gov.cn/" target="_blank">沪ICP备2022011936号-2</a>
    </v-footer>

  </v-app>


</template>

<script setup>


import router from "@/router";
</script>

<style scoped>
</style>
