import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/index/IndexView.vue'
import AboutUsView from '@/views/AboutUsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: IndexView,
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/auth/LoginView.vue'),
    },
    {
      path: '/rank',
      name: 'Rank',
      component: () => import('@/views/RankView.vue'),
    },
    {
      path: '/delivery-orders',
      name: 'DeliveryOrders',
      component: () => import('@/deliveryorders/DeliveryOrdersView.vue'),
    },
    {
      path: '/delivery-orders/import',
      name: 'ImportRawDeliveryData',
      component: () => import('@/deliveryorders/ImportRawDeliveryDataView.vue'),
    },
  ],
})

export default router
