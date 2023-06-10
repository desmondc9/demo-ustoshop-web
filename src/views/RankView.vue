<script setup>

</script>

<template>
  <v-main class="main">
    <v-container class="d-flex justify-center align-center pt-0">
      <v-col class="d-flex flex-column justify-start">
        <v-row class="d-flex title text-h3 align-self-center mt-5">打爆排行</v-row>

        <v-row>
          <v-divider class="mt-10"></v-divider>
        </v-row>

        <v-row class="d-flex justify-center align-self-center mt-10">
          <img class="rank_pic" alt="rank"
               src="https://dabaozhuanjia-web.oss-cn-shanghai.aliyuncs.com/images/ranking.jpg">
        </v-row>

      </v-col>
    </v-container>
  </v-main>
</template>

<style scoped>
.title {
  color: #f47a00;
}

.rank_pic {
  max-width: 100%;
}
</style>
