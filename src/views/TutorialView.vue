<template>
  <v-main class="main">
    <v-container class="d-flex justify-center align-center pt-0">
      <v-col class="d-flex flex-column justify-start">
        <v-row class="d-flex title text-h3 align-self-center mt-5">使用指南</v-row>

        <v-row>
          <v-divider class="mt-10"></v-divider>
        </v-row>

        <v-row class="d-flex justify-center align-self-center mt-10">
          <video class="video" controls>
            <source src="https://dabaozhuanjia-web.oss-cn-shanghai.aliyuncs.com/videos/tutorial.mp4" type="video/mp4">
            <!--        <source src="movie.ogg" type="video/ogg">-->
            Your browser does not support the video tag.
          </video>
        </v-row>

      </v-col>
    </v-container>
  </v-main>
</template>

<script setup>

</script>

<style scoped>
.title {
    color: #f47a00;
}

.video {
    height: auto;
    width: 100%;
}

</style>
