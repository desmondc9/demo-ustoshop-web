import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import App from './App.vue'
import router from './core'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})


import './assets/main.css'

const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')

// router.beforeEach((to, from, next) => {
//   // document.title = to.meta.title;
//   next();
// });
