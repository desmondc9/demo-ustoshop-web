<template>
  <v-app class="d-flex">
    <v-app-bar title="打爆专家"></v-app-bar>

    <v-main id="my-main" class="d-flex">

      <router-view></router-view>

    </v-main>

    <v-footer id="my-main" class="d-flex justify-end"><a href="https://beian.miit.gov.cn/" target="_blank">沪ICP备2022011936号-2</a>
    </v-footer>

  </v-app>


</template>

<script setup>

import { ref } from "vue";

</script>

<style scoped>
#my-main {
    height: 95%;
}

#my-footer {
    height: 5%;
}

</style>
