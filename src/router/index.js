import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/AuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../views/TasksView.vue'),
      meta: { requiresAuth: true },
    },

    {
      path: '/login_callback',
      name: 'login_callback',
      component: () => import('../views/LoginCallback.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  console.log({ to, from, next })
  const authStore = useAuthStore()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log({ authStore })
    if ($cookies.get('accessToken') == null) {
      next({
        name: 'login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
      return
    }
  } else {
    next()
  }
})
export default router
