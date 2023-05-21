<template>
  <v-app class="d-flex w-100">

    <v-app-bar color="#f47a00" @click.prevent.stop="router.push({name: 'Index'})">
      <v-row class="d-flex align-center">
        <v-col class="d-flex justify-start">
          <div class="d-flex icon-wrapper" @click.prevent.stop="router.push({name: 'Index'})">
            <img class="d-flex logo-img" src="/logo-1.png">
            <div class="text-md-h6 pt-2 pt-md-1 text-white">打爆专家</div>
          </div>
        </v-col>

        <v-col class="d-flex justify-end text-white">
          <v-btn variant="text" class="pl-1 pr-1 pl-md-4 pr-md-4" @click.prevent.stop="router.push({name: 'Tutorial'})">
            使用指南
          </v-btn>

          <v-btn variant="text" class="pl-1 pr-1 pl-md-4 pr-md-4">
            打爆排行
          </v-btn>

          <v-btn variant="text" class="pl-1 pr-1 pl-md-4 pr-md-4" @click.prevent.stop="router.push({name: 'AboutUs'})">
            关于我们
          </v-btn>
        </v-col>
      </v-row>

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

.logo-img {
    height: 40px;
}

.app-bar {
    color: white;
}

.icon-wrapper:hover {
    cursor: pointer;
}
</style>
