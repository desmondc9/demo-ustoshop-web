import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/index/IndexView.vue'
import useUserStore from '@/core/stores/userStore'


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
      path: '/delivery-orders',
      name: 'DeliveryOrders',
      component: () => import('@/deliveryorders/DeliveryOrdersView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/delivery-orders/import',
      name: 'ImportRawDeliveryData',
      component: () => import('@/deliveryorders/ImportRawDeliveryDataView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/delivery-orders/import',
      name: 'ImportRawDeliveryData',
      component: () => import('@/deliveryorders/ImportRawDeliveryDataView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('@/users/UsersView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/add-user',
      name: 'AddUser',
      component: () => import('@/users/AddUser.vue'),
      meta: { requiresAuth: true },
    },
  ],
})


router.beforeEach((to, from, next) => {
  // check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const userStore = useUserStore()
    // check if the user is not logged in
    if (!userStore.getIsLogin) {
      // redirect to the login page
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
