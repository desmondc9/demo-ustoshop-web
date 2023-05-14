<template>
  <v-main class="main">
    <v-container class="d-flex justify-center align-center mt-lg-16 pt-lg-16">
      <v-col>
        <v-row class="main-title justify-center text-lg-h1 text-h2 font-italic">打爆专家 <br> 强势出击
        </v-row>
        <v-row class="sub-title-1 justify-center text-lg-h4 text-h5"> - 12.5方不是梦 -</v-row>
        <v-row class="sub-title-2 justify-center">
          <v-btn @click="redirectToCainiao" class="mt-8 redirect-button" size="x-large" color="#f47a00">
            点击体验
          </v-btn>
        </v-row>
      </v-col>
    </v-container>
  </v-main>
</template>

<script setup>
const redirectToCainiao = () => {
  window.location.href = "https://cnlogin.cainiao.com/login?redirectURL=http%3A%2F%2Fholovid.cainiao.com%2Falgo%2Fprogramme-manage";
};


</script>

<style scoped>

.main {
    height: 95%;
    background: url("../assets/bg2.png") no-repeat center center fixed !important;
    background-size: cover !important;
}

.main-title {
    line-height: 1.5;
    font-family: "Noto Sans", "Liberation Sans", sans-serif;
    font-weight: bolder;
    color: white;
    text-shadow: -1px 0 rgba(0, 0, 0, 0.5), 0 1px rgba(0, 0, 0, 0.5), 1px 0 rgba(0, 0, 0, 0.5), 0 -1px rgba(0, 0, 0, 0.5);
}

.sub-title-1 {
    color: white;
    text-shadow: -1px 0 rgba(0, 0, 0, 0.5), 0 1px rgba(0, 0, 0, 0.5), 1px 0 rgba(0, 0, 0, 0.5), 0 -1px rgba(0, 0, 0, 0.5);

}
.redirect-button {
    color: white;
}

</style>
