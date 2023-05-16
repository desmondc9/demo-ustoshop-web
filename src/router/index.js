import { createRouter, createWebHistory } from "vue-router";
import IndexView from "@/views/IndexView.vue";
import AboutUsView from "@/views/AboutUsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      component: IndexView
    },
    {
      path: "/aboutus",
      name: "AboutUs",
      component: AboutUsView
    },
    {
      path: "/tutorial",
      name: "Tutorial",
      component: () => import("@/views/TutorialView.vue")
    },
  ]
});

export default router;
